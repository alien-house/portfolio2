import jQuery from 'jquery';
const $ = jQuery;
import { TweenMax, TweenLite, isTweening, Power2, Power3, Circ, Sine, Back, Elastic, TimelineLite } from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import { sectionStartTitleAnime, sectionTitleAnime, stopAnime, removeAnime } from './util/anime';

export class About {
    
    constructor() {
        this.firsttime = true;
        this.maxNum = $(".scrollPage-page").length;
        this.currentBlockNum = 0;
        this.prevNum = undefined;
        this.firsttime = true;
        this.transitionTime = 1;
        this.aboutPageWheel = this.aboutPageWheelEvent.bind(this);
        this.toNextSection = this.toNextSectionEvent.bind(this);
        this.toPrevSection = this.toPrevSectionEvent.bind(this);
        this.nextPage = '';
        this.currentProjectNum = 0;
        this.prevProjectNum = 0;
        this.nextNavTitle = document.getElementById('next-nav-title--blog');
        this.prevNavTitle = document.getElementById('next-nav-title--about');
        // this.prevNavTitle = document.getElementById('next-nav-title--about');

    }

    init() {
        let self = this;
        this.nextNavTitle = document.getElementById('next-nav-title--blog');
        this.prevNavTitle = document.getElementById('next-nav-title--about');
        let $aboutPage = $('#aboutPage');
        window.addEventListener('wheel', this.aboutPageWheel);
        let aboutPos = $aboutPage.position();
        TweenLite.to(window, this.transitionTime, {
            scrollTo: aboutPos.top,
            ease: Power3.easeInOut,
            onComplete: function () {
                
                // self.prevNavTitle.addEventListener('click', self.toPrevSectionEvent, false);
                // self.prevNavTitle.style.cursor = 'pointer';
            }
        });
      
        if(this.firsttime){
            // console.log("firsttime?");
            sectionStartTitleAnime('#next-nav-title--blog');
            self.titleAnime = sectionTitleAnime('#next-nav-title--blog');
            self.firsttime = false;
        }else{
            // console.log("nofirst?");
            self.titleAnime = sectionTitleAnime('#next-nav-title--blog');
            TweenLite.to($("#next-nav-title--blog"), this.transitionTime, {
                y:0,
                ease: Power3.easeInOut
            });
        }

        self.nextNavTitle.addEventListener('click', self.toNextSection, false);
        self.nextNavTitle.style.cursor = 'pointer';
        self.prevNavTitle.addEventListener('click', self.toPrevSection, false);
        self.prevNavTitle.style.cursor = 'pointer';
    }

    setNextPage(nextpage){
        this.nextPage = nextpage;
    }
    setPrevPage(prevpage){
        this.prevPage = prevpage;
    }

    aboutPageWheelEvent(e) {
        // console.log("aboutPageWheelEvent");
        let self = this;
        if (TweenMax.isTweening(window)) return false;
        if (e.deltaY > 10) {
            this.toNextSectionEvent();
            return false;
        } else if(e.deltaY < -10) {
            this.toPrevSectionEvent();
        // console.log("アバウトとのtoPrevSectionEvent");
            return false;
        }else{
            return false;
        }
    }

    toNextSectionEvent(){
        // let $list;

        window.removeEventListener('wheel', this.aboutPageWheel);
        this.nextNavTitle.removeEventListener('click', this.toNextSection, false);
        this.nextNavTitle.style.cursor = '';
        this.prevNavTitle.removeEventListener('click', this.toPrevSection, false);
        this.prevNavTitle.style.cursor = '';
        stopAnime(this.titleAnime);
        TweenLite.to($(this.nextNavTitle), this.transitionTime, {
            y:100,
            ease: Power3.easeInOut
        });
        this.nextPage();
    }

    toPrevSectionEvent(){
        window.removeEventListener('wheel', this.aboutPageWheel);
        this.nextNavTitle.removeEventListener('click', this.toNextSection, false);
        this.nextNavTitle.style.cursor = '';
        this.prevNavTitle.removeEventListener('click', this.toPrevSection, false);
        this.prevNavTitle.style.cursor = '';
        this.prevPage();
    }



}
