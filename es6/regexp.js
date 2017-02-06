'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var RegExpUtil = {};

/**
 * 判断当前模式是否存在于指定的字符串中. 
 * @param {String} str
 * 
 * @return {Boolean}
 */
RegExpUtil.isExistIn = function (regx, str) {
    return regx.test(str);
};
/**
 * 获取当前模式在指定字符串中的所有匹配. 
 * @param {Object} str
 * @param {Boolean} isGetDetails    : 仅返回匹配字符串，还是每次匹配的详细信息，默认仅返回匹配字符串。
 * 
 * @return {Array:Object} / {Array:String}
 */
RegExpUtil.getMatches = function (regx, str, isGetDetails) {
    var matches = [],
        matchTemp = null,
        getMatchItem = function getMatchItem(matchTemp) {
        return isGetDetails ? matchTemp : matchTemp[0];
    };

    if (regx.global) {
        while ((matchTemp = regx.exec(str)) !== null) {
            matches.push(getMatchItem(matchTemp));
        }
    } else {
        matchTemp = regx.exec(str);
        if (matchTemp) {
            matches.push(getMatchItem(matchTemp));
        }
    }
    return matches.length > 0 ? matches : null;
};
//---------------------------------------------------------------------------------------


/**
 * 判断是否是合法的密码格式. 
 */
RegExpUtil.valPassword = function (pwd, cb) {
    if (pwd.length < 8 || pwd.length > 20) {
        cb && cb(false, '密码长度为8－20个字符');
        return false;
    }
    if (!/\d+/gi.exec(pwd)) {
        cb && cb(false, '密码应包含数字');
        return false;
    }
    if (!/[a-zA-Z]+/gi.exec(pwd)) {
        cb && cb(false, '密码应包含字母');
        return false;
    }
    if (!/[!@#$%^&*()]+/gi.exec(pwd)) {
        cb && cb(false, '密码不能包含!@#$%^&*()等特殊字符');
        return false;
    }
    cb && cb(true);
    return true;
};

/**
 * 常用正则表达式. 
 */
RegExpUtil.patterns = {
    positiveInteger: /^[0-9]*[1-9][0-9]*$/, //正整数
    negativeInteger: /^-[0-9]*[1-9][0-9]*$/, //负整数
    positiveFloatNumber: /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/, //正浮点数
    negativeFloatNumber: /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/, //负浮点数
    floatNumber: /^(-?\d+)(\.\d+)?$/, //浮点数
    email: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i,
    // email : /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/, //email地址        
    ip: /((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)/, //IP地址
    url: /^\b(((https?|ftp):\/\/)?[-a-z0-9]+(\.[-a-z0-9]+)*\.(?:com|edu|gov|int|mil|net|org|biz|info|name|museum|asia|coop|aero|[a-z][a-z]|((25[0-5])|(2[0-4]\d)|(1\d\d)|([1-9]\d)|\d))\b(\/[-a-z0-9_:\@&?=+,.!\/~%\$]*)?)$/i, //url地址
    html: /<(\S*?)[^>]*>.*?|< .*? \/>/, //HTML标记

    date: /^(19|20)\d\d[- \/.](0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])$/, //年/月/日（年-月-日、年.月.日）

    chineseChar: /[\u4e00-\u9fa5]/, //中文字符///[\u4E00-\u9FA5\uf900-\ufa2d]/ 
    unicodeChar: /[^\x00-\xff]/, //双字节字符(包括汉字在内)

    account: /^[a-zA-Z][a-zA-Z0-9_]{4,9}$/, //帐号(字母开头，允许5-10字节，允许字母数字下划线)

    chinesePostCode: /[1-9]\d{5}(?!\d)/, //中国邮政编码        
    identityCard: /\d{15}|\d{18}/, //身份证        
    telphoneNumber: /(\d{3}-|\d{4}-)?(\d{8}|\d{7})?/, //国内电话号码
    mobile: /^1(3[0-9]|4[57]|5[0-35-9]|7[01678]|8[0-9])\d{8}$/, //手机号

    trimChar: /^\s*|\s*$/, //首尾空白字符        
    emptyRow: /\n\s*\r/, //空白行

    lineNo: /^\s*\d+\./, //行号
    multiLineRemark: /\\*[\\w\\W]*?\\*\\/, //多行注释.

    tailNumber: /\d+$/g, //结尾的数字.
    whiteSpace: /\s+/g //空格
};

exports.default = RegExpUtil;