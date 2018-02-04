import jQuery from 'jquery';
const $ = jQuery;
import { TweenMax, TweenLite, isTweening, Power2, Power3, Circ, Sine, Back, Elastic, TimelineLite } from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import { Splash } from './splash';
import { sectionStartTitleAnime, sectionTitleAnime, stopAnime, removeAnime } from './util/anime';

export class Project {
    
    constructor() {
        this.firsttime = true;
        this.maxNum = $(".scrollPage-page").length;
        this.prevNum = undefined;
        this.transitionTime = 1;
        this.projectPageWheelEvent = this.projectPageWheelEvent.bind(this);
        this.toNextSectionEvent = this.toNextSectionEvent.bind(this);
        this.toPrevSectionEvent = this.toPrevSectionEvent.bind(this);
        this.nextPage = '';
        this.prevPage = '';
        this.currentProjectNum = 0;
        this.prevProjectNum = undefined;
        this.titleAnime = '';
        this.nextNavTitle = document.getElementById('next-nav-title--about');
        this.prevNavTitle = document.getElementById('next-nav-title--work');
        
        $('body').on('click', '.scrollPage-nav__list li',  (event) => {
            this.clickProjectNav($(event.currentTarget).data('page'));
        });

        // $('.scrollPage-nav__list').find('li').click( (event) => {
        //     this.clickProjectNav($(event.currentTarget).data('page'));
        // });
        // let self = this;
        // setInterval(function(){
        //     console.log("currentProjectNum:"+self.currentProjectNum);
        // },500);

    }

    clickProjectNav(num){
        // console.log("num:"+num);
        this.currentProjectNum = num;
        this.afterChangeState();
    }

    setNextPage(nextpage){
        this.nextPage = nextpage;
    }

    setPrevPage(prevpage){
        this.prevPage = prevpage;
    }

    init() {
        let self = this;
        this.nextNavTitle = document.getElementById('next-nav-title--about');
        this.prevNavTitle = document.getElementById('next-nav-title--work');
        let $projectPage = $('#projectPage');
        let projectPagePos = $projectPage.position();
        // this.currentProjectNum = 0;
        // console.log("project init");
        TweenLite.to(window, this.transitionTime, {
            delay: 0.1,
            scrollTo: projectPagePos.top,
            ease: Power3.easeInOut,
            onComplete: function () {
                // console.log("次はproject");
                // let $list = $('.scrollPage-page').eq(self.currentProjectNum);
                // self.appearAnime($list);
                self.afterChangeState();
                self.nextNavTitle.addEventListener('click', self.toNextSectionEvent, false);
                self.nextNavTitle.style.cursor = 'pointer';
                self.prevNavTitle.addEventListener('click', self.toPrevSectionEvent, false);
                self.prevNavTitle.style.cursor = 'pointer';
                window.addEventListener('wheel', self.projectPageWheelEvent);
            }
        });

        if(this.firsttime){
            sectionStartTitleAnime('#next-nav-title--about');
            self.titleAnime = sectionTitleAnime('#next-nav-title--about');
            self.firsttime = false;
        }else{
            self.titleAnime = sectionTitleAnime('#next-nav-title--about');
            TweenLite.to($("#next-nav-title--about"), this.transitionTime, {
                y:0,
                ease: Power3.easeInOut
            });
        }

    }

    projectPageWheelEvent(e) {
        let self = this;
        let maxNum = this.maxNum;
        let $list;
        if (TweenMax.isTweening($('.scrollPage-page'))) return false;
        // if (TweenMax.isTweening(window)) return false;
        if (e.deltaY > 10) {
            //最大ページ数未満ならプラスして行く：下へ
            if (maxNum - 1 > this.currentProjectNum) {
                this.currentProjectNum++;
            //最大ページ数だったら
            } else if (maxNum - 1 === this.currentProjectNum) {
                //アバウトのページへ
                this.toNextSectionEvent();
                // console.log("アバウトのページへ");
                return false;
            }
        } else if(e.deltaY < -10) {
            //ゼロ以上だったら１下げる：上へ
            if (0 <= this.currentProjectNum) {
                this.currentProjectNum--;
                //トップに戻る
                if (this.currentProjectNum <= -1) {
                    this.toPrevSectionEvent();
        // console.log("currentProjectNum:"+this.currentProjectNum);
                    return false;
                }
            }
        }else{
        // console.log("e.deltaY:" + e.deltaY);
            return false;
        }
        this.afterChangeState();
    }

    toNextSectionEvent(){
        let $list;

        $list = $('.scrollPage-page').eq(this.currentProjectNum);
        TweenLite.to($list, this.transitionTime, {
            autoAlpha: 0
        });
        window.removeEventListener('wheel', this.projectPageWheelEvent);
        stopAnime(this.titleAnime);
        TweenLite.to($("#next-nav-title--about"), this.transitionTime, {
            y:100,
            ease: Power3.easeInOut
        });
        this.nextNavTitle.removeEventListener('click', this.toNextSectionEvent, false);
        this.nextNavTitle.style.cursor = '';
        this.prevNavTitle.removeEventListener('click', this.toPrevSectionEvent, false);
        this.prevNavTitle.style.cursor = '';
        this.currentProjectNum = this.maxNum - 1;
        // console.log(this.nextPage);
        this.nextPage();
    }

    toPrevSectionEvent(){
        let $list;
        window.removeEventListener('wheel', this.projectPageWheelEvent);
        this.nextNavTitle.removeEventListener('click', this.toNextSectionEvent, false);
        this.nextNavTitle.style.cursor = '';
        this.prevNavTitle.removeEventListener('click', this.toPrevSectionEvent, false);
        this.prevNavTitle.style.cursor = '';
        //self.initialPage(1);
        this.currentProjectNum = 0;
        $list = $('.scrollPage-page').eq(this.currentProjectNum);
        // TweenLite.to($list, this.transitionTime, {
        //     autoAlpha: 0
        // });
        // this.afterChangeState();
        TweenLite.to($list, this.transitionTime, {
            autoAlpha: 0
        });
        this.prevPage();
    }


    afterChangeState(){
        // console.log("currentProjectNum:"+this.currentProjectNum);

        let $projectList = $('#scrollPage-nav__list');
        let $projectIndicator = $('#scrollPageAlien');
        let $listPrev;
        //--------------
        // 表示
        //--------------
        // console.log("afterChangeState+currentProjectNum:" + this.currentProjectNum);
        let $list = $('.scrollPage-page').eq(this.currentProjectNum);
        // page moving
        this.appearAnime($list, 0.5);

        //--------------
        // インジケーター
        //--------------
        let topPos = $projectList.find('li').eq(this.currentProjectNum).position();
        // console.log($projectList);
        // console.log("currentProjectNum:"+this.currentProjectNum);
        TweenLite.to($projectIndicator, 0.8, {
            ease: Elastic.easeInOut,
            y:topPos.top - 5 + 'px'
        });

        //--------------
        // 前のものを非表示
        //--------------
        if (this.prevProjectNum != undefined && this.prevProjectNum !== this.currentProjectNum) {
            // console.log("num:" + num);
            $listPrev = $('.scrollPage-page').eq(this.prevProjectNum);
            TweenLite.to($listPrev, this.transitionTime, {
                autoAlpha: 0
            });
        }
    }


    appearAnime(element, dtime = 0){
        let self = this;
        TweenLite.to(element, this.transitionTime, {
            autoAlpha: 1,
            onComplete: function () {
                self.prevProjectNum = self.currentProjectNum;
            }
        });
        let masterTL = new TimelineLite({
            onComplete:function() {
                // console.log("onComplete:");
            }
          });
        masterTL
            .fromTo(element.find('.project-case-number'), this.transitionTime, 
                {x: '30', autoAlpha: 0}, 
                {delay:dtime, x: '0', autoAlpha: 1,ease: Power2.easeOut})
            .fromTo(element.find('.project-title'), this.transitionTime, 
                {x: '30', autoAlpha: 0}, 
                {delay:-0.9, x: '0', autoAlpha: 1, ease: Power2.easeOut})
            .fromTo(element.find('.project-type'), this.transitionTime, 
                {x: '30', autoAlpha: 0}, 
                {delay:-0.9, x: '0', autoAlpha: 1,ease: Power2.easeOut})
            .fromTo(element.find('.project-desc'), this.transitionTime, 
                {x: '30', autoAlpha: 0}, 
                {delay:-0.9, x: '0', autoAlpha: 1,ease: Power2.easeOut})
            .fromTo(element.find('.btn-capsule'), this.transitionTime, 
                {x: '30', autoAlpha: 0}, 
                {delay:-0.9, x: '0', autoAlpha: 1,ease: Power2.easeOut})
            .fromTo(element.find('.project-gallery'), this.transitionTime, 
                {x: '30', autoAlpha: 0}, 
                {delay:-0.9, x: '0', autoAlpha: 1,ease: Power2.easeOut});

    }

}
