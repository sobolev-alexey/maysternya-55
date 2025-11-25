<?php
/**
 * Template Name: Manifesto Page
 * 
 * @package Maysternya
 */

get_header();
?>

<?php maysternya_breadcrumbs(); ?>

<article class="manifesto-page" data-testid="manifesto-page">
    <div class="container">
        <header class="page-header">
            <span class="page-pretitle"><?php _e('MAIN PAGE/MANIFESTO', 'maysternya'); ?></span>
            <h1 class="page-title"><?php _e('OUR MANIFESTO', 'maysternya'); ?></h1>
        </header>

        <div class="manifesto-content">
            <?php
            while (have_posts()) : the_post();
                the_content();
            endwhile;
            ?>
        </div>
    </div>
</article>

<?php get_footer(); ?>
