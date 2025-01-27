<?php
namespace Matysiewicz\Core;

// Theme setup
function matysiewicz_studio_setup() {
    load_theme_textdomain('matysiewicz-studio', get_template_directory() . '/languages');
    add_theme_support('automatic-feed-links');
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('custom-background', [
        'default-color' => 'ffffff',
        'default-image' => '',
    ]);
    add_theme_support('html5', [
        'search-form', 'comment-form', 'comment-list',
        'gallery', 'caption', 'style', 'script',
    ]);
    add_theme_support('customize-selective-refresh-widgets');
    add_theme_support('custom-logo', [
        'height' => 250,
        'width' => 250,
        'flex-width' => true,
        'flex-height' => true,
    ]);

    register_nav_menus([
        'menu-1' => esc_html__('Primary', 'matysiewicz-studio'),
    ]);
}

// Content width
function content_width() {
    $GLOBALS['content_width'] = 640;
}

// Widget registration
function widgets_init() {
    register_sidebar([
        'name' => 'Sidebar',
        'id' => 'sidebar-1',
        'description' => 'Add widgets here.',
        'before_widget' => '<section id="%1$s" class="widget %2$s">',
        'after_widget' => '</section>',
        'before_title' => '<h2 class="widget-title">',
        'after_title' => '</h2>',
    ]);
}

add_action('after_setup_theme', __NAMESPACE__ . '\\matysiewicz_studio_setup');
add_action('after_setup_theme', __NAMESPACE__ . '\\content_width', 0);
add_action('widgets_init', __NAMESPACE__ . '\\widgets_init');