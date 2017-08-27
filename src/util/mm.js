/*
 * @Author: zgz
 * @Date:   2017-08-27 14:20:49
 * @Last Modified by:   zgz
 * @Last Modified time: 2017-08-27 15:57:38
 */
var Hogan = require('hogan');
var conf = {
    serverHost: ''
};
var _mm = {
    request: function(param) {
        var _this = this;
        $.ajax({
            type: param.method || 'get',
            url: param.url || '',
            dataType: param.type || 'json',
            data: param.data || '',
            success: function(res) {
                // 请求成功
                if (res.ststus === 0) {
                    typeof param.success === 'function' && param.success(res.data, res.msg);
                }
                // 没有登陆状态，需要强制登陆
                else if (res.ststus === 10) {
                    _this.doLogin();
                }
                // 请求数据错误
                else if (res.ststus === 1) {
                    typeof param.error === 'function' && param.error(res.msg);
                }
            },
            error: function(err) {
                typeof param.error === 'function' && param.error(res.statusText)
            }
        })
    },
    // 获取服务器地址
    getServerUrl: function(path) {
        return conf.serverHost + path;
    },
    // 获取url参数
    getUrlParam: function(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var result = window.location.search.substr(1).match(reg);
        // console.log(RegExp.$2)
        return result ? decodeURIComponent(result[2]) : null;
    },
    // 渲染html模版
    renderHtml: function(htmlTemplate, data) {
        var template = Hogan.compile(htmlTemplate),
            result = template.render(data);
        return result;
    },
    // 成功提示
    successTips: function(msg) {
        alert(msg || '操作成功');
    },
    // 错误提示
    successTips: function(msg) {
        alert(msg || '哪里不对了！！');
    },
    // 字段验证，支持非空、手机、邮箱的判断
    validate: function(value, type) {
        var value = $.trim(value);
        // 非空验证
        if (type === 'require') {
            return !!value;
        }
        // 手机号验证
        if (type === 'phone') {
            return /^1\d{10}$/.test(value);
        }
        // 邮箱验证
        if (type === 'email') {
            return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
        }

    },
    // 统一登陆处理
    doLogin: function() {
        window.location.href = './login.html?redirect=' + encodeURIComponent(window.location.href);
    },
    // 跳回首页
    goHome: function() {
        window.location.href = './index.html';
    }
}


module.exports = _mm;