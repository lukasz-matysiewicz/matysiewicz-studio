<?php
/**
 * Matysiewicz Studio functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package Matysiewicz_Studio
 */


 if (!defined('_S_VERSION')) {
	 define('_S_VERSION', '1.0.5');
 }
 
 // Autoload core files
 $core_includes = [
	 '/inc/core/init.php',
	 '/inc/core/scripts.php',
	 '/inc/functions/comments.php',
	 '/inc/functions/login.php',
	 '/inc/functions/cleanup.php',
	 '/inc/custom-header.php',
	 '/inc/template-tags.php',
	 '/inc/template-functions.php',
	 '/inc/customizer.php',
	 '/inc/core/barba-namespace.php'
 ];
 
 foreach ($core_includes as $file) {
	 require_once get_template_directory() . $file;
 }
 
 // Load Jetpack compatibility file
 if (defined('JETPACK__VERSION')) {
	 require get_template_directory() . '/inc/jetpack.php';
 }