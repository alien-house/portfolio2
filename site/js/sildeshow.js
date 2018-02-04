import jQuery from 'jquery';
const $ = jQuery;
import { TweenMax, TweenLite, Power1, Power2, Power3,  Circ, Sine, Back, Elastic, TimelineLite } from "gsap";

export class SildeShow {

    constructor(duration) {
        this.myVar;
        this.maxNum = $(".sildeshow-item").length;
        this.currentNum = 0;
        this.prevNum = undefined;
        this.duration = duration;
        // console.log(this.duration);
        // console.log("start!");
        this.generateIndicator();
        // // this.duration = duration;
        // $(document).ready(() => {
        //     // console.log('ts 1');
        //     // TweenLite.from(".mt", 2, { x: '-=200px', autoAlpha: 0 });
        // });
    }

    // get Duration() {
    //     return this._duration;
    // }

    generateIndicator(){
        let list = "<li></li>";
        let element;
        let that = this;
        $(".sildeshow-box").after('<ul class="sildeshow-list" />');
        for (var index = 0; index < this.maxNum; index++) {
            $(".sildeshow-list").append(list);
        }
        $(".sildeshow-list").find('li').on('click', function (key, value) {
            console.log($(".sildeshow-list").find('li').index(this));
            that.clickIndicator($(".sildeshow-list").find('li').index(this));
        });
    }

    clickIndicator(num){
        console.log("clickIndicator");
        this.currentNum = num;
        window.clearInterval(this.myVar);
        this.init();
    }

    durationFunc(){
        // console.log(this);
        console.log(this.currentNum);
        let $ssimg = $(".sildeshow-item");
        let $sslist = $(".sildeshow-list").find('li').eq(this.currentNum);
        let $ssPrevlist = $(".sildeshow-list").find('li').eq(this.prevNum);
        $sslist.addClass("current");
        // console.log($ssimg.eq(this.currentNum));
        $ssPrevlist.removeClass("current");
        TweenLite.killTweensOf($ssimg.eq(this.prevNum));
        TweenLite.fromTo($ssimg.eq(this.currentNum), 1.5, 
            { 
                x: '100px', 
                autoAlpha: 0
            }, { 
                x: '0', 
                autoAlpha: 1,
                ease: Power1.easeInOut,
                delay: 0.5
            });
        if (this.prevNum >= 0) {
            TweenLite.to($ssimg.eq(this.prevNum), 1,
                {
                    x: '-100px',
                    autoAlpha: 0,
                    ease: Circ.easeIn
                });
        }
        this.prevNum = this.currentNum;
        if (this.maxNum - 1 > this.currentNum){
            this.currentNum++;
        }else{
            this.currentNum = 0;
        }
    }

    init(){
        this.durationFunc();
        this.myVar = setInterval(this.durationFunc.bind(this), this.duration);


        // var element = document.getElementById('text');
        // TweenLite.to(element, 1, { 
        //     css: { 
        //         top: "100px", 
        //         left: "50px", 
        //         backgroundColor: "#ff0000", 
        //         fontSize: "12px" 
        //     }, 
        //     delay: 0.5 
        // });

        // var nam = document.getElementsByName('mt');


        // TweenMax.set(".mt", { autoAlpha: 0 });
        // TweenLite.to(".mt", 1,
        // {
        //     autoAlpha: 1,
        //     delay: function (index, target) {
        //         return (index + 1) * 1000
        //     },
        //     x: function (index, target) {
        //         console.log(index, target);
        //         return (index + 1) * 100 // 100, 200, 300
        //     }
        // })


        // TweenLite.to(nam, 1, { opacity: 0.5, rotation: 45 });




        //     console.log("dekudssstaa");
        //     $.ajax({
        //         url: "test.html",
        //         dataType: 'html',
        //     }).done(function (data) {
        //         // var out_html = $($.parseHTML(data));

        //         var result = $('<div />').append(data).find('#text').html();
        //         console.log(result);
        //         $('#textP').html(result);

        //         // var out_html = $($.parseHTML(data));//parse
        //         // $('#textP').empty().append(out_html.filter('#text')[0].innerHTML);//insert

        //         // $("#text").html($(data).find('#text').text());
        //         // $('p').append("kore");
        //         $(this).addClass("done");
        //     });
        //     // $('p').append(this.text);
    }




}
