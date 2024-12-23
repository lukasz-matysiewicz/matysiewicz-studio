<?php
/**
 * Matysiewicz Studio functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package Matysiewicz_Studio
 */

if ( ! defined( '_S_VERSION' ) ) {
	// Replace the version number of the theme on each release.
	define( '_S_VERSION', '1.0.0' );
}

/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 */
function matysiewicz_studio_setup() {
	/*
		* Make theme available for translation.
		* Translations can be filed in the /languages/ directory.
		* If you're building a theme based on Matysiewicz Studio, use a find and replace
		* to change 'matysiewicz-studio' to the name of your theme in all the template files.
		*/
	load_theme_textdomain( 'matysiewicz-studio', get_template_directory() . '/languages' );

	// Add default posts and comments RSS feed links to head.
	add_theme_support( 'automatic-feed-links' );

	/*
		* Let WordPress manage the document title.
		* By adding theme support, we declare that this theme does not use a
		* hard-coded <title> tag in the document head, and expect WordPress to
		* provide it for us.
		*/
	add_theme_support( 'title-tag' );

	/*
		* Enable support for Post Thumbnails on posts and pages.
		*
		* @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		*/
	add_theme_support( 'post-thumbnails' );

	// This theme uses wp_nav_menu() in one location.
	register_nav_menus(
		array(
			'menu-1' => esc_html__( 'Primary', 'matysiewicz-studio' ),
		)
	);

	/*
		* Switch default core markup for search form, comment form, and comments
		* to output valid HTML5.
		*/
	add_theme_support(
		'html5',
		array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
			'style',
			'script',
		)
	);

	// Set up the WordPress core custom background feature.
	add_theme_support(
		'custom-background',
		apply_filters(
			'matysiewicz_studio_custom_background_args',
			array(
				'default-color' => 'ffffff',
				'default-image' => '',
			)
		)
	);

	// Add theme support for selective refresh for widgets.
	add_theme_support( 'customize-selective-refresh-widgets' );

	/**
	 * Add support for core custom logo.
	 *
	 * @link https://codex.wordpress.org/Theme_Logo
	 */
	add_theme_support(
		'custom-logo',
		array(
			'height'      => 250,
			'width'       => 250,
			'flex-width'  => true,
			'flex-height' => true,
		)
	);
}
add_action( 'after_setup_theme', 'matysiewicz_studio_setup' );

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function matysiewicz_studio_content_width() {
	$GLOBALS['content_width'] = apply_filters( 'matysiewicz_studio_content_width', 640 );
}
add_action( 'after_setup_theme', 'matysiewicz_studio_content_width', 0 );

/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function matysiewicz_studio_widgets_init() {
	register_sidebar(
		array(
			'name'          => esc_html__( 'Sidebar', 'matysiewicz-studio' ),
			'id'            => 'sidebar-1',
			'description'   => esc_html__( 'Add widgets here.', 'matysiewicz-studio' ),
			'before_widget' => '<section id="%1$s" class="widget %2$s">',
			'after_widget'  => '</section>',
			'before_title'  => '<h2 class="widget-title">',
			'after_title'   => '</h2>',
		)
	);
}
add_action( 'widgets_init', 'matysiewicz_studio_widgets_init' );

/**
 * Enqueue scripts and styles.
 */
function matysiewicz_studio_scripts() {
	wp_enqueue_style( 'matysiewicz-studio-style', get_stylesheet_uri(), array(), _S_VERSION );
	wp_style_add_data( 'matysiewicz-studio-style', 'rtl', 'replace' );

	wp_enqueue_script( 'matysiewicz-studio-navigation', get_template_directory_uri() . '/js/navigation.js', array(), _S_VERSION, true );

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', 'matysiewicz_studio_scripts' );

/**
 * Implement the Custom Header feature.
 */
require get_template_directory() . '/inc/custom-header.php';

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Functions which enhance the theme by hooking into WordPress.
 */
require get_template_directory() . '/inc/template-functions.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';

/**
 * Load Jetpack compatibility file.
 */
if ( defined( 'JETPACK__VERSION' ) ) {
	require get_template_directory() . '/inc/jetpack.php';
}

function my_theme_enqueue_styles() {
    // Enqueue style.css
    wp_enqueue_style('main-style', get_template_directory_uri() . '/style.css');
    
    // Enqueue fonts.css
    wp_enqueue_style('fonts-style', get_template_directory_uri() . '/fonts.css');
}
add_action('wp_enqueue_scripts', 'my_theme_enqueue_styles');

function theme_gsap_barba_loco_script(){

	// Enqueue Locomotive Scroll CSS
	wp_enqueue_style('locomotive-scroll-css', get_template_directory_uri() . '/locomotive-scroll.css', array(), null);

	// Enqueue Locomotive Scroll Script
	wp_enqueue_script('locomotive-scroll', 'https://cdn.jsdelivr.net/npm/locomotive-scroll@beta/bundled/locomotive-scroll.min.js', array(), null, true);
	
    //Add inline script to initialize Locomotive Scroll
    // wp_add_inline_script('locomotive-scroll', '
    //     (function () {
    //         const locomotiveScroll = new LocomotiveScroll();
    //     })();
    // ');

	// Enqueue Barba.js
	wp_enqueue_script( 'barba-js', 'https://unpkg.com/@barba/core', array(), false, true );

    // The core GSAP library
    wp_enqueue_script( 'gsap-js', 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.3/gsap.min.js', array(), false, true );

    // ScrollTrigger - with gsap.js passed as a dependency
    wp_enqueue_script( 'gsap-st', 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.3/ScrollTrigger.min.js', array('gsap-js'), false, true );

    // TextPlugin - with gsap.js passed as a dependency
    // wp_enqueue_script( 'gsap-tp', 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.4/TextPlugin.min.js', array('gsap-js'), false, true );

    // Your custom GSAP animation code file - with gsap.js passed as a dependency
    wp_enqueue_script( 'theme-gsap-custom', get_template_directory_uri() . '/js/custom.js', array('gsap-js'), '1.0.0', true );
}

add_action('wp_enqueue_scripts', 'theme_gsap_barba_loco_script');

/**
 * Change Logo
 */
function custom_login_logo() {
    echo '<style type="text/css">
        #login h1 a { 
            background-image: url("https://matysiewicz.studio/wp-content/uploads/2023/11/Logo_v.webp") !important; 
            background-size: contain !important; 
            width: 100% !important; 
            height: 60px !important; 
        }
        </style>';
}
add_action('login_head', 'custom_login_logo');

/**
 * wpforms notification
 */
add_filter( 'wpforms_mailcheck_enabled', '__return_false' );

/**
 * 404 tab name
 */
function custom_404_document_title( $title ) {
    if ( is_404() ) {
        $title['title'] = '404';
    }
    return $title;
}
add_filter( 'document_title_parts', 'custom_404_document_title' );






