<?php
/**
 * Template Name: History Page
 * 
 * @package Maysternya
 */

get_header();
?>

<?php maysternya_breadcrumbs(); ?>

<article class="history-page" data-testid="history-page">
    <div class="container">
        <header class="page-header">
            <span class="page-pretitle"><?php _e('MAIN PAGE/HISTORY', 'maysternya'); ?></span>
            <h1 class="page-title"><?php _e('OUR HISTORY', 'maysternya'); ?></h1>
        </header>

        <div class="page-content timeline">
            <?php
            while (have_posts()) : the_post();
                the_content();
            endwhile;
            ?>
        </div>
    </div>
</article>

<?php get_footer(); ?>
