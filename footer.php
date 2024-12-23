<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Matysiewicz_Studio
 */

?>

	<footer id="colophon" class="site-footer">
		<div class="site-info">
			<span class="left"><?php echo date('Y'); ?> © matysiewicz.studio</span>
			<span class="right">
			<div><a href="https://www.linkedin.com/in/matysiewicz" target="_blank" rel="nofollow">Linkedin</a></div>
			<div><a href="https://www.facebook.com/matysiewiczstudio" target="_blank" rel="nofollow">Facebook</a></div>
			<div><a href="https://www.youtube.com/c/lukaszmatysiewicz" target="_blank" rel="nofollow">Youtube</a></div>
			<div><a href="https://www.behance.net/matysiewiczstudio" target="_blank" rel="nofollow">Behance</a></div>
			</span>
		</div><!-- .site-info -->
	</footer><!-- #colophon -->
</div><!-- #page -->

<?php wp_footer(); ?>
<?php include('integrations.html'); ?>
</body>
</html>
