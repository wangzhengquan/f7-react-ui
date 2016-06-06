/* ===============================================================================
************   Infinite Scroll   ************
=============================================================================== */
import React  from 'react';
import $ from './dom'
import MicroEvent from './microevent'
require('./resources/less/preloader.less');

class InfiniteScroll{

    constructor(conf) {
        this.infiniteContent = $(conf.infiniteContent)
        this.distance = conf.distance

        this.handleInfiniteScroll= () => {
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
                    // inf.trigger('infinite');
                    this.trigger('infinite')
                }
            }
            else {
                if (scrollTop + height >= scrollHeight - distance) {
                    if (virtualListContainer.length > 0) {
                        virtualList = virtualListContainer[0].f7VirtualList;
                        if (virtualList && !virtualList.reachEnd) return;
                    }
    console.debug('====trigger infinite')
                    // inf.trigger('infinite');
                    this.trigger('infinite')
                }
            }

        }

        this.attachEvents()
        
    }

    
    attachEvents () {
        this.infiniteContent.on('scroll', this.handleInfiniteScroll);
    }

    detachEvents() {
        this.infiniteContent.off('scroll', this.handleInfiniteScroll);
    }

    destroy() {
        this.detachEvents()
        this.off('infinite')
    }
}

MicroEvent.mixin(InfiniteScroll)



 
let InfiniteScrollPreloader = (props) => (
  <div className="infinite-scroll-preloader">
    <div className="preloader"></div>
  </div>
);

export {
    InfiniteScroll,
    InfiniteScrollPreloader
}

export default InfiniteScroll
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