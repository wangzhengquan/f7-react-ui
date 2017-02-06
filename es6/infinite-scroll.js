'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.InfiniteScrollPreloader = exports.InfiniteScroll = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* ===============================================================================
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     ************   Infinite Scroll   ************
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     =============================================================================== */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _dom = require('./dom');

var _dom2 = _interopRequireDefault(_dom);

var _microevent = require('./microevent');

var _microevent2 = _interopRequireDefault(_microevent);

var _preloader = require('./preloader');

var _preloader2 = _interopRequireDefault(_preloader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InfiniteScroll = function () {
    function InfiniteScroll(conf) {
        var _this = this;

        _classCallCheck(this, InfiniteScroll);

        this.infiniteContent = (0, _dom2.default)(conf.infiniteContent);
        this.distance = conf.distance;

        this.handleInfiniteScroll = function () {
            /*jshint validthis:true */
            var inf = _this.infiniteContent;
            var scrollTop = inf[0].scrollTop;
            var scrollHeight = inf[0].scrollHeight;
            var height = inf[0].offsetHeight;
            var distance = _this.distance;
            var virtualListContainer = inf.find('.virtual-list');
            var virtualList;
            var onTop = inf.hasClass('infinite-scroll-top');
            if (!distance) distance = 50;
            if (typeof distance === 'string' && distance.indexOf('%') >= 0) {
                distance = parseInt(distance, 10) / 100 * height;
            }
            if (distance > height) distance = height;
            if (onTop) {
                if (scrollTop < distance) {
                    // inf.trigger('infinite');
                    _this.trigger('infinite');
                }
            } else {
                if (scrollTop + height >= scrollHeight - distance) {
                    if (virtualListContainer.length > 0) {
                        virtualList = virtualListContainer[0].f7VirtualList;
                        if (virtualList && !virtualList.reachEnd) return;
                    }
                    console.debug('====trigger infinite');
                    // inf.trigger('infinite');
                    _this.trigger('infinite');
                }
            }
        };

        this.attachEvents();
    }

    _createClass(InfiniteScroll, [{
        key: 'attachEvents',
        value: function attachEvents() {
            this.infiniteContent.on('scroll', this.handleInfiniteScroll);
        }
    }, {
        key: 'detachEvents',
        value: function detachEvents() {
            this.infiniteContent.off('scroll', this.handleInfiniteScroll);
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            this.detachEvents();
            this.off('infinite');
        }
    }]);

    return InfiniteScroll;
}();

_microevent2.default.mixin(InfiniteScroll);

exports.InfiniteScroll = InfiniteScroll;
exports.InfiniteScrollPreloader = _preloader2.default;
exports.default = InfiniteScroll;
// app.initPageInfiniteScroll = function (pageContainer) {
//     pageContainer = $(pageContainer);
//     var infiniteContent = pageContainer.find('.infinite-scroll');
//     if (infiniteContent.length === 0) return;
//     app.attachInfiniteScroll(infiniteContent);
//     function detachEvents() {
//         app.detachInfiniteScroll(infiniteContent);
//         pageContainer.off('pageBeforeRemove', detachEvents);
//     }
//     pageContainer.on('pageBeforeRemove', detachEvents);
// };