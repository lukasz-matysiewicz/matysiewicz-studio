<?php
/**
 * The template for displaying all single posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package Matysiewicz_Studio
 */

 get_header();
 ?>
 
 <main id="primary" class="site-main">
	 <?php while (have_posts()) : the_post(); ?>
		 <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
			 
			 <!-- Title -->
			 <header class="entry-header">
				 <h1 class="entry-title">
					 <?php the_title(); ?>
				 </h1>
				 
				 <!-- Date -->
				 <div class="entry-meta">
					 <?php echo get_the_date('F j, Y'); ?>
				 </div>
			 </header>
 
			 <!-- Breadcrumbs -->
			 <div class="breadcrumbs">
				<?php
				$categories = get_the_category();
				echo '<p>';
				echo '<a href="' . esc_url(home_url()) . '">Home</a>';

				if ($categories) {
					foreach ($categories as $category) {
						$category_link = str_replace('/category/', '/', get_category_link($category->term_id));
						echo ' » <a href="' . esc_url($category_link) . '">';
						echo esc_html($category->name);
						echo '</a>';
					}
				}
				?>
			</div>
			
			 <!-- Featured Image -->
			 <?php if (has_post_thumbnail()) : ?>
				 <div class="post-thumbnail">
					 <?php the_post_thumbnail('large'); ?>
				 </div>
			 <?php endif; ?>
 
			 <!-- Content -->
			 <div class="entry-content">
				 <?php the_content(); ?>
			 </div>
 
			 <!-- Post Navigation -->
			 <div class="post-navigation">
				 <?php
				 $prev_post = get_previous_post();
				 $next_post = get_next_post();
				 
				 if ($prev_post) {
					 echo '<div class="nav-previous">';
					 echo '<span class="nav-subtitle">Previous:</span>';
					 previous_post_link('%link', '%title');
					 echo '</div>';
				 }
				 
				 if ($next_post) {
					 echo '<div class="nav-next">';
					 echo '<span class="nav-subtitle">Next:</span>';
					 next_post_link('%link', '%title');
					 echo '</div>';
				 }
				 ?>
			 </div>
 
			 <!-- Comments -->
			 <?php
			 if (comments_open() || get_comments_number()) :
				 comments_template();
			 endif;
			 ?>
 
		 </article>
	 <?php endwhile; ?>
 </main>
 
 <?php
 get_sidebar();
 get_footer();