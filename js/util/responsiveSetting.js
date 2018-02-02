import jQuery from 'jquery';
const $ = jQuery;

export class ResponsiveSetting {
    
    constructor() {
        this.windowWidth = 0;
    }

    init() {
        let self = this;
        $(window).resize(function () {
            $('.video-wrap').css({ 'height': SiteInfo.getWinHeight() + 'px' });
            self.windowWidth = parseInt($(window).width(), 10);
            if(self.windowWidth < SiteInfo.spWidth){
            }
        });
        $('.video-wrap').css({ 'height': SiteInfo.getWinHeight() + 'px' });
        var mousewheelevent = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
    }
}

export class SiteInfo {
    static get spWidth(){
        return 768;
    }
    static getWinHeight(){
        return parseInt($(window).outerHeight(), 10);
    }
    static getWinWidth(){
        return parseInt($(window).outerWidth(), 10);
    }
}


