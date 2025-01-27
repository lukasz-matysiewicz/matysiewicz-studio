<?php
namespace Matysiewicz\Core;

function enqueue_styles() {
    wp_enqueue_style('main-style', get_stylesheet_uri(), [], _S_VERSION);
    wp_enqueue_style('fonts-style', get_template_directory_uri() . '/fonts.css');
    wp_enqueue_style('locomotive-scroll-css', get_template_directory_uri() . '/locomotive-scroll.css');
}

function enqueue_scripts() {
    wp_enqueue_script('navigation', get_template_directory_uri() . '/js/navigation.js', [], _S_VERSION, true);
    wp_enqueue_script('locomotive-scroll', 'https://cdn.jsdelivr.net/npm/locomotive-scroll@beta/bundled/locomotive-scroll.min.js', [], null, true);
    wp_enqueue_script('barba-js', 'https://unpkg.com/@barba/core', [], false, true);
    wp_enqueue_script('gsap-js', 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.3/gsap.min.js', [], false, true);
    wp_enqueue_script('gsap-st', 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.3/ScrollTrigger.min.js', ['gsap-js'], false, true);
    wp_enqueue_script('theme-gsap-custom', get_template_directory_uri() . '/js/custom.js', ['gsap-js'], '1.0.0', true);
    
    
    if (is_single()) {
        wp_enqueue_script('single-post', get_template_directory_uri() . '/js/single.js', ['jquery'], '1.0', true);
    }
}

add_action('wp_enqueue_scripts', __NAMESPACE__ . '\\enqueue_styles');
add_action('wp_enqueue_scripts', __NAMESPACE__ . '\\enqueue_scripts');