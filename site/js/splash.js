import jQuery from 'jquery';
const $ = jQuery;
import { TweenMax, TweenLite, isTweening, Power2, Power3, Circ, Sine, Back, Elastic, TimelineLite } from "gsap";
import Snap from 'imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js';
import { SiteInfo } from './util/responsiveSetting';

export class Splash {
    
    constructor(duration) {
        this.isPC = SiteInfo.spWidth < SiteInfo.getWinWidth() ? true : false;
        this.myVar;
        this.maxNum = $(".scrollPage-page").length;
        this.currentNum = 0;
        this.prevNum = undefined;
        this.duration = duration;
        this.wheelLock = false;
        this.s = Snap("#splash");
        this.sgroup = '';
        
        // // this.duration = duration;
        // $(document).ready(() => {
        //     // console.log('ts 1');
        //     // TweenLite.from(".mt", 2, { x: '-=200px', autoAlpha: 0 });
        // });
        TweenLite.from("#splash", 0.5, { 
            autoAlpha: 0,
            scale: 0,
            ease: Back.easeInOut
        });
        // TODO : making function for random animation (now just static postion)
        this.colorList = {'red':"#d34718", 'green':"#0ab82f", 'yellow':"#c6b30e"}; 

        if(this.isPC) {
            this.positionList = ['r60,T100,400', 'r60,T680,490', 'r60,T580,9', 'r90,T200,60', 'r30,T300,460',
            'r30,T100,160', 'r60,T780,390', 'r30,T680,120', 'r50,T200,420' ]; 
        }else {
            this.positionList = ['r60,T360,520', 'r60,T400,20', 'r60,T560,60', 'r60,T600,170', 'r30,T320,430',
            'r30,T340,120', 'r60,T580,480', 'r30,T480,120', 'r50,T500,460']; 
        }
        
        let c1 = this.createCircle(this.colorList['yellow'], this.positionList[0],12);
        let c2 = this.createCircle(this.colorList['yellow'], this.positionList[1], 10);
        let c3 = this.createCircle(this.colorList['yellow'], this.positionList[2], 6);
        
        let t1 = this.createTriangle(this.colorList['green'], this.positionList[3],8);
        let t2 = this.createTriangle(this.colorList['red'], this.positionList[4],10);
        
        let r1 = this.createRect(this.colorList['red'], this.positionList[5],24);
        let r2 = this.createRect(this.colorList['green'], this.positionList[6],28);
        
        let cr1 = this.createCross(this.colorList['green'], this.positionList[7],26);
        let cr2 = this.createCross(this.colorList['yellow'], this.positionList[8],16);
        this.sgroup = this.s.group(c1, c2, c3, t1, t2, r1, r2, cr1, cr2);

        // document.body.addEventListener("mousemove", function(event) {
        //     console.log('mouseover', event);
        //     this.sgroup.animate({y:960}, 500, mina.elastic);
        // });
// document.body.mouseover(function(event) {
// }).mouseout(function() {
//     console.log('mouseout', event);
// });
        // this.s.mouseover( this.animateSVG );
    }
    animateSVG(){
        // console.log("hanton");
        // this.animate({cy: 300}, 5000,mina.bounce);
        // this.animate({fill:"red"},200);
    };

    init() {
        let that = this;
    }

    createCircle(color = "#000", pos = "r60,30,20", size = 20) {
        let circle = this.s.circle(0, 0, size);
        circle.attr({
            stroke: color,
            strokeWidth: 3,
            fill: "#333",
            "fill-opacity": 0,
        });
        circle.transform(pos);
        return circle;
//         circle.mouseover(function(event) {
//     console.log('mouseover', event);
// }).mouseout(function() {
//     console.log('mouseout', event);
// });
//         var bb = circle.getBBox();
//         var diffX = 500 - bb.cx;
//         var diffY = 200 - bb.cy;
//         console.log(bb);
//         circle.animate({
//             transform: pos ,
//         }, 750, mina.easeout);
    }
    createTriangle(color = "#000", pos = "r60,30,20", size = 20) {
        let size2 = size * 2;
        let triangle = this.s.polygon(size, 0, 0, size2, size2, size2).attr({
            fill: color,
            strokeWidth: 3,
            "stroke-linejoin": "round",
            "fill-opacity": 0,
            stroke:color
        });
        triangle.transform(pos);
        return triangle;
    }
    createRect(color = "#000", pos = "r60,T340,120", size = 20) {
        //react : x, y, width, height, radius
        let rect = this.s.rect(0, 0, size, size, 3);
        rect.attr({
            stroke: color,
            strokeWidth: 3,
            fill: color,
            "fill-opacity": 0,
        });
        rect.transform(pos);
        return rect;
    }
    createCross(color = "#000", pos = "r60,T340,120", size = 30) {
        let g = this.s.group();
        //react : x, y, width, height, radius
        let xpos = size / 2 - 2;
        let ver = g.rect(xpos, 0, 4, size, 2);
        let hol = g.rect(0, xpos, size, 4, 2);
        // paper3.transform('r20,100,100');
        g.attr({
            fill: color
        });
        g.transform(pos);
        return g;
    }


}
