<?php
namespace Matysiewicz\Functions;

function customize_comment_form($defaults) {
    $defaults['title_reply'] = 'Leave a Comment';
    $defaults['label_submit'] = 'Post Comment';
    $defaults['comment_notes_before'] = '<p>Required fields are marked *</p>';
    $defaults['comment_field'] = '<p class="comment-form-comment"><label for="comment">Comment *</label><textarea id="comment" name="comment" required></textarea></p>';
    return $defaults;
}

function customize_comment_fields($fields) {
    $fields['author'] = '<p class="comment-form-author"><label for="author">Your Name *</label><input type="text" id="author" name="author" required></p>';
    $fields['email'] = '<p class="comment-form-email"><label for="email">Email *</label><input type="email" id="email" name="email" required></p>';
    unset($fields['url']);
    return $fields;
}

function add_error_div() {
    echo '<div id="comment-error" style="color: red; margin: 10px 0;"></div>';
}

add_filter('comment_form_defaults', __NAMESPACE__ . '\\customize_comment_form');
add_filter('comment_form_default_fields', __NAMESPACE__ . '\\customize_comment_fields');
add_action('comment_form_before', __NAMESPACE__ . '\\add_error_div');