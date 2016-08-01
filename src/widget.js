'use strict';
(function(jQuery) {
	jQuery(function() { //on DOM ready
		//jQuery(".banner-floating").simplyScroll();
        jQuery(".banner-floating-container").each(function(){
            // console.log(this);
            var jquery_banner_floating = jQuery(".banner-floating",this);
            var jquery_banner_floating_in_any = jQuery(".banner-floating>*",this);
            var time = parseInt(jQuery(this).data('time')) || 15000;
            var direction = jQuery(this).data('direction') || 'right2left';
            var relative_to = direction == 'top2bottom' || direction == 'bottom2top' ? 'top' : 'left';
            // var relative_to = ['top2bottom','bottom2top'].indexOf(direction)>=0 ? 'top' : 'left';
            var is_direction_left = relative_to == 'left';
            var should_reverse_position = direction == 'left2right' || direction == 'top2bottom';
            var size = 0;
            jquery_banner_floating_in_any.each(function(){
                size += is_direction_left ? jQuery(this).outerWidth(true) : jQuery(this).outerHeight(true);
            });
            var repeat = is_direction_left ? Math.ceil(parseInt(jQuery(this).width())/size)+1 : Math.ceil(parseInt(jQuery(this).height())/size)+1;
            // console.log(repeat);
            var base = jquery_banner_floating_in_any.clone();
            // console.log(base);
            for(var i = 0; i<repeat;i++) jquery_banner_floating.append(base.clone());
            if(should_reverse_position){
                jquery_banner_floating.css(relative_to,(-size)+'px');
            }
            // var transition = "transition 5s linear";
            // var transition_back = "transition 0s linear";
            // jQuery(".banner-floating").css('transition',transition).css('transform','translateX(-'+w+'px)');
            // setTimeout(function(){
            //     jQuery(".banner-floating").css('transition',transition_back).css('transform','translateX(0)');
            // },5000);
            var pos = 0;
            var tstart = 0
            var tend = 0;
            var klnum = time*60/1000;
            var correction = 0;
            var interval = setInterval(function(){
                var t = Date.now();
                if(t>tend){
                    tstart = Date.now();
                    tend = tstart + time;
                }
                var m = t - tstart;
                var kl = klnum * m/time;
                var pos = - size * kl/klnum;
                try{
                    if(jquery_banner_floating.is(':hover')){
                        correction = (should_reverse_position ?
                                            - parseInt(jquery_banner_floating.css(relative_to))
                                        :   parseInt(jquery_banner_floating.css(relative_to)))
                                    - pos; 
                    }
                }catch(e){}
                pos += correction;
                if(pos < -size){
                    pos += size;
                }else if(pos > 0){
                    pos -= size;
                }
                // console.log(pos);
                if(should_reverse_position){
                    pos = -pos - size;
                }
                jquery_banner_floating.css(relative_to,pos + 'px');
                // console.log('step')
            }.bind(this),16.6);//1000/60
            // }.bind(this),time/1000/60);
        })
	});
})(jQuery);