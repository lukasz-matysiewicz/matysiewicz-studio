<?php
namespace Matysiewicz\Functions;

function custom_404_title($title) {
    if (is_404()) {
        $title['title'] = '404';
    }
    return $title;
}

add_filter('document_title_parts', __NAMESPACE__ . '\\custom_404_title');
add_filter('wpforms_mailcheck_enabled', '__return_false');