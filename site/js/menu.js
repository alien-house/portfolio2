import jQuery from 'jquery';
const $ = jQuery;
import { TweenMax, TweenLite, isTweening, Power2, Power3, Circ, Sine, Back, Elastic, TimelineLite } from "gsap";

const alienhouseURL = 'http://localhost:3000';
const alienhouseURL2 = 'http://alienhouse2.localhost/';
const alienhouseURL3 = 'http://alien-house.com/';
export class Menu {
    
    constructor(menu, nav) {
        this.btn = document.getElementById(menu);
        this.nav = document.getElementById(nav);
        this.topInit = '';
        this.workGalleryInit = '';
        let self = this;

        $(window).on('popstate', function(event){
            // if (!event.originalEvent.state) return; 
            self.showLoading(function(){
                self.changePage(location.pathname);
            }
            );
        });
    }

    init(topInit, workGalleryInit){
        this.topInit = topInit;
        this.workGalleryInit = workGalleryInit;
    	// let menu = document.getElementById(this.btn);
		this.btn.addEventListener('click', _ => this.listener(), false); 

        $('body').on('click', '.anchor_nav',  (event) => {
            event.preventDefault();
            let self = this;
            // console.log("anchor_nav----");
            // console.log(event.currentTarget.href);
            // this.clickPage($(event.currentTarget).attr('href'));
            if(event.currentTarget.href !== location.href){
                this.showLoading(function(){
                        self.changePage(event.currentTarget.href);
                        history.pushState('chnagesPages', '', event.currentTarget.href);
                        // console.log("history.state"); 
                        // console.log(history.state); 
                        // console.log(event.currentTarget.href); 
                    }
                );
                // let isHome = $(event.currentTarget).data('anchor');
                // this.changePage(event.currentTarget.href);
            }
            if($(this.btn).hasClass('is_open')){
                this.closeMenu();
            }
            return false;
        });

    }

    changePage(href){
        let self = this;
        let isHome = href;
        fetch(href).then(function(response) {
            return response.text();
        }).then(function(body) {
            let contents = $(body).find('#contents');
            // console.log(body);
            // console.log($(body).find('#contents'));
            $('#contents').remove();
            $('#main').append(contents);
            if(isHome == alienhouseURL || isHome == alienhouseURL2 || isHome == alienhouseURL3 || isHome == '/'){
                $('body').addClass('home');
                self.topInit();
            }else{
                $('body').removeClass('home');
            }
            if(isHome.includes('project')){
                self.workGalleryInit();
            }
            self.closeLoading();
        });
    }

    showLoading(func = null){
        TweenLite.to($('.loading'), 0.8, {
            autoAlpha: 1,
            ease: Power3.easeInOut,
            onComplete:function(){
                if(func){
                    func();
                }
            }
        });
    }
    closeLoading(func = null){
        TweenLite.to(window, 0, { scrollTo: 0});
        TweenLite.to($('.loading'), 0.8, {
            autoAlpha: 0,
            delay:0.5,
            ease: Power3.easeInOut,
            onComplete:function(){
                if(func){
                    func();
                }
            }
        });
    }

    listener() { 
        let self = this;
        if($(this.btn).hasClass('is_open')){
            //diappear
            this.closeMenu();
        }else{
            //appear
            this.openMenu();
        }
    }; 
    openMenu(){
        let self = this;
        TweenLite.to(this.nav, 0.5, {
            autoAlpha: 1
        });
         TweenMax.staggerFromTo($(this.nav).find('li'),0.8, { 
            x: -20,
            opacity: 0
        }, { 
            x: 0,
            opacity: 1,
            delay:0.2
        }, 0.2); 
         //add star
         TweenMax.staggerFromTo($(this.nav).find('a'),0.8, { 
            opacity: 1
        }, { 
            className:'+=addStarAmim',
            opacity: 1,
            delay:0.4
        }, 0.2, 
        function(){
            $(self.nav).find('a').removeClass('addStarAmim');
        }); 

        $(this.btn).addClass('is_open');
    }

    closeMenu(){
        let self = this;
        TweenMax.staggerFromTo($(this.nav).find('li'),0.4, { 
            x: 0,
            opacity: 1,
        }, { 
            x: 20,
            opacity: 0
        }, 0.1, 
        function(){
            $(self.btn).removeClass('is_open');
        }); 
        TweenLite.to(this.nav, 0.5, {
            autoAlpha: 0,
            delay:0.3,
            ease: Power3.easeInOut
        });
    }

}
