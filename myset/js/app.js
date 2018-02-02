// import 'babel-polyfill';
// import 'custom-event-polyfill'

// import Header from './modules/header';
// import Home from './modules/home';
// import Model from './modules/model';
// import Cover from './modules/cover';
// import { isTouchDevice } from './helpers/helpers';

class App {

	constructor (){
		// just some console fun.
		console.log('%cBuilt by', 'font: 200 16px Calibri;color:#CCC');
		// console.log('%cSignals', 'font: 200 28px Calibri;color:#93cb3c');
		// console.log('%chttp://www.signals.ca', 'font: 200 16px Calibri;color:#CCC');

		// Doc els
		// this.body = document.querySelector('body');
		// this.coverSlider = document.querySelector('.cover__slider');

		// this.header = new Header();

		// this.routes();
		// this.init();
	}

	// load Classes based on body CSS class
	routes() {

		// Homepage
		if ( this.body.classList.contains('home') ) {
			this.home = new Home();
		}

		// Model Page
		if ( this.body.classList.contains('page-template-page-model') ) {
			this.model = new Model();
		}

	}

	init() {
		if (this.coverSlider) {
			new Cover(this.coverSlider);
		} 
	}
}

window.App = new App();