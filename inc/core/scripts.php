<?php
namespace Matysiewicz\Core;

function enqueue_styles() {
   wp_enqueue_style('main-style', get_stylesheet_uri(), [], _S_VERSION);
   wp_enqueue_style('fonts-style', get_template_directory_uri() . '/fonts.css', [], _S_VERSION);
   wp_enqueue_style('locomotive-scroll-css', get_template_directory_uri() . '/locomotive-scroll.css', [], _S_VERSION);
}

function enqueue_scripts() {
   // Local scripts
   wp_enqueue_script('navigation', get_template_directory_uri() . '/js/navigation.js', [], _S_VERSION, true);
   
   // Replace CDN scripts with local versions
   wp_enqueue_script('locomotive-scroll', get_template_directory_uri() . '/js/fallback/locomotive-scroll.min.js', [], _S_VERSION, true);
   wp_enqueue_script('barba-js', get_template_directory_uri() . '/js/fallback/barba.min.js', [], _S_VERSION, true);
   wp_enqueue_script('gsap-js', get_template_directory_uri() . '/js/fallback/gsap.min.js', [], _S_VERSION, true);
   wp_enqueue_script('gsap-st', get_template_directory_uri() . '/js/fallback/ScrollTrigger.min.js', ['gsap-js'], _S_VERSION, true);
   
   // Custom scripts remain the same
   wp_enqueue_script('theme-gsap-custom', get_template_directory_uri() . '/js/custom.js', ['gsap-js'], _S_VERSION, true);
   
   // Conditional scripts
   if (is_page(array(807, 830, 963, 980))) {
      wp_enqueue_script('freemius-checkout', 'https://checkout.freemius.com/js/v1/', array(), null, true);
   }
   if (is_page([830, 807, 963, 980])) {
      wp_enqueue_script('pricing-table-js', get_template_directory_uri() . '/js/pricing-table.js', [], _S_VERSION, true);
   }
   if (is_single()) {
       wp_enqueue_script('single-post', get_template_directory_uri() . '/js/single.js', ['jquery'], _S_VERSION, true);
   }
}

add_action('wp_enqueue_scripts', __NAMESPACE__ . '\\enqueue_styles');
add_action('wp_enqueue_scripts', __NAMESPACE__ . '\\enqueue_scripts');