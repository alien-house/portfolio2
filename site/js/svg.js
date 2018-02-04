import jQuery from 'jquery';
const $ = jQuery;
import { TweenMax, TweenLite, isTweening, Power2, Power3, Circ, Sine, Back, Elastic, TimelineLite,drawSVG } from "gsap";

export class Svg {

    constructor() {
      $("#particles-js").find('canvas').onmouseover = function onMouseover(e) {
  var mx = e.clientX - canvas.clientLeft;
  var my = e.clientY - canvas.clientTop;
  // console.log(my);
  // for each circle...
  if ((mx-cx)*(mx-cx)+(my-cy)*(my-cy) < cr*cr){

  }
}


      // var shapes = $("rect, circle, ellipse, polyline"),
      // 		tl = new TimelineMax({onUpdate:updateSlider, repeat:1, yoyo:true}),
      //     $slider = $("#slider");

      // tl.staggerFromTo(shapes, 1, {drawSVG:"100%"}, {drawSVG:"50% 50%"}, 0.1)
      //   .fromTo(shapes, 0.1, {drawSVG:"0%"}, {drawSVG:"10%", immediateRender:false}, "+=0.1")
      //   .staggerTo(shapes, 1, {drawSVG:"90% 100%"}, 0.5)
      //   .to(shapes, 1, {rotation:360, scale:0.5, drawSVG:"100%", stroke:"white", strokeWidth:6, transformOrigin:"50% 50%"})
      //   .staggerTo(shapes, 0.5, {stroke:"red", scale:1.5, opacity:0}, 0.2)


      // $slider.slider({
      //   range: false,
      //   min: 0,
      //   max: 100,
      //   step: 0.02,
      //   value:0,
      //   slide: function ( event, ui ) {
      //     tl.progress( ui.value / 100 ).pause();
      //   }
      // });
      // function updateSlider() {
      // 	$slider.slider("value", tl.progress() * 100);
      // }
      // var $replayIcon = $("#replayIcon"),
      //     $replay = $("#replay").mouseenter(function(){
      //       TweenLite.to($replayIcon, 0.4, {rotation:"+=360"});
      //       TweenLite.to($replay, 0.4, {opacity:1});
      //     }).mouseleave(function(){
      //       TweenLite.to($replay, 0.4, {opacity:0.65});
      //     }).click(function(){
      //       tl.restart();
      // });
}
}
