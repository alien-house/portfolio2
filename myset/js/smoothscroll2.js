import jQuery from 'jquery';
import { TweenMax, TweenLite, isTweening, Power1, Power3, Circ, Sine, Back, Elastic, TimelineLite,TimelineMax } from 'gsap';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
// import parallax from 'jquery-parallax.js';
// import 'animationGsap'
// import 'debugAddIndicators'
const $ = jQuery;
// const controller = new ScrollMagic.Controller();

export class SmoothScroll {
    
    constructor() {
        this.scrLength = 300;
        this.scrSpeed = 500;
        this.scrEasing = 'easeOutCirc';
        let self = this;
        
        document.onmousewheel = function(){ self.customScroll(); }
        if(document.addEventListener){
            document.addEventListener('DOMMouseScroll', this.customScroll, false);
        }

        // document.onmousewheel = function(){ self.parallaxScroll(); }
        // if(document.addEventListener){
        //     document.addEventListener('DOMMouseScroll', this.parallaxScroll, false);
        // }


        // this.parallax();
    }

    parallax(){
      // var tween = new TimelineMax()
      // .add([
      //     TweenMax.to(".main", 1, {backgroundPosition: "0 -40%", ease: Linear.easeNone}),
      //     TweenMax.to(".contents", 1, {backgroundPosition: "0 -500%", ease: Linear.easeNone})
      // ]);
      // var scene = new ScrollMagic.Scene({
      //   triggerElement: "#container", 
      //   duration: 3000, 
      //   offset: 0})
      //       .setTween(tween)
      //       // .setPin("#container")
      //       .addIndicators() // add indicators (requires plugin)
      //       .addTo(controller);
    }

    parallaxScroll(event){

       var $window = $(window);
       var delta = 0;
       var $self = $(this);
        // var offsetPositions = $window.scrollTop();
     var scrollTop = $window.scrollTop();
        var positions = 'center ' + scrollTop + 100 + 'px';
        $('#main').css('backgroundPosition', positions);


    }

    customScroll(event){
       if ($("body").hasClass("home")) return false;
       
       var $window = $(window);
       var delta = 0;
       
       if (!event){
         event = window.event;
       }
       
       if (event.wheelDelta) {
         delta = event.wheelDelta/120;
       } else if(event.detail) {
         delta = -event.detail/3;
       }
       
       if (delta){
            var scrollTop = $window.scrollTop();
            var finScroll = scrollTop - parseInt(delta*100) /2;
           
            // console.log(finScroll);
                                   
            TweenMax.to($window, 1.0, {
              scrollTo : { y: finScroll, autoKill:true },
              ease: Power2.easeOut,
              autoKill: true,
              overwrite: 2,
              onComplete: function(){ 
              }
            });
            // TweenMax.to($('.main'), 1.0, {
            //   backgroundPosition : positions
            // });
            // TweenMax.to($('.contents'), 1.0, {
            //   backgroundPosition : '0 20%'
            // });
       }
       
       if (event.preventDefault){
         event.preventDefault();
       }
       event.returnValue = false;
    }

}
