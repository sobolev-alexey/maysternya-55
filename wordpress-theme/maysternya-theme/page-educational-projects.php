<?php
/**
 * Template Name: Educational Projects Page
 * 
 * @package Maysternya
 */

get_header();
?>

<?php maysternya_breadcrumbs(); ?>

<section class="educational-section" data-testid="educational-page">
    <div class="container">
        <header class="page-header">
            <span class="page-pretitle"><?php _e('MAIN PAGE/EDUCATIONAL PROJECT', 'maysternya'); ?></span>
            <h1 class="page-title"><?php _e('SUMMER THEATRE ACADEMY', 'maysternya'); ?></h1>
            <p class="page-note"><?php _e('[ the educational project is temporarily suspended ]', 'maysternya'); ?></p>
        </header>

        <div class="educational-content">
            <?php
            while (have_posts()) : the_post();
                the_content();
            endwhile;
            ?>
        </div>
        
        <div class="educational-description">
            <h2><?php _e('SUMMER THEATRE ACADEMY', 'maysternya'); ?></h2>
            <p>
                <?php _e('The "Summer theatre academy" brought together young artists from Ukraine and the Polish theatre "Brama" for six unforgettable weeks of intensive training and creative exploration.', 'maysternya'); ?>
            </p>
        </div>
    </div>
</section>

<?php get_footer(); ?>
