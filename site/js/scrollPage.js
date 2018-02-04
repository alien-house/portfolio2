import jQuery from 'jquery';
const $ = jQuery;
import { TweenMax, TweenLite, isTweening, Power2, Power3, Circ, Sine, Back, Elastic, TimelineLite } from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import { Introduction } from './topintroduction';
import { Project } from './topproject';
import { About } from './topabout';
import { Blog } from './topblog';
import { SiteInfo } from './util/responsiveSetting';

export class ScrollPage {
    
    constructor(duration) {
        this.isPC = SiteInfo.spWidth < SiteInfo.getWinWidth() ? true : false;
        this.maxNum = $(".scrollPage-page").length;
        this.currentBlockNum = 0;
        this.prevNum = undefined;
        this.duration = duration;
        this.wheelLock = false;
        this.firsttime = true;
        this.queue = null;
        this.wait = 300; 
        this.transitionTime = 1;
        // this.topPageWheelEvent = this.topPageWheelEvent.bind(this);
        // this.projectPageWheelEvent = this.projectPageWheelEvent.bind(this);
        this.resizeEvent = this.resizeEvent.bind(this);
        this.resizeEvent();
        // window.addEventListener('resize', this.resizeEvent, false);
        this.currentProjectNum = 0;
        this.prevProjectNum = 0;
        window.addEventListener('resize', this.resizeEvent, false);
        this.introduction = new Introduction();
        this.introduction.setNextPage(this.projectPage.bind(this));
        this.project = new Project();
        this.project.setNextPage(this.aboutPage.bind(this));
        this.project.setPrevPage(this.initialPage.bind(this));
        this.about = new About();
        this.about.setNextPage(this.blogPage.bind(this));
        this.about.setPrevPage(this.projectPage.bind(this));
        this.blog = new Blog();
        this.blog.setPrevPage(this.aboutPage.bind(this));
        this.isReload = false;

    }

    resizeEvent(){
        // let pageHeight = $(window).outerHeight();
        this.isPC = SiteInfo.spWidth < SiteInfo.getWinWidth() ? true : false;
        let pageHeight;
        if(this.isPC) pageHeight = $(window).outerHeight();
        // else pageHeight = screen.height;
        else pageHeight = $(window).outerHeight();
        
        $('#fullPage,#projectPage,#aboutPage,#blogPage').css({ 'height': pageHeight + 'px' });
    
        if(SiteInfo.spWidth > SiteInfo.getWinWidth()){
            if(this.isReload){
                location.reload();
            }
        }else{
            this.isReload = true;
        }

    }

    // initial pages ============================
    initialPage(firsttime = null) {
        this.currentBlockNum = 0;
        this.introduction.init(firsttime);
    }
    // Project Page ===========================
    projectPage() {
        this.currentBlockNum = 1;
        this.project.init();
    }
    // About Page ===========================
    aboutPage() {
        this.currentBlockNum = 2;
        this.about.init();
    }
    blogPage() {
        this.currentBlockNum = 3;
        this.blog.init();
    }

}
