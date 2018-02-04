import jQuery from 'jquery';
const $ = jQuery;
import { TweenMax, TweenLite, isTweening, Power2, Power3, Circ, Sine, Back, Elastic, TimelineLite } from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin";

export class Blog {
    
    constructor() {
        this.maxNum = $(".scrollPage-page").length;
        this.currentBlockNum = 0;
        this.prevNum = undefined;
        this.transitionTime = 1;
        this.blogPageWheel = this.blogPageWheelEvent.bind(this);
        this.toPrevSectionEvent = this.toPrevSectionEvent.bind(this);
        this.nextPage = '';
        this.prevProjectNum = 0;
        this.itemContents = [];
        this.itemMaxNum = 0;
        let self = this;
        this.prevNavTitle = '';
    }

    init() {
        let self = this;
        let $blogPage = $('#blogPage');
        window.addEventListener('wheel', this.blogPageWheel);
        this.prevNavTitle = document.getElementById('next-nav-title--blog');
        this.prevNavTitle.addEventListener('click', this.toPrevSectionEvent, false);
        this.prevNavTitle.style.cursor = 'pointer';
        let aboutPos = $blogPage.position();
        TweenLite.to(window, this.transitionTime, {
            scrollTo: aboutPos.top,
            ease: Power3.easeInOut,
            onComplete: function () {
            }
        });
        fetch('http://blog.alien-house.com/index.xml').then(function(response) {
            return response.text();
        }).then(function(body) {
            $('#blog-box').empty();
            let items = $(body).find('channel').find('item');
            self.itemMaxNum = items.length;
            for(var i = 0; i < self.itemMaxNum; i++){
                let metaContents = '<div class="post-meta">';
                metaContents += '<h1>' + $(items[i]).find('title').text() + '</h1>';
                metaContents += '<time>' + $(items[i]).find('pubDate').text() + '</time>';
                metaContents += '<p>' + $(items[i]).find('description').text() + '</p>';
                metaContents += '<div class="btn-detail">';
                metaContents += '<a href="'+ $(items[i]).find('links').text() +'" target="_blank">VIEW <i class="fa fa-external-link" aria-hidden="true"></i></a>';
                metaContents += '</div>';
                metaContents += '</div>';
                let imgContents = '<div class="post-img">';
                imgContents += '<img src="'+ $(items[i]).find('thumbnail').text() +'">';
                imgContents += '</div>';
                $('#blog-box').append('<article class="blog-article">'+imgContents+metaContents+'</article>');
            }
        });
    }

    setPrevPage(prevpage){
        this.prevPage = prevpage;
    }

    blogPageWheelEvent(e) {
        let self = this;
        if (TweenMax.isTweening(window)) return false;
        if (e.deltaY > 10) {
        } else if(e.deltaY < -50) {
            this.toPrevSectionEvent();
            return false;
        }else{
            return false;
        }
    }

    toPrevSectionEvent(){
        window.removeEventListener('wheel', this.blogPageWheel);
        this.prevNavTitle.removeEventListener('click', this.toPrevSectionEvent, false);
        this.prevNavTitle.style.cursor = '';
        this.prevPage();
    }

}



