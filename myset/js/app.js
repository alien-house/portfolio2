// import 'babel-polyfill';
// import 'custom-event-polyfill'

import webGL from './modules/webGL';
// import Home from './modules/home';
// import Model from './modules/model';
// import Cover from './modules/cover';
// import { isTouchDevice } from './helpers/helpers';

class App {

	constructor (){
		console.log('%cBuilt by', 'font: 200 16px Calibri;color:#CCC');
	
		// this.body = document.querySelector('body');
		// this.coverSlider = document.querySelector('.cover__slider');

		// this.header = new Header();

		// this.routes();
		this.init();
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

		new webGL();

	}
}

window.App = new App();