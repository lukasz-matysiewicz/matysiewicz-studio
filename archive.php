<?php get_header(); ?>

<main id="primary" class="site-main archive-posts">
    <?php if (have_posts()) : ?>
        <header class="page-header">
            <h1 class="archive-title"><span><?php single_cat_title(); ?></span></h1>
        </header>

        <div class="posts-grid">
            <?php while (have_posts()) : the_post(); ?>
                <article id="post-<?php the_ID(); ?>" <?php post_class('post-item'); ?>>
                    <div class="post-content">
                        <h2 class="post-title">
                            <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                        </h2>
                        
                        <div class="post-meta">
                            <time datetime="<?php echo get_the_date('c'); ?>">
                                <?php echo get_the_date(); ?>
                            </time>
                        </div>

                        <div class="post-excerpt">
                            <?php the_excerpt(); ?>
                        </div>

                        <a href="<?php the_permalink(); ?>" class="read-more">
                            Read More
                        </a>
                    </div>

                    <div class="post-thumbnail">
                        <?php if (has_post_thumbnail()) : ?>
                            <?php the_post_thumbnail('large'); ?>
                        <?php endif; ?>
                    </div>
                </article>
            <?php endwhile; ?>
        </div>

        <?php the_posts_navigation(); ?>

    <?php endif; ?>
    <div class="cursor-follower"></div>
</main>

<?php get_footer(); ?>