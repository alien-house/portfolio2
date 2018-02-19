'use strict';
import { TweenLite, Power3 } from 'gsap';

/**
 * Gallery JS
 */

export default class Gallery {

	constructor() {
		this.collectionGallery = document.getElementById('collection-gallery');
		this.collectionGalleryOverlay = document.getElementById('collection-gallery-overlay');
		this.collectionGalleryOverlayInner = document.getElementById('collection-gallery-overlay__item--inner');
		this.galleryItems = [...document.querySelectorAll('.gallery')];
		this.btnClose = document.getElementById('btn-close');
		this.btnPre = document.getElementById('btn-pre');
		this.btnNext = document.getElementById('btn-next');
		this.galleryLargeImg = document.getElementById('collection-gallery-overlay__img');
		this.currentNum = 0;
		this.maxNum = 0;
		this.isModalOpen = false;
		this.stateName = 'openImage';
		this.pageurl = window.location.href.replace(/#.*$/, "");
		this.init();
		this.events();
		this.getHash();
	}

	/**
	 * Init
	 */
	init (){
		this.maxNum = this.galleryItems.length;
	}

	/**
	 * Event listeners
	 */
	events (){

		if (this.galleryItems) {
			this.galleryItems.forEach((item,index) => {
				item.addEventListener('click', e => {
					e.preventDefault();
					this.currentNum = index;
					this.setUrl(index);
					this.galleryItemHandle(item);
				});
			});
		}

		this.btnClose.addEventListener('click', this.closeHandler.bind(this));
		this.btnPre.addEventListener('click', this.prevImage.bind(this));
		this.btnNext.addEventListener('click', this.nextImage.bind(this));
		if(window.history && window.history.pushState){
			window.addEventListener('popstate', this.popStateChange.bind(this));
		} 
		
	}

	getHash() {
		if (location.hash) {
			// var val = location.hash.slice(1); //same thing
			var val = location.hash.replace('#', '');
			if (!isNaN(val)) {
				if (this.maxNum - 1 < val) {
					this.currentNum = this.maxNum - 1;
				} else {
					this.currentNum = val;
				}
				var item = this.galleryItems[val];
				this.galleryItemHandle(item);
			}
		}
	}

	popStateChange(event) {
		if (event.state == this.stateName){
			this.getHash();
		}
		if (!location.hash) {
			if (this.isModalOpen) {
				this.closeModal();
			}
		}
	}

	openModal() {
		TweenLite.to(this.collectionGalleryOverlay, 0.5, {
			ease: Power3.easeInOut,
			autoAlpha: 1
		});
		this.collectionGalleryOverlay.classList.add('showModal');
		document.querySelector('html').classList.add('modal-active');
		this.isModalOpen = true;
	}

	closeHandler() {
		this.setUrl();
		this.closeModal();
	}

	closeModal() {
		TweenLite.to(this.collectionGalleryOverlay, 0.5, {
			ease: Power3.easeInOut,
			autoAlpha: 0
		});
		this.collectionGalleryOverlay.classList.remove('showModal');
		document.querySelector('html').classList.remove('modal-active');
		this.isModalOpen = false;
	}

	setUrl(index = null) {
		if (index) {
			history.pushState(this.stateName, '', this.pageurl + '#' + index);
		} else {
			history.pushState(this.stateName, '', this.pageurl);
		}
	}

	prevImage() {
		this.currentNum--;
		if (0 > this.currentNum) this.currentNum = this.maxNum - 1;
		this.changeImage();
	}

	nextImage() {
		this.currentNum++;
		if (this.maxNum <= this.currentNum) this.currentNum = 0;
		this.changeImage();
	}

	changeImage() {
		var item = this.galleryItems[this.currentNum];
		this.setUrl(this.currentNum);
		this.galleryItemHandle(item);
	}

	galleryItemHandle(navItem) {
		const targetImg = navItem.getAttribute('href');
		if (targetImg) {
			if (!this.isModalOpen) this.openModal();
			this.setImgHandler(targetImg);
		}
	}

	setImgHandler(imgsrc) {
		this.galleryLargeImg.style.opacity = 0;
		this.galleryLargeImg.src = imgsrc;
		this.galleryLargeImg.addEventListener('load', () => {
			TweenLite.to(this.galleryLargeImg, 0.5, {
				ease: Power3.easeInOut,
				autoAlpha: 1
			});
			this.collectionGalleryOverlayInner.classList.remove('img-portrait');
			this.collectionGalleryOverlayInner.classList.remove('img-landscape');
			if ((this.galleryLargeImg.width / this.galleryLargeImg.height) >= 1.0){
				this.collectionGalleryOverlayInner.classList.add('img-landscape');
			} else {
				this.collectionGalleryOverlayInner.classList.add('img-portrait');
			}
		}, { once: true });

	}

	showPageBtn() {

		TweenLite.fromTo(this.btnNext, 0.5, {
			ease: Power3.easeInOut,
			x: 50,
			autoAlpha: 0
		}, {
				ease: Power3.easeInOut,
				x: 0,
				autoAlpha: 1
			});
		TweenLite.fromTo(this.btnPre, 0.5, {
			ease: Power3.easeInOut,
			x: -50,
			autoAlpha: 0
		}, {
				ease: Power3.easeInOut,
				x: 0,
				autoAlpha: 1
			});
	}

}

