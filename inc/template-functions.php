<?php
/**
 * Functions which enhance the theme by hooking into WordPress
 *
 * @package Matysiewicz_Studio
 */

/**
 * Adds custom classes to the array of body classes.
 *
 * @param array $classes Classes for the body element.
 * @return array
 */
function matysiewicz_studio_body_classes( $classes ) {
	// Adds a class of hfeed to non-singular pages.
	if ( ! is_singular() ) {
		$classes[] = 'hfeed';
	}

	// Adds a class of no-sidebar when there is no sidebar present.
	if ( ! is_active_sidebar( 'sidebar-1' ) ) {
		$classes[] = 'no-sidebar';
	}

	return $classes;
}
add_filter( 'body_class', 'matysiewicz_studio_body_classes' );

/**
 * Add a pingback url auto-discovery header for single posts, pages, or attachments.
 */
function matysiewicz_studio_pingback_header() {
	if ( is_singular() && pings_open() ) {
		printf( '<link rel="pingback" href="%s">', esc_url( get_bloginfo( 'pingback_url' ) ) );
	}
}
add_action( 'wp_head', 'matysiewicz_studio_pingback_header' );


/**
 * CC with new order to client
 */

 add_filter('woocommerce_email_headers', 'add_customer_cc_to_new_order_email', 10, 3);

function add_customer_cc_to_new_order_email($headers, $email_id, $order) {
    // Only modify new order notification emails
    if ($email_id == 'new_order') {
        $customer_email = $order->get_billing_email();
        $headers .= 'Cc: ' . $customer_email . "\r\n";
    }
    return $headers;
}