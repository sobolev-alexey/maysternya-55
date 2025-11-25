<?php
/**
 * Archive template for Performances
 *
 * @package Maysternya
 */

get_header();
?>

<?php maysternya_breadcrumbs(); ?>

<section class="performances-section archive-performances" data-testid="performances-archive">
    <div class="container">
        <header class="archive-header">
            <h1 class="page-title"><?php _e('ON STAGE', 'maysternya'); ?></h1>
            <p class="page-subtitle"><?php _e('Upcoming performances and shows', 'maysternya'); ?></p>
        </header>

        <?php if (have_posts()) : ?>
            <div class="performances-list">
                <?php while (have_posts()) : the_post(); ?>
                    <?php maysternya_performance_card(); ?>
                <?php endwhile; ?>
            </div>

            <?php the_posts_pagination(array(
                'prev_text' => '&laquo;',
                'next_text' => '&raquo;',
                'class' => 'pagination',
            )); ?>

        <?php else : ?>
            <p class="text-center"><?php _e('No performances scheduled at this time. Please check back later.', 'maysternya'); ?></p>
        <?php endif; ?>
    </div>
</section>

<?php get_footer(); ?>
