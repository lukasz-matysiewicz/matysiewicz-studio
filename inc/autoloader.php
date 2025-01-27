<?php
namespace Matysiewicz;

spl_autoload_register(function ($class) {
    $prefix = 'Matysiewicz\\';
    $base_dir = get_template_directory() . '/inc/';
    
    $len = strlen($prefix);
    if (strncmp($prefix, $class, $len) !== 0) {
        return;
    }

    $relative_class = substr($class, $len);
    $file = $base_dir . str_replace('\\', '/', $relative_class) . '.php';

    if (file_exists($file)) {
        require $file;
    }
});

// Register autoloader
require_once get_template_directory() . '/inc/core/init.php';
require_once get_template_directory() . '/inc/core/scripts.php';
require_once get_template_directory() . '/inc/functions/comments.php';
require_once get_template_directory() . '/inc/functions/login.php';
require_once get_template_directory() . '/inc/functions/cleanup.php';