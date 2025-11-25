<?php
/**
 * Template Name: Founder Page
 * 
 * @package Maysternya
 */

get_header();
?>

<?php maysternya_breadcrumbs(); ?>

<article class="about-page" data-testid="founder-page">
    <div class="container">
        <div class="about-grid">
            <div class="about-image">
                <?php if (has_post_thumbnail()) : ?>
                    <?php the_post_thumbnail('large'); ?>
                <?php endif; ?>
            </div>
            <div class="about-content">
                <span class="about-pretitle"><?php _e('MAIN PAGE/FOUNDER', 'maysternya'); ?></span>
                <h1 class="about-title">
                    <?php _e('MEET THE', 'maysternya'); ?>
                    <span><?php _e('FOUNDER', 'maysternya'); ?></span>
                </h1>
                <div class="about-description">
                    <?php the_content(); ?>
                </div>
            </div>
        </div>
    </div>
</article>

<?php get_footer(); ?>
