"use strict";

var Format = require('./format')

let one_year = 31536000000,
    one_month = 2678400000,
    one_day = 86400000,
    one_hour = 3600000,
    one_minute = 60000,
    one_second = 1000;

module.exports = function (start, end, format, config) {
    if (!format) {
        format = 'YYYY-MM-DD'
    }
    var rs = []
    var startTime = new Date(start).getTime()
    var endTime = new Date(end).getTime()

    var timer = 0;
    if (config && config.Y) {
        timer += Number(config.Y) * one_year;
    }
    if (config && config.M) {
        timer += Number(config.M) * one_month;
    }
    if (config && config.D) {
        timer += Number(config.D) * one_day;
    }

    if (config && config.h) {
        timer += Number(config.h) * one_hour;
    }
    if (config && config.m) {
        timer += Number(config.m) * one_minute;
    }
    if (config && config.s) {
        timer += Number(config.s) * one_second;
    }
    while (startTime <= endTime) {
        rs.push(Format(startTime, format));
        startTime += one_day
    }
    return rs
}
