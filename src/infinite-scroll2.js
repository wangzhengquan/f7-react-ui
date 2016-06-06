/* ===============================================================================
************   Infinite Scroll   ************
=============================================================================== */
import $ from './dom'
import MicroEvent from './microevent'
console.log('=====load Infinite Scroll')
class Scroll{

    constructor(conf) {
        this.infiniteContent = $(conf.infiniteContent)
        this.distance = conf.distance
        this.attachInfiniteScroll()
    }

    handleInfiniteScroll() {
        /*jshint validthis:true */
        var inf = this.infiniteContent;
        var scrollTop = inf[0].scrollTop;
        var scrollHeight = inf[0].scrollHeight;
        var height = inf[0].offsetHeight;
        var distance = this.distance
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
                inf.trigger('infinite');
            }
        }
        else {
            if (scrollTop + height >= scrollHeight - distance) {
                if (virtualListContainer.length > 0) {
                    virtualList = virtualListContainer[0].f7VirtualList;
                    if (virtualList && !virtualList.reachEnd) return;
                }
console.debug('====trigger infinite')
                inf.trigger('infinite');
                this.trigger('infinite')
            }
        }

    }

    attachInfiniteScroll () {
        this.infiniteContent.on('scroll', this.handleInfiniteScroll.bind(this));
    }

    detachInfiniteScroll () {
        this.infiniteContent.off('scroll', this.handleInfiniteScroll.bind(this));
        this.off('infinite')
    }
}

MicroEvent.mixin(Scroll)

export default Scroll
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