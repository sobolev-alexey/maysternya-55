<?php
/**
 * Single Page Template
 *
 * @package Maysternya
 */

get_header();
?>

<?php maysternya_breadcrumbs(); ?>

<article <?php post_class(); ?> data-testid="page-content">
    <div class="container">
        <header class="page-header">
            <h1 class="page-title"><?php the_title(); ?></h1>
        </header>

        <div class="page-content">
            <?php
            while (have_posts()) : the_post();
                the_content();
            endwhile;
            ?>
        </div>
    </div>
</article>

<?php get_footer(); ?>
