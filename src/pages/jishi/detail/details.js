
const $ = require('../../../mixins/base.js').default.prototype;
Page({
  data: {
    addName: [],
    info: {},
    introlength: 0,
    color:'#ff8000'
  },
  changeToTest: function (e) {
    wx.navigateTo({
      url: '../profession/profession'
    });
  },
  occipations: function occipations() {
    wx.navigateTo({
      url: '../occupations/occupations'
    });
  },
  $alert: function (content, title, success) {
    if (typeof title == 'function') {
      success = title;
      title = '';
    }
    wx.showModal({
      title: title || '提示',
      content: content,
      showCancel: false,
      success: success
    });
  },

  setField: function setField(e) {
    var field = e.currentTarget.dataset.field;
    this.data.info[field] = e.detail.value.trim();
    if (field == 'intro') {
      this.setData({
        introlength: this.data.info[field].length
      });
    }
  },

  addGoto: function addGoto() {
    wx.navigateTo({
      url: '../add/add'
    });
  },
  //表单提交按钮
  doSubmit: function(e) {
    var data = this.data.info;
    if (!data.username) {
      $.$alert('技师姓名不能为空');
      return;
    }
    if (!data.intro) {
      $.$alert('技师简介不能为空');
      return;
    }
    if (!data.avatar) {
      $.$alert('头像不能为空');
      return;
    }
    data.tags = this.data.addName;
    $.showLoading()
    $.$post('/shopapi/technician/save',data,res=>{
      if(res){
        data.id = res
        data.isNew = true
      }
      $.emitEvent('addNewTechnician',data)                 
      $.$back()
    },()=>{
      $.hideLoading()
    })
  },
  //表单重置按钮
  doReset: function formReset(e) {
    var data = this.data.info;
    console.log(!data.id)
    if(!!data.id){
      wx.showModal({
        title: '提示',
        content: '确定是否删除技师',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            $.$get('/shopapi/technician/tec_del?id=' + data.id + '&shop_id=' + data.shop_id, res => {
              wx.navigateBack({
                delta: 1
              })
            });s
          }else{
            console.log('用户点击取消')
            wx.navigateBack({
              delta: 1
            });
          }
  
        }
      })
    }else{
      wx.navigateBack({
        delta: 1
      });
    }

    
  },
  changeSex(e){
      this.data.info.sex = e.detail.value;
  },
  // 调取本地图片和相机
  chooseimage: function chooseimage() {
    $.$chooseAndUploadImg(avatar=>{
       this.data.info.avatar = avatar;       
       this.setData({
         info:this.data.info
       })
    })     
  },
   
  onLoad: function (options) {
    if (options.id) {
      this.isEdit = true;
      $.$get('/shopapi/technician/tec_info?id=' + options.id, res => {
        this.setData({
          introlength:res.intro.length,
          info: res
        })
      });    
    }
    $.registerService('getTechnicianCategory',this,this.getTechnicianCategory)
    $.registerService('getTypeName',this,this.getTypeName)
    $.addEventListener('selectTechnicianCategory',this,this.onSelectTechnicianCategory)      
    $.addEventListener('addTags',this,tag=>{
        this.data.addName.push(tag)
        this.setData({
          addName:this.data.addName
        })
    })
    $.addEventListener('setTypeName',this,this.onSetTypeName)      
  },
  onSetTypeName(type_name){
    this.data.info.type_name = type_name;
    this.setData({
       info:this.data.info 
    })
  },
  getTypeName(){
    return this.data.info.type_name
  },
  onSelectTechnicianCategory(id,txt){
    this.data.info.technician_category = id
    this.data.info.category_title = txt
    this.setData({
      info:this.data.info
    })
  },
  getTechnicianCategory(){
    return this.data.info.technician_category
  },
  cancel: function cancel(e) {
    var that = this;
    that.data.addName.splice(e.currentTarget.dataset.item, 1);
    that.setData({
      addName: that.data.addName
    });
  }
});