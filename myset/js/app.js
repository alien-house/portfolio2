// import 'babel-polyfill';
// import 'custom-event-polyfill'

import webGL from './modules/webGL';
import ScrollReveal from 'scrollreveal';
import Gallery from './modules/gallery';
import SmoothScroll from './modules/smoothscroll';
// import Home from './modules/home';
// import Model from './modules/model';
// import Cover from './modules/cover';
// import { isTouchDevice } from './helpers/helpers';

class App {

	constructor (){
	
		this.body = document.querySelector('body');
    	this.parallaxers = [document.querySelectorAll('[data-parallax="true"]')];
		// this.coverSlider = document.querySelector('.cover__slider');

		// this.header = new Header();

		this.routes();
		this.init();
	}

	// load Classes based on body CSS class
	routes() {

		// Homepage
		if ( this.body.classList.contains('home') ) {
			this.home = new Home();
		}

		// Model Page
		// if ( this.body.classList.contains('page-template-page-model') ) {
		// 	this.model = new Model();
		// }
		// Model Page
		if ( this.body.classList.contains('gallery_page') ) {
			new Gallery();
		}
		if ( this.body.classList.contains('page-smoothscroll') ) {
			new SmoothScroll();

		}
		if (this.body.classList.contains('page-scrollreveal') ) {
			// new ScrollReveal();
			window.sr = ScrollReveal();
			sr.reveal('.scroll-reveal', { afterReveal: function (domEl) { 
				console.log('de'); 
				console.log(domEl); 
				var test = domEl.querySelector('.image-container');
				test.classList.add('is-visible');
			} });

		}

	}

	init() {
		if (this.coverSlider) {
			new Cover(this.coverSlider);
		} 
		
		if ( this.body.classList.contains('webGL') ) {
			new webGL();
		}
			
	    // if(this.parallaxers && window.matchMedia('(min-width: 600px)').matches && !isHandheld()){
	    //   this.parallaxers.forEach((parallax) => {
	    //     new Parallax(parallax)
	    //   })
	    // }

	}
}

window.App = new App();