<?php
/**
 * Single Project Template
 *
 * @package Maysternya
 */

get_header();
?>

<?php maysternya_breadcrumbs(); ?>

<?php while (have_posts()) : the_post(); ?>

<article <?php post_class('single-project'); ?> data-testid="single-project">
    
    <?php if (has_post_thumbnail()) : ?>
    <div class="project-hero">
        <div class="hero-background">
            <?php the_post_thumbnail('hero-image'); ?>
            <div class="hero-overlay"></div>
        </div>
        <div class="container">
            <h1 class="project-title"><?php the_title(); ?></h1>
        </div>
    </div>
    <?php else : ?>
    <div class="container">
        <header class="page-header">
            <h1 class="page-title"><?php the_title(); ?></h1>
        </header>
    </div>
    <?php endif; ?>

    <div class="container">
        <div class="project-content">
            <?php the_content(); ?>
        </div>
        
        <?php
        // Project gallery if using ACF or similar
        $gallery = get_post_meta(get_the_ID(), '_project_gallery', true);
        if ($gallery && is_array($gallery)) :
        ?>
        <section class="gallery-section">
            <h2><?php _e('Gallery', 'maysternya'); ?></h2>
            <div class="gallery-carousel">
                <div class="gallery-track">
                    <?php foreach ($gallery as $image_id) : ?>
                    <div class="gallery-item">
                        <div class="gallery-image">
                            <?php echo wp_get_attachment_image($image_id, 'gallery-image'); ?>
                        </div>
                    </div>
                    <?php endforeach; ?>
                </div>
                <div class="gallery-nav">
                    <button class="gallery-nav-btn gallery-prev" aria-label="<?php esc_attr_e('Previous', 'maysternya'); ?>">&larr;</button>
                    <button class="gallery-nav-btn gallery-next" aria-label="<?php esc_attr_e('Next', 'maysternya'); ?>">&rarr;</button>
                </div>
            </div>
        </section>
        <?php endif; ?>
    </div>
</article>

<?php endwhile; ?>

<?php get_footer(); ?>
