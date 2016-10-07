$(function(){
    var section = $('#section_wrap');
    var pagedots = $('#vertical_dots').children();
    var $window = $(window);
    var act_section = 0;
    var win_height = $window.height();
    var win_width = $window.width();
    
    section.children().each(function(i){
        $(this).height(win_height);
    });
    $('#menu_right').css({
            'left': String((win_width-1200)/2+993)+'px',
    });

    if(win_width <= 1025){
        $('#menu_right').css({
            'left': '10px',
            'top': '70px',
        });
    }
    else if(win_width <= 1200){
        $('#menu_right').css({
            'left': '993px',
            'top': '0px',
        });
    }
    section_pos();
    
    function section_pos(){
        var s1 = section.find('.section_cont');
        var center_h = win_height/2-35;
        
        s1.css('margin-top', String(center_h-181)+'px');
        
        section.children().each(function(i){
            if(i>0){
                $(this).find('.cont_wrap').css({
                    'padding-top': String(3*win_height/4)+'px',
                    'transition-delay': '0.3s',
                    'transition-duration': '0.5s',
                });
            }
        });
    }
    
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
                'top': '70px',
            });
        }
        else if(win_width <= 1200){
            $('#menu_right').css({
                'left': '993px',
                'top': '0px',
            });
        }
        else {
            $('#menu_right').css({
                'left': String((win_width-1200)/2+993)+'px',
                'top': '0px',
            });
        }
        section_pos();
        section.children().eq(act_section).find('.cont_wrap').css({
            'padding-top': '0px',
            'transition-delay': '0.3s',
            'transition-duration': '0.5s',
            'transition-timing-function': 'easy-out'
        });
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
            if((Math.abs(parseInt(section.css('margin-top'), 10) + win_height * act_section) < 1) && act_section < 2){
                page_motion(from, from + 1);
            }
        }
    });
    
    function page_motion(from, to){
        act_section = to;
        section.css('margin-top', (-1) * act_section * win_height);
        page_dot(from, to);
        if(from >= to){ // page up
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
});