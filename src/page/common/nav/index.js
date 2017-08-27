/*
 * @Author: zgz
 * @Date:   2017-08-27 17:16:01
 * @Last Modified by:   zgz
 * @Last Modified time: 2017-08-27 18:57:22
 */
require('./index.css');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');
var _cart = require('service/cart-server.js');

// 导航
var nav = {
    init: function() {
        this.bindEvent();
        this.loadUserInfo();
        this.loadCartCount();
        return this;
    },
    bindEvent: function() {
        // 登录点击事件
        $('.js-login').click(function() {
            _mm.doLogin();
        });
        // 注册点击事件 
        $('.js-register').click(function() {
            window.location.href = './user-register.html';
        });
        // 退出点击事件
        $('.js-logout').click(function() {
            _user.logout(function(res) {
                window.location.reload();
            }, function(errMsg) {
                _mm.errorTips(errMsg)
            })
        })
    },
    loadUserInfo: function() {
        _user.checkLogin(function(res) {
            $('.user.not-login').hide().siblings('.user.login').show().find('.username').text(res.username);
        }, function(errMsg) {

        })
    },
    // 加载购物车数量
    loadCartCount: function() {
        _cart.getCartCount(function(res) {
            $('.nav .cart-count').text(res || 0);
        }, function(errMsg) {
            $('.nav .cart-count').text(0);
        });
    }
}

module.exports = nav.init();