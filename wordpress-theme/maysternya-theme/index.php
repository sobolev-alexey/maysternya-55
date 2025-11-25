<?php
/**
 * The main template file
 *
 * @package Maysternya
 */

get_header();
?>

<?php if (is_front_page()) : ?>

    <!-- Hero Section -->
    <section class="hero-section" data-testid="hero-section">
        <?php 
        $hero_bg = get_theme_mod('hero_background', '');
        if ($hero_bg) : 
        ?>
        <div class="hero-background">
            <img src="<?php echo esc_url($hero_bg); ?>" alt="">
            <div class="hero-overlay"></div>
        </div>
        <?php endif; ?>
        
        <div class="hero-content">
            <h1 class="hero-title" data-testid="hero-title">
                <?php echo esc_html(get_theme_mod('hero_title', 'IN THEATRE WE TRUST')); ?>
            </h1>
            <a href="<?php echo esc_url(get_theme_mod('hero_button_link', get_post_type_archive_link('performance'))); ?>" class="btn btn-primary" data-testid="hero-cta">
                <?php echo esc_html(get_theme_mod('hero_button_text', 'GO TO PERFORMANCES')); ?>
            </a>
        </div>
    </section>

    <!-- Projects Section -->
    <section class="projects-section" data-testid="projects-section">
        <div class="container">
            <header class="section-header">
                <h2 class="section-title"><?php _e('PROJECTS', 'maysternya'); ?></h2>
                <p class="section-subtitle"><?php _e('MAYSTERNYA', 'maysternya'); ?></p>
            </header>

            <div class="projects-grid">
                <?php
                $projects = new WP_Query(array(
                    'post_type' => 'project',
                    'posts_per_page' => 4,
                    'orderby' => 'date',
                    'order' => 'DESC',
                ));

                if ($projects->have_posts()) :
                    while ($projects->have_posts()) : $projects->the_post();
                        maysternya_project_card();
                    endwhile;
                    wp_reset_postdata();
                else :
                    // Placeholder projects if none exist
                    for ($i = 0; $i < 2; $i++) :
                ?>
                    <article class="project-card" data-testid="project-card-placeholder">
                        <div class="project-image">
                            <div class="project-placeholder" style="background: linear-gradient(135deg, #1a1a1a 0%, #333 100%); aspect-ratio: 16/10;"></div>
                            <div class="project-overlay">
                                <h3 class="project-title"><?php _e('MAYSTERNYA 55', 'maysternya'); ?></h3>
                                <span class="project-meta"><?php _e('Theatre Production', 'maysternya'); ?></span>
                            </div>
                        </div>
                    </article>
                <?php
                    endfor;
                endif;
                ?>
            </div>
        </div>
    </section>

    <!-- Upcoming Performances Section -->
    <section class="performances-section" data-testid="performances-section">
        <div class="container">
            <header class="section-header">
                <h2 class="section-title"><?php _e('ON STAGE', 'maysternya'); ?></h2>
            </header>

            <div class="performances-list">
                <?php
                $performances = new WP_Query(array(
                    'post_type' => 'performance',
                    'posts_per_page' => 3,
                    'meta_key' => '_performance_date',
                    'orderby' => 'meta_value',
                    'order' => 'ASC',
                    'meta_query' => array(
                        array(
                            'key' => '_performance_date',
                            'value' => date('Y-m-d'),
                            'compare' => '>=',
                            'type' => 'DATE',
                        ),
                    ),
                ));

                if ($performances->have_posts()) :
                    while ($performances->have_posts()) : $performances->the_post();
                        maysternya_performance_card();
                    endwhile;
                    wp_reset_postdata();
                else :
                    // Placeholder performance if none exist
                ?>
                    <article class="performance-card" data-testid="performance-card-placeholder">
                        <div class="performance-date">
                            <span class="performance-day">11</span>
                            <span class="performance-month">MAR</span>
                            <span class="performance-time">2:30pm</span>
                        </div>
                        <div class="performance-info">
                            <span class="performance-author">A.P. Chekhov</span>
                            <h3 class="performance-title">SISTERS</h3>
                        </div>
                        <div class="performance-image" style="background: #1a1a1a; width: 200px; aspect-ratio: 1;"></div>
                    </article>
                <?php endif; ?>
            </div>

            <div class="text-center mt-xl">
                <a href="<?php echo esc_url(get_post_type_archive_link('performance')); ?>" class="btn btn-secondary">
                    <?php _e('VIEW ALL PERFORMANCES', 'maysternya'); ?>
                </a>
            </div>
        </div>
    </section>

<?php else : ?>

    <!-- Default Archive/Blog View -->
    <div class="container">
        <?php maysternya_breadcrumbs(); ?>
        
        <div class="page-header">
            <?php if (is_archive()) : ?>
                <h1 class="page-title"><?php the_archive_title(); ?></h1>
            <?php elseif (is_search()) : ?>
                <h1 class="page-title"><?php printf(__('Search Results for: %s', 'maysternya'), get_search_query()); ?></h1>
            <?php else : ?>
                <h1 class="page-title"><?php _e('Latest Posts', 'maysternya'); ?></h1>
            <?php endif; ?>
        </div>

        <?php if (have_posts()) : ?>
            <div class="archive-grid">
                <?php while (have_posts()) : the_post(); ?>
                    <article <?php post_class('project-card'); ?> data-testid="archive-item">
                        <a href="<?php the_permalink(); ?>" class="project-link">
                            <div class="project-image">
                                <?php if (has_post_thumbnail()) : ?>
                                    <?php the_post_thumbnail('project-card'); ?>
                                <?php else : ?>
                                    <div class="project-placeholder" style="background: #1a1a1a; aspect-ratio: 16/10;"></div>
                                <?php endif; ?>
                                <div class="project-overlay">
                                    <h3 class="project-title"><?php the_title(); ?></h3>
                                    <span class="project-meta"><?php echo get_the_date(); ?></span>
                                </div>
                            </div>
                        </a>
                    </article>
                <?php endwhile; ?>
            </div>

            <?php the_posts_pagination(array(
                'prev_text' => '&laquo;',
                'next_text' => '&raquo;',
                'class' => 'pagination',
            )); ?>

        <?php else : ?>
            <p class="text-center"><?php _e('No posts found.', 'maysternya'); ?></p>
        <?php endif; ?>
    </div>

<?php endif; ?>

<?php get_footer(); ?>
