@echo on 

echo STEP-1: 编译wepy模块
echo STEP-2: 安装依赖模块...

call cnpm install

echo STEP-3: 编译打包

call cnpm run build

echo STEP-4: 生成版本信息文件 version.txt
echo {"version":"1.0.0.%date:~0,4%%date:~5,2%%date:~8,2%%time:~0,2%%time:~3,2%%time:~6,2%","codeVersion":""} > build/version.txt

echo STEP-5: 打包完成！！！

pause