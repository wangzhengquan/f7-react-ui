/**
 * 转换为有符号数字串
 * 将 10 转换成 '+10',
 * 将 -10 转换成 '-10'.
 * @method toSignedNumberString
 * @param zeroPrefix {String} : 0之前的字符，一般用 +号，默认为空字符串。
 * @return {String}
 */
var toSignedNumberString = function(num, zeroPrefix){  
    if(num > 0){
        return '+' + String(num);     
    } else if(num == 0){
        return (zeroPrefix || '') + String(num);
    } else {
        return String(num);
    }
}

export default {

  /**
   * 获取  Month Name.
   * @method getMonthName
   */
  getMonthName: function(date, isEntity) {
    if (isEntity === true) {
      //使用entity表示字母，以避免冲突, 对应字母如下行注释代码。
      return ([
        '&#74;&#97;&#110;', '&#70;&#101;&#98;', '&#77;&#97;&#114;',
        '&#65;&#112;&#114;', '&#77;&#97;&#121;', '&#74;&#117;&#110;',
        '&#74;&#117;&#108;', '&#65;&#117;&#103;', '&#83;&#101;&#112;',
        '&#79;&#99;&#116;', '&#78;&#111;&#118;', '&#68;&#101;&#99;'
      ])[date.getMonth()];
    } else {
      return (['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'])[date.getMonth()];
    }
  },
  /**
   * 获取 Week Name.
   * @method getWeekName
   */
  getWeekName: function(date, isEntity) {
    if (isEntity === true) {
      return ([
        '&#83;&#117;&#110;', '&#77;&#111;&#110;', '&#84;&#117;&#101;',
        '&#87;&#101;&#100;', '&#84;&#104;&#117;&#114;', '&#70;&#114;&#105;',
        '&#83;&#97;&#116;'
      ])[date.getDay()];
    } else {
      return (['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'])[date.getDay()];
    }
  },
  /**
   *
   * 日期格式化.如:
   * UFODate.format(new Date(),"yyyy-MM-dd mm:ss");
   * UFODate.format(new Date("january 12 2008 11:12:30"), "yyyy-MM-dd hh:mm:ss");
   * @method format
   */
  format: function(date, format) {
    if (!date) {
      return '';
    }
    if (!format) {
      format = 'yyyy-MM-dd mm:ss';
    }
    var o = {
      /**
       * 特殊的格式符，使用大写，如TZ, MN, WN。
       * MM为月份小于10时，前补零，如:2012-01-11。
       */
      'TZ': toSignedNumberString(parseInt(-date.getTimezoneOffset() / 60)), //本地时间与 GMT 时间之间的时间差，以小时为单位.
      'q+': Math.floor((date.getMonth() + 3) / 3), //quarter

      'y+': date.getFullYear(),

      'MN': this.getMonthName(date, true), //month name
      'M+': date.getMonth() + 1, //month number

      'd+': date.getDate(), //day

      'WN': this.getWeekName(date), //week

      'h+': date.getHours(), //hour
      'H+': (function(h) {
        return h < 13 ? h : h - 12;
      })(date.getHours()), //hour 12小时制
      'm+': date.getMinutes(), //minute
      'MP': date.getMinutes() - new Date().getMinutes(), //minutes passed
      's+': date.getSeconds(), //second
      'DP': (function(dataObj) { //AM/PM
        return dataObj.getHours() < 12 ? 'AM' : 'PM';
      })(date)
    };
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(format)) {
        var matchStr = RegExp.$1;
        format = format.replace(
          matchStr,
          function() {
            if (matchStr === 'yy') {
              return o[k] % 100;
            } else {
              return (matchStr.length > 1 && typeof(o[k]) == 'number' && (o[k] > -1 && o[k] < 10)) ? ('0' + o[k]) : o[k];
            }
          }
        );
      }
    }
    return format;
  }
}
