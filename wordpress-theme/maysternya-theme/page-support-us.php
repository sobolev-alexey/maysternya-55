<?php
/**
 * Template Name: Support Us Page
 * Content should be built using Gutenberg blocks
 * 
 * @package Maysternya
 */

get_header();
?>

<main id="main-content" class="site-main page-support-us">
    <?php
    if (have_posts()) :
        while (have_posts()) :
            the_post();
            the_content();
        endwhile;
    endif;
    ?>
</main>

<?php get_footer(); ?>
