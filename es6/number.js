'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  /**
   * 转换为有符号数字串
   * 将 10 转换成 '+10',
   * 将 -10 转换成 '-10'.
   * @method toSignedNumberString
   * @param zeroPrefix {String} : 0之前的字符，一般用 +号，默认为空字符串。
   * @return {String}
   */
  toSignedNumberString: function toSignedNumberString(num, zeroPrefix) {
    if (num > 0) {
      return '+' + String(num);
    } else if (num == 0) {
      return (zeroPrefix || '') + String(num);
    } else {
      return String(num);
    }
  },

  /**
   * Return the hexidecimal string representation of an integer
   * @method toHex
   * @return {String}
   */
  toHex: function toHex(num) {
    return num.toString(16);
  },

  /**
   * 将数字转换成金额大写格式.
   * @static
   * @method toAmountWords
   * @param {Number}
   * @return {String}
   */
  toAmountWords: function toAmountWords(amount) {
    var dw2 = ["", "万", "亿"]; //大单位
    var dw1 = ["拾", "佰", "仟"]; //小单位
    var dw = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"]; //整数部分用

    var amountSource = String(amount).split('.');

    //转换整数部分
    var k1 = 0; //计小单位
    var k2 = 0; //计大单位
    var sum = 0;
    var str = "";
    var n = 0;

    for (var i = 1, len = amountSource[0].length; i <= len; i++) {
      n = amountSource[0].charAt(len - i); //取得个位数上的数字
      var bn = 0;
      if (len - i - 1 >= 0) {
        bn = amountSource[0].charAt(len - i - 1); //取得某个位数前一位上的数字
      }
      sum = sum + Number(n);
      if (sum != 0) {
        str = dw[Number(n)].concat(str); //取得该数字对应的大写数字，并插入到str字符串的前面
        if (n == '0') sum = 0;
      }
      if (len - i - 1 >= 0) {
        //在数字范围内
        if (k1 != 3) {
          //加小单位
          if (bn != 0) {
            str = dw1[k1].concat(str);
          }
          k1++;
        } else {
          //不加小单位，加大单位
          k1 = 0;
          if (str.charAt(0) == "万" || str.charAt(0) == "亿") //若大单位前没有数字则舍去大单位
            str = str.substr(1, str.length - 1);
          str = dw2[k2].concat(str);
          sum = 0;
        }
      }
      if (k1 == 3) {
        //小单位到千则大单位进一        
        k2++;
      }
    }
    str += "元";

    //转换小数部分    
    if (amountSource[1]) {
      n = amountSource[1].charAt(0);
      if (n != 0) {
        str += dw[Number(n)] + "角";
      }
      n = amountSource[1].charAt(1);
      if (n != 0) {
        str += dw[Number(n)] + "分";
      }
    } else {
      str += '整';
    }

    return str;
  }
};