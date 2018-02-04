import jQuery from 'jquery';
const $ = jQuery;
import anime from 'animejs'
// import letteringjs from 'letteringjs';
// import textillate from 'textillate';
import { TweenMax, TweenLite, isTweening, Power2, Power3, Circ, Sine, Back, Elastic, TimelineLite } from 'gsap';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
import { Splash } from './splash';
import { sectionStartTitleAnime, sectionTitleAnime, stopAnime, removeAnime } from './util/anime';
import { SiteInfo } from './util/responsiveSetting';

export class Introduction {
    
    constructor() {
        this.firsttime = true;
        this.transitionTime = 1;
        this.topPageWheelEvent = this.topPageWheelEvent.bind(this);
        this.toNextSectionEvent = this.toNextSectionEvent.bind(this);
        this.nextPage = '';
        this.titleAnime = '';
        this.isVideo = SiteInfo.spWidth < SiteInfo.getWinWidth() ? true : false;
        this.nextNavTitle = '';
    }

    init(firsttime = null) {
        let self = this;
        this.nextNavTitle = document.getElementById('next-nav-title--work');
        TweenLite.to(window, 1, { scrollTo: 0, ease: Power3.easeInOut });
        if(firsttime){
            this.firsttime = firsttime;
        }
        if(this.firsttime){
            if(this.isVideo){
                TweenLite.killTweensOf(window);
                TweenLite.to(window, 0, { delay:0.2, scrollTo: 0, ease: Power3.easeInOut });
                $("#Home__video").get(0).play();
                // var promise = document.querySelector('video').play();
                // if (promise !== undefined) {
                //   promise.then(_ => {
                //     $("#Home__video").get(0).play();
                //   }).catch(error => {
                //   });
                // }

                TweenLite.to($("#Home__video-wrap"), this.transitionTime, {
                    autoAlpha: 0,
                    delay:3.7,
                    ease: Power3.easeInOut,
                    onComplete:function(){
                        $(this).css({'display':'none'});
                        self.firsttime = false;
                        sectionStartTitleAnime('#next-nav-title--work');
                        // sectionTitleStayAnime('#next-nav--work');
                        // self.titleAnime = sectionStartTitleAnime('#next-nav-title--work');
                        let splash = new Splash();
                        self.finishedIntroAnima();
                        TweenMax.fromTo($("#next-nav--work").find(".next-nav-line"), self.transitionTime, {
                            y:50,
                            autoAlpha:0,
                        },{
                            y:0,
                            autoAlpha:1
                        });
                    }
                });
            }else{
                self.firsttime = false;
                $("#Home__video-wrap").css({'display':'none'});
                sectionStartTitleAnime('#next-nav-title--work');
                let splash = new Splash();
                self.finishedIntroAnima();
                TweenMax.fromTo($("#next-nav--work").find(".next-nav-line"), self.transitionTime, {
                    y:50,
                    autoAlpha:0,
                },{
                    y:0,
                    autoAlpha:1
                });
            }

        }else{
            this.finishedIntroAnima();
        }
    }

    finishedIntroAnima(){

        window.addEventListener('wheel', this.topPageWheelEvent, false);
        this.nextNavTitle.addEventListener('click', this.toNextSectionEvent, false);
        this.nextNavTitle.style.cursor = 'pointer';
        this.titleAnime = sectionTitleAnime('#next-nav-title--work');

        TweenLite.to($("#next-nav-title--work"), this.transitionTime, {
            y:0,
            ease: Power3.easeInOut
        });
    }

    setNextPage(nextpage){
        this.nextPage = nextpage;
    }

    topPageWheelEvent(e) {
        let self = this;
        // console.log("this.currentBlockNum:"+this.currentBlockNum);
        if (TweenMax.isTweening(window)) return false;
        // TweenLite.killTweensOf(window);
        if (e.deltaY > 0) {
            this.toNextSectionEvent();
        }
    }

    toNextSectionEvent() {
        // console.log("this:"+this);
        window.removeEventListener('wheel', this.topPageWheelEvent, false);
        this.nextNavTitle.removeEventListener('click', this.toNextSectionEvent, false);
        this.nextNavTitle.style.cursor = '';
        stopAnime(this.titleAnime);
        // removeAnime('#next-nav-title--work .letter');
        TweenLite.to($("#next-nav-title--work"), this.transitionTime, {
            y:100,
            ease: Power3.easeInOut
        });

        this.nextPage();
    }


}
