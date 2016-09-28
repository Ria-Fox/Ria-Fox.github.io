$(function(){
    var section = $('#section_wrap');
    var pagedots = $('#vertical_dots').children();
    var pagearrows = $('.p_arrow');
    var act_section = 0;
    var win_height = 0;
    var win_width = 0;
    var phone_index = [0,0,0,0]; // each of section 2's slide 1,2,3,4 index
    var slide_index = [0,0,0,0]; // each of section 1,2,3,4's slide index
    var max_index = [1,3,2,2]; // number of each section's slide
    
    function section_pos(){
        var s1 = section.find('.section_cont1');
        var s2 = section.find('.section_cont2');
        var s3 = section.find('.section_cont3');
        var s4 = section.find('.section_cont4');
        var firstarrow = $('.section1 > .p_arrow');
        var center_h = win_height/2-35;
        
        s1.css('margin-top', String(center_h-181)+'px');
        s2.css('margin-top', String(center_h-235)+'px');
        s3.css('margin-top', String(center_h-225)+'px');
        s4.css('margin-top', String(center_h-187)+'px');
        firstarrow.css('top', String(center_h-52.5)+'px');
        
        section.children().each(function(i){
            if(i>0){
                $(this).find('.cont_wrap').css({
                    'padding-top': String(3*win_height/4)+'px',
                    'transition-delay': '0.3s',
                    'transition-duration': '0.5s',
                });
            }
        });
        
        s2.children().each(function(i){
            if(i > 0){
                $(this).css('left', String(win_width*i)+'px');
            }
        });
        
        s2.children().each(function(i){
            var that = $(this);
            that.find('> .s21 > div#phone_slide1').css(
                'background-image', 'url(\'css/img/phone_slide/'+String(i+1)+'.jpg\')'
            );
            that.find('.s22').css('background-image', 'url(\'css/img/contents/'+String(i+1)+'.png\')');
        })
    }
        
        
    var $window = $(window);
    
    win_height = $window.height();
    win_width = $window.width();
    section.children().each(function(i){
        $(this).height(win_height);
    });
    $('#menu_right').css({
            'left': String((win_width-1200)/2+993)+'px',
    });

    if(win_width <= 1025){
        $('#menu_right').css({
            'right': 'auto',
            'left': '10px',
            'top': '100px',
        });
    }
    else if(win_width <= 1200){
        $('#menu_right').css({
            'left': '993px',
        });
    }
    $('.p_arrow').css('top', String(win_height)+'px');
    section_pos();
    
    
    $window.on('resize', function(event){
        win_height = $window.height();
        win_width = $window.width();
        section.children().each(function(i){
            $(this).height(win_height);
        });
        section.css('margin-top', -act_section*win_height);
        $('.section'+String(act_section+1)+' > .section_footer').css('bottom', '0px');
        if(win_width <= 1025){
            $('#menu_right').css({
                'right': 'auto',
                'left': '10px',
                'top': '100px',
            });
        }
        else if(win_width <= 1200){
            $('#menu_right').css({
                'left': '993px',
                'top': '17.5px',
            });
        }
        else {
            $('#menu_right').css({
                'left': String((win_width-1200)/2+993)+'px',
                'top': '17.5px',
            });
        }
        section_pos();
        $('.section'+String(act_section+2)+' > .p_arrow').css('top', String(2*win_height)+'px');
    });
    
    $window.on('mousewheel DOMMouseScroll', function(event){
        var from = act_section;
        if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
            // scroll up, active section--;
            if((Math.abs(parseInt(section.css('margin-top'), 10) + win_height * act_section) < 1) && act_section > 0){
                page_motion(from, from - 1);
            }
        }
        else {
            // scroll down, active section++;
            if((Math.abs(parseInt(section.css('margin-top'), 10) + win_height * act_section) < 1) && act_section < 3){
                page_motion(from, from + 1);
            }
        }
    });
    
    function page_motion(from, to){
        act_section = to;
        section.css('margin-top', (-1) * act_section * win_height);
        page_dot(from, to);
        if(from > to){ // page up
            section.children().eq(act_section+1).find('.cont_wrap').css({
                'padding-top': String(3*win_height/4)+'px',
                'transition-delay': '0.5s',
                'transition-duration': '0.05s',
            });
            section.children().each(function(i){
                var $this = $(this);
                $this.find('.section_footer').css({
                    'bottom': String(win_height*(to-i))+'px',
                    'transition-delay': '0s',
                    'transition-duraion': '0.7s',
                    'transition-timing-function': 'ease-in-out',
                });
                $this.find('.p_arrow').css('top', String((win_height/2-87.5)+win_height*(i-to))+'px');
            });
            
        }
        else {
            section.children().eq(act_section).find('.cont_wrap').css({
                'padding-top': '0px',
                'transition-delay': '0.3s',
                'transition-duration': '0.5s',
                'transition-timing-function': 'easy-out'
            });
            section.children().each(function(i){
                if(i === to){
                    $('.section'+String(act_section+1)+' > .section_footer').css({
                        'bottom': '0px',
                        'transition-delay': '0.4s',
                        'transition-duraion': '0.3s',
                        'transition-timing-function': 'ease-out',
                    });
                }
                else { // page down
                    $(this).find('.section_footer').css({
                        'bottom': String(win_height*(to-i))+'px',
                        'transition-delay': '0s',
                        'transition-duraion': '0.5s',
                        'transition-timing-function': 'linear',
                    });
                }
                $(this).find('.p_arrow').css('top', String((win_height/2-87.5)+win_height*(i-to))+'px');
            });
            
            //console.log();
        }
    }
    
    function page_dot(from, to) {
        pagedots.eq(to).find('img').css('margin-top', '-55px');
        pagedots.eq(from).find('img').css('margin-top', '-70px');
    }
    
    pagedots.click(function(event){
        var to = $(this).index();
        var from = act_section;
        page_motion(from, to);
    });
    
    pagearrows.click(function(event){
        var curslide = slide_index[act_section];
        //alert('clicked');
        if($(this).hasClass('prev_arrow')){
            if(act_section === 0){
                $('.section1 > .section_footer').css('bottom', '-140px');
            }
            if(curslide < 1){
                slide_index[act_section] = max_index[act_section];
            }
            else{
                slide_index[act_section]--;
            }
        }
        else {
            if(curslide > max_index[act_section]-1){
                slide_index[act_section] = 0;
            }
            else{
                slide_index[act_section]++;
            }
        }
        page_slide();
    });
    
    function page_slide() {
        var curpage = $('.section_cont'+String(act_section+1));
        curpage.css('margin-left', String(-win_width*slide_index[act_section]+130)+'px');
    }
    
    /*phone_slide();
    
    function phone_slide(){
        setInterval(function(){
            if(act_section > 0 && act_section < 3){
                var n = phone_index[slide_index[act_section]];
                if(n > 3) {phone_index[slide_index[act_section]] = 0}
                else {phone_index[slide_index[act_section]]++;}
                $('.section_content'+String(act_section+1))
                    .find('#slide'+String(slide_index[act_section]))
                    .find('.s21 > phone_slide1')
                    .css('background-position', String(194*phone_index[slide_index[act_section]])+'px 0px');
            }
        }, 1000);
    }*/
    
});