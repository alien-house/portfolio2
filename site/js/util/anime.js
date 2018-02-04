import jQuery from 'jquery';
const $ = jQuery;
import anime from 'animejs'
import { TweenMax, TweenLite, isTweening, Power2, Power3, Circ, Sine, Back, Elastic, TimelineLite,drawSVG } from "gsap";

// export class Anime {

// 	constructor() {

// 	}
// }
export function sectionStartTitleAnime(element){
	$(element).each(function(){
	  $(this).html($(this).text().replace(/([^\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F]|\w)/g, "<span class='letter'>$&</span>"));
	});
			// console.log("sectionStartTitleAnime");
	$(element).css({'opacity':1});
	anime({
		targets: element,
		translateY: [60,0],
		translateZ: 0,
		opacity: 1,
		easing: "easeOutExpo",
		duration: 1400,
		loop:false,
		delay: function(el, i) {
		  return 300 + 30 * i;
		},
		complete:function(anim){
			// console.log(anim.pause());
			// anime.remove('.letter');
		}
	});

}


export function sectionTitleAnime(element){
	let basicTimeline = anime.timeline({loop: true});
	// anime.remove(element + ' .letter');
	basicTimeline
		  .add({
		    targets: element + ' .letter',
		    translateY: [0,"-0.3em",0],
		    translateZ: 0,
		    duration: 1550,
		    easing: "easeOutExpo",
		    delay: function(el, i) {
		      return 80 * i;
		    }
		  }).add({
		    targets:element + ' .letter',
		    duration: 1000,
		    easing: "easeOutExpo",
		    delay: 1000
		  });
	  return basicTimeline;
}

export function stopAnime(timeline){
	if(timeline){
		timeline.seek(0);
		timeline.pause();
	}
}

export function removeAnime(element){
	anime.remove(element);
}