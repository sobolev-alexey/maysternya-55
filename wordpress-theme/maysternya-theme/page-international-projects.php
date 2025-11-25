<?php
/**
 * Template Name: International Projects Page
 * 
 * @package Maysternya
 */

get_header();
?>

<?php maysternya_breadcrumbs(); ?>

<section class="international-section" data-testid="international-page">
    <div class="container">
        <header class="page-header">
            <span class="page-pretitle"><?php _e('MAIN PAGE/INTERNATIONAL PROJECTS', 'maysternya'); ?></span>
            <h1 class="page-title"><?php _e('INTERNATIONAL PROJECTS', 'maysternya'); ?></h1>
        </header>

        <div class="page-content">
            <?php
            while (have_posts()) : the_post();
                the_content();
            endwhile;
            ?>
        </div>
        
        <?php
        // Query international projects if using project_type taxonomy
        $international_projects = new WP_Query(array(
            'post_type' => 'project',
            'posts_per_page' => -1,
            'tax_query' => array(
                array(
                    'taxonomy' => 'project_type',
                    'field' => 'slug',
                    'terms' => 'international',
                ),
            ),
        ));

        if ($international_projects->have_posts()) :
        ?>
        <div class="projects-grid">
            <?php while ($international_projects->have_posts()) : $international_projects->the_post(); ?>
                <?php maysternya_project_card(); ?>
            <?php endwhile; ?>
        </div>
        <?php 
        wp_reset_postdata();
        endif; 
        ?>
    </div>
</section>

<?php get_footer(); ?>
