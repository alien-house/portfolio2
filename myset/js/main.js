import jQuery from 'jquery';
import slick from 'slick-carousel';
import 'particles.js/particles';
import { ScrollPage } from './scrollPage';
import { Menu } from './menu';
import { Svg } from './svg';
// import { SmoothScroll } from './smoothscroll';
const particlesJS = window.particlesJS;
const $ = jQuery;
particlesJS.load('particles-js', '/particlesjs-config.json', function() {
  // console.log('callback - particles.js config loaded');
});

// const message = 'Hello World';
let topPage = '';
const alienhouseURL = 'http://localhost:3000';
const alienhouseURL2 = 'http://alienhouse2.localhost/';
const alienhouseURL3 = 'http://alien-house.com';
const menu = new Menu('menu','menu_full');

$(document).ready(() => {
    
    let isHome = location.pathname;
    menu.init(toppageInit, workGalleryInit);

    if(isHome == alienhouseURL || isHome == alienhouseURL2 || isHome == alienhouseURL3 || isHome == '/'){
    	topPage = new ScrollPage(8000);
		menu.showLoading(function(){
			menu.closeLoading(function(){
				topPage.initialPage();
			});
		});
    }
    else if(isHome.includes('/project')){
		menu.showLoading(function(){
			menu.closeLoading(function(){
    				// workGalleryInit();
				if(isHome.includes('/project/')){
    				workGalleryInit();
				}
			});
		});
    }
    else if(isHome.includes('/about')){
		menu.showLoading(function(){
			menu.closeLoading(function(){
			});
		});
    }

    const svg = new Svg();
    // new SmoothScroll();
    
});


function toppageInit(){
	if(!topPage){
		topPage = new ScrollPage(8000);
	}else{
	// console.log("resizeEvent");
		topPage.resizeEvent();
	}
	topPage.initialPage(true);
	// menu.closeLoading(function(){
	// 	topPage.initialPage(true);
	// });
	// menu.showLoading(function(){
 //                console.log("toppageds");
	// 	menu.closeLoading(function(){
 //                console.log("toppageInit");
	// 		topPage.initialPage(true);
	// 	});
	// });
}

function workGalleryInit(){
	let pageHeight = $(window).outerHeight();
	$('.work-header-bg').css({ 'height': pageHeight + 'px' });
	$('.variable-width').slick({
	  dots: true,
	  infinite: true,
	  speed: 300,
	  slidesToShow: 1,
	  centerMode: true,
	  variableWidth: true
	});
}


// document.addEventListener("DOMContentLoaded", function (event) {
// });

// $(document).ready(() => {
// });

// instance.say(message);


// // ドルマークに参照を代入(慣習的な $ を使うため)
// const $ = jQuery;

// // テキストを取得
// const text = $('#myText').text();
// $('#myText')
//   .empty() // 一旦、空にする
//   .show(); // 表示する

// const arr = text.split(''); // 一文字ずつ、配列に格納
// const elements = [];

// // 一文字ずつ、spanタグで包む
// arr.map((str, index) => {
//   elements[index] = $(`<span>${str}</span>`);
//   $('#myText').append(elements[index]); // 元の場所に挿入
// });

// // エフェクトの適用
// elements.map((element, index) => {
//   element
//     .delay(400 * index)
//     .queue(function () {
//       $(this).addClass('motion');
//     });
// });