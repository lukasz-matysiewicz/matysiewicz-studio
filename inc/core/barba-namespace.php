<?php
/**
 * Get the appropriate Barba namespace based on current page context
 *
 * @return string The namespace for Barba.js
 */
function get_barba_namespace() {
    // Check for single posts first (this includes all post types)
    if (is_single()) {
        return 'case-studies';
    }
    // Check for pages
    elseif (is_page()) {
        global $post;
        return $post->post_name;
    }
    // Check for archives
    elseif (is_archive()) {
        if (is_category() || is_tag() || is_tax()) {
            return 'case-studies';
        }
        return 'archive';
    }
    // Other page types
    elseif (is_search()) {
        return 'search';
    }
    elseif (is_404()) {
        return 'error-404';
    }
    elseif (is_front_page()) {
        return 'home';
    }
    elseif (is_cart()) {
        return 'cart';
    }
    
    return 'page'; // Default fallback
}