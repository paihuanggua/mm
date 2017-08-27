/*
 * @Author: zgz
 * @Date:   2017-08-27 20:36:10
 * @Last Modified by:   zgz
 * @Last Modified time: 2017-08-27 21:20:14
 */
require('./index.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');


$(function() {
    var type = _mm.getUrlParam('type') || 'default',
        $element = $('.' + type + '-success');
    $element.show();
})