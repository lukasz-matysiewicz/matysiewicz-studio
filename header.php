<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Matysiewicz_Studio
 */

?>
<!-- -------------------------------------------------------------------------------------- -->
<!-- -------------------------------------------------------------------------------------- -->
<!-- ----------------------- Hi there! What are you looking for? ;) ----------------------- -->
<!-- ----------------------------- lukasz@matysiewicz.studio ------------------------------ -->
<!-- -------------------------------------------------------------------------------------- -->
<!-- -------------------------------------------------------------------------------------- -->
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="https://gmpg.org/xfn/11">
	<meta name="description" content="Lukasz Matysiewicz - Designer, Developer, Digital Artist">
	<link rel="stylesheet" href="https://matysiewicz.studio/wp-content/themes/matysiewicz-studio/fonts.css">
	<!-- <link rel="preconnect" href="https://fonts.gstatic.com/" crossorigin>
	<link href="https://fonts.googleapis.com/css?family=Poppins:300,600,700&display=swap" rel="stylesheet"> -->
	<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js" defer></script> -->
	
	<!-- Google Tag Manager -->
	<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
	new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
	j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
	'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
	})(window,document,'script','dataLayer','GTM-MPKZHB');</script>
	<!-- End Google Tag Manager -->
	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>data-barba="wrapper">

    <div class="loading-container">
        <div class="loading-screen">
            <div class="loading-words">
                <h2></h2>
                <h2>Home</h2>
                <h2 class="active">Home</h2>
                <h2>Home</h2>
                <h2></h2>
            </div>
        </div>
    </div>

<?php wp_body_open(); ?>
<div id="page" class="site" data-barba="container" data-barba-namespace="<?php echo esc_attr(get_barba_namespace()); ?>" data-scroll-container>
	<a class="skip-link screen-reader-text" href="#primary"><?php esc_html_e( 'Skip to content', 'matysiewicz-studio' ); ?></a>

	<header id="masthead" class="site-header">
		<div class="site-branding">
			<?php
			the_custom_logo();
			if ( is_front_page() && is_home() ) :
				?>
				<h1 class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></h1>
				<?php
			else :
				?>
				<p class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></p>
				<?php
			endif;
			$matysiewicz_studio_description = get_bloginfo( 'description', 'display' );
			if ( $matysiewicz_studio_description || is_customize_preview() ) :
				?>
				<p class="site-description"><?php echo $matysiewicz_studio_description; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></p>
			<?php endif; ?>
		</div><!-- .site-branding -->

		<nav id="site-navigation" class="main-navigation">
			<!-- <button class="menu-toggle" aria-controls="primary-menu" aria-expanded="false"><?php esc_html_e( 'Primary Menu', 'matysiewicz-studio' ); ?></button> -->
			<button class="menu-toggle" aria-controls="primary-menu" aria-expanded="false"><input type="checkbox" aria-label="Display the menu" class="menu-burger"></button>
			<!-- role="button" -->

			<?php
			wp_nav_menu(
				array(
					'theme_location' => 'menu-1',
					'menu_id'        => 'primary-menu',
				)
			);
			?>
		</nav><!-- #site-navigation -->
	</header><!-- #masthead -->
