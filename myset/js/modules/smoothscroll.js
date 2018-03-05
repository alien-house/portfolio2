import jQuery from 'jquery';
import { TweenMax, TweenLite, isTweening, Power1, Power3, Circ, Sine, Back, Elastic, TimelineLite,TimelineMax } from 'gsap';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
const $ = jQuery;
// const controller = new ScrollMagic.Controller();

export default class SmoothScroll {
    
    constructor() {
        // this.scrLength = 300;
        // this.scrSpeed = 500;
        // this.scrEasing = 'easeOutCirc';
        // let self = this;
        this.container = document.querySelector('.scroll-container');

            $('.scroll-container').css({
                height: windowHeight + 'px'
            });


            var windowHeight = $('.scroll-container').height();
            var windowScrollTop = $(window).scrollTop();
            var destY = windowScrollTop;
            document.body.style.height = windowHeight + 'px';
            this.container.style.height = windowHeight + 'px';
        var last_known_scroll_position = 0;
        var ticking = false;
        function doSomething(scroll_pos) {
          // do something with the scroll position
            // var windowHeight = $(window).height();
            var windowHeight = $('.scroll-container').height();
            var windowScrollTop = $(window).scrollTop();
            var destY = windowScrollTop;
            // document.body.style.height = windowHeight + 'px';
            $('.scroll-container').css({
                height: windowHeight + 'px'
            });

            console.log(scroll_pos);
            var scroll_pos2 = scroll_pos*0.9;
            var container = $('.scroll-container');
            container.css({
                transform: 'translate3d(0, -' + scroll_pos2 + 'px, 0)'
            });


        }
        this.container.addEventListener('scroll', function(e) {
            last_known_scroll_position = window.scrollY;
            if (!ticking) {
                window.requestAnimationFrame(function() {
                  doSomething(last_known_scroll_position);
                  ticking = false;
                });
                ticking = true;
            }

        });


        if(document.addEventListener){
            // document.addEventListener('scroll', this.customScroll.bind(this), false);
        }
        this.startTime = new Date().getTime();
        // requestAnimationFrame(() => {this.test();});
        // this.test();
    }

    customScroll(event) {

        console.log(event);
    }

    test() {
        // var currentTime = new Date().getTime();　//経過時刻を取得
        // var status = (this.startTime - currentTime) // 描画開始時刻から経過時刻を引く
        // console.log(status);

        var container = $('.scroll-container');
        var windowHeight = $(window).height();
        var windowScrollTop = $(window).scrollTop();
        var destY = windowScrollTop;
        var currentY = -this.getTranslateY(container);
        console.log(currentY);
        requestAnimationFrame(() => {this.test();});
    }


   smoothScrollMove() {
        var container = $('.scroll-container');
        var windowHeight = $(window).height();
        var windowScrollTop = $(window).scrollTop();
        var destY = windowScrollTop;
        var currentY = this.getTranslateY(container);
        // console.log(currentY);
        // if (Math.round(currentY) != Math.round(destY)) {
        //     var newY = Math.round(currentY + ((destY - currentY) * 0.1));
        //     container.css({
        //         transform: 'translate3d(0, -' + newY + 'px, 0)'
        //     });
        //     $(window).trigger('smoothscroll');
        // }
        var scrollAction = this.smoothScrollMove();
        window.requestAnimationFrame(scrollAction);
    }
    getTranslateY(element) {
        var style = window.getComputedStyle(element.get(0));
        var matrix = style.getPropertyValue("-webkit-transform") || style.getPropertyValue("-moz-transform") || style.getPropertyValue("-ms-transform") || style.getPropertyValue("-o-transform") || style.getPropertyValue("transform");
        if (matrix === 'none') {
            matrix = 'matrix(0,0,0,0,0)';
        }
        var values = matrix.match(/([-+]?[\d\.]+)/g);
        return values[14] || values[5] || 0;
    };
}
