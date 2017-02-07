<?php namespace banner_floating;
 defined( 'ABSPATH' ) or die( 'No script kiddies please!' );
class banner_floating_widget extends \WP_Widget{
    const DEFAULTS = [
        'width' => '100%',
        'height' => '250px'
    ];
    function __construct(){
        parent::__construct(
            'banner_floating_widget',
            __('Banner Floating','banner_floating_domain'),
            array(
                'description' => __('Creates floating images.','banner_floating_domain')
            )
        );
    }
    public function widget($args,$instance){
        echo $args['before_widget'];
        $banners = isset($instance['banners'])?$instance['banners']:[];
        $shadow = isset($instance['shadow'])?$instance['shadow']:false;
        $direction = isset($instance['direction'])?$instance['direction']:'right2left';
        $autosize = isset($instance['autosize'])?$instance['autosize']:false;
        $is_vertical = in_array($direction,['bottom2top','top2bottom']);
        $li_style = $is_vertical ? 'display:block;' : '';
        $time = get_time($instance);
        $shadow = ($shadow==true)?'shadow':'';
        if(sizeof($banners)>0){
            $width = isset($instance['width'])?$instance['width']:self::DEFAULTS['width'];
            $height = isset($instance['height'])?$instance['height']:self::DEFAULTS['height'];
            echo "<div class=\"banner-floating-container\" data-time=\"{$time}\" data-direction=\"{$direction}\"><ul class=\"banner-floating\" style=\"width:{$width};max-height:{$height}\">";
            $max_size = '';
            if($autosize == true){
                $max_size = "max-width:{$width};max-height:{$height};";
            }
            foreach ($banners as $key => $banner) {
                $alt = !empty($banner['alt']) ? ('alt="'.$banner['alt'].'" ') : '';
                $a_class = '';
                if(empty($banner['img'])){
                    $content_to_display = $banner['alt'];
                    $a_class = "class=\"banner-floating-link-text\"";
                }else{
                    $content_to_display = "<img src=\"{$banner['img']}\" {$alt} class=\"{$shadow}\" style=\"{$max_size}\">";
                }
                print "<li style=\"{$li_style}{$max_size}\"><a href=\"{$banner['link']}\" {$a_class}>{$content_to_display}</a></li>";
            }
            echo '</ul>';
            if(isset($instance['fader']) && $instance['fader']==true){
                $fader_class_dir = $is_vertical ? ' banner-fader-vertical' : ' banner-fader-horizontal';
                echo "<div class=\"banner-fader{$fader_class_dir}\"></div>";
            }
            echo '</div>';
        }
        echo $args['after_widget'];
    }
    public function form($instance){
        $title = isset($instance['title'])?$instance['title']:'';
        $fader = isset($instance['fader'])?$instance['fader']:false;
        $shadow = isset($instance['shadow'])?$instance['shadow']:false;
        $direction = isset($instance['direction'])?$instance['direction']:'right2left';
        $autosize = isset($instance['autosize'])?$instance['autosize']:false;
        $time = get_time($instance);
        $width = isset($instance['width'])?$instance['width']:self::DEFAULTS['width'];
        $height = isset($instance['height'])?$instance['height']:self::DEFAULTS['height'];
        $banners = isset($instance['banners'])?$instance['banners']:[];
        $banners[] = [
            "link" => "", "img" => "", "alt" => ""
        ];
        //print_r($banners);
        ?>
        <p>
        <label for="<?php echo $this->get_field_id( 'title' ); ?>"><?php _e( 'Title:' ); ?></label>
        <input class="widefat" id="<?php echo $this->get_field_id( 'title' ); ?>" name="<?php echo $this->get_field_name( 'title' ); ?>" type="text" value="<?php echo esc_attr( $title ); ?>" />
        </p>
        <p>
        <label for="<?php echo $this->get_field_id('direction'); ?>"><?php _e('Direction:'); ?></label>
        <select class="widefat" id="<?php echo $this->get_field_id('direction'); ?>" name="<?php echo $this->get_field_name('direction'); ?>">
            <option value="right2left" <?php echo $direction=='right2left'?'selected':''; ?>>Right to left</option>
            <option value="left2right" <?php echo $direction=='left2right'?'selected':''; ?>>Left to right</option>
            <option value="bottom2top" <?php echo $direction=='bottom2top'?'selected':''; ?>>Bottom to top</option>
            <option value="top2bottom" <?php echo $direction=='top2bottom'?'selected':''; ?>>Top to bottom</option>
        </select>
        </p>
        <p>
        <label for="<?php echo $this->get_field_id( 'time' ); ?>"><?php _e( 'Time:' ); ?> (ms)</label>
        <input class="widefat" id="<?php echo $this->get_field_id( 'time' ); ?>" name="<?php echo $this->get_field_name( 'time' ); ?>" type="number" value="<?php echo esc_attr( $time ); ?>" />
        </p>
        <p>
        <input class="widefat" id="<?php echo $this->get_field_id( 'fader' ); ?>" name="<?php echo $this->get_field_name( 'fader' ); ?>" type="checkbox" value="true" <?php echo ($fader==true)?'checked':''; ?> />
        <label for="<?php echo $this->get_field_id( 'fader' ); ?>"><?php _e( 'Fader' ); ?></label>
        </p>
        <p>
        <input class="widefat" id="<?php echo $this->get_field_id( 'shadow' ); ?>" name="<?php echo $this->get_field_name( 'shadow' ); ?>" type="checkbox" value="true" <?php echo ($shadow==true)?'checked':''; ?> />
        <label for="<?php echo $this->get_field_id( 'shadow' ); ?>"><?php _e( 'Shadow' ); ?></label>
        </p>
        <p>
        <input class="widefat" id="<?php echo $this->get_field_id( 'autosize' ); ?>" name="<?php echo $this->get_field_name( 'autosize' ); ?>" type="checkbox" value="true" <?php echo ($autosize==true)?'checked':''; ?> />
        <label for="<?php echo $this->get_field_id( 'autosize' ); ?>"><?php _e( 'Autosize images' ); ?></label>
        </p>
        <p>
        <label for="<?php echo $this->get_field_id( 'width' ); ?>"><?php _e( 'Width:' ); ?></label>
        <input class="widefat" id="<?php echo $this->get_field_id( 'width' ); ?>" name="<?php echo $this->get_field_name( 'width' ); ?>" type="text" value="<?php echo esc_attr( $width ); ?>" />
        <label for="<?php echo $this->get_field_id( 'height' ); ?>"><?php _e( 'Height:' ); ?></label>
        <input class="widefat" id="<?php echo $this->get_field_id( 'height' ); ?>" name="<?php echo $this->get_field_name( 'height' ); ?>" type="text" value="<?php echo esc_attr( $height ); ?>" />
        </p>
        <ul>
        <?php
        foreach ($banners as $key => $banner) {
            ?>
            <li>
            <input type="text" class="widefat" name="<?php echo $this->get_field_name('banners') . '['.$key.']'; ?>[link]" value="<?php echo $banner['link']; ?>" placeholder="Link">
            <input type="text" class="widefat" name="<?php echo $this->get_field_name('banners') . '['.$key.']'; ?>[img]" value="<?php echo $banner['img']; ?>" placeholder="Picture">
            <input type="text" class="widefat" name="<?php echo $this->get_field_name('banners') . '['.$key.']'; ?>[alt]" value="<?php echo $banner['alt']; ?>" placeholder="Text (will be used as alt for an image)">
            </li>
            <?php
        }
        ?>
        </ul>
        <?php
    }
    public function update($new,$old){
        $new['banners'] = array_filter($new['banners'],function($val){
            return $val['link'] !== '' || $val['img'] !== '';
        });
        return $new;
    }
}

function banner_floating_load_widget(){
    register_widget('banner_floating\banner_floating_widget');
}
add_action('widgets_init','banner_floating\banner_floating_load_widget');

function banner_floating_enqueue_style(){
    wp_register_style('banner_floating_widget_style',plugins_url(basename(plugin_dir_path(__FILE__)).'/widget.css'));
    wp_enqueue_style( 'banner_floating_widget_style' );
}
add_action('wp_enqueue_scripts','banner_floating\banner_floating_enqueue_style');

function banner_floating_enqueue_script(){
    wp_enqueue_script('banner_floating_widget_script',plugins_url('/widget.js',__FILE__),['jquery'],$ver='1',$in_footer=true);
}
add_action('wp_enqueue_scripts','banner_floating\banner_floating_enqueue_script');