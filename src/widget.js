(function(jQuery) {
	jQuery(function() { //on DOM ready
		//jQuery(".banner-floating").simplyScroll();
        jQuery(".banner-floating-container").each(function(){
            // console.log(this);
            var time = parseInt(jQuery(this).data('time')) || 15000;
            var w = 0;
            jQuery(".banner-floating>*",this).each(function(){
                w += jQuery(this).outerWidth(true);
            });
            var repeat = Math.ceil(parseInt(jQuery(this).width())/w)+1;
            // console.log(repeat);
            var base = jQuery(".banner-floating>*",this).clone();
            // console.log(base);
            for(var i = 0; i<repeat;i++) jQuery(".banner-floating",this).append(base.clone());
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
                var pos = - w * kl/klnum;
                try{
                    if(jQuery(".banner-floating",this).is(':hover')){
                        correction = parseInt(jQuery(".banner-floating",this).css('left')) - pos; 
                    }
                }catch(e){}
                pos += correction;
                if(pos < -w){
                    pos += w;
                }else if(pos > 0){
                    pos -= w;
                }
                // console.log(pos);
                jQuery(".banner-floating",this).css('left',pos + 'px');
                // console.log('step')
            }.bind(this),time/1000/60);
        })
	});
})(jQuery);