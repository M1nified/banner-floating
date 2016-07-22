<?php namespace banner_floating;
 defined( 'ABSPATH' ) or die( 'No script kiddies please!' );

 function get_time($instance){
     return isset($instance['time'])?$instance['time']:15000;
 }
