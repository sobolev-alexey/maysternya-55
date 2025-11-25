<?php
/**
 * Search Results Template
 *
 * @package Maysternya
 */

get_header();
?>

<?php maysternya_breadcrumbs(); ?>

<section class="search-results" data-testid="search-results">
    <div class="container">
        <header class="page-header">
            <h1 class="page-title">
                <?php printf(__('Search Results for: %s', 'maysternya'), '<span>' . get_search_query() . '</span>'); ?>
            </h1>
        </header>

        <?php if (have_posts()) : ?>
            <div class="archive-grid">
                <?php while (have_posts()) : the_post(); ?>
                    <article <?php post_class('project-card'); ?>>
                        <a href="<?php the_permalink(); ?>" class="project-link">
                            <div class="project-image">
                                <?php if (has_post_thumbnail()) : ?>
                                    <?php the_post_thumbnail('project-card'); ?>
                                <?php else : ?>
                                    <div class="project-placeholder" style="background: #1a1a1a; aspect-ratio: 16/10;"></div>
                                <?php endif; ?>
                                <div class="project-overlay">
                                    <h3 class="project-title"><?php the_title(); ?></h3>
                                    <span class="project-meta"><?php echo get_post_type_object(get_post_type())->labels->singular_name; ?></span>
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
            <div class="no-results text-center">
                <p><?php _e('No results found. Please try a different search term.', 'maysternya'); ?></p>
                <a href="<?php echo esc_url(home_url('/')); ?>" class="btn btn-secondary">
                    <?php _e('BACK TO HOME', 'maysternya'); ?>
                </a>
            </div>
        <?php endif; ?>
    </div>
</section>

<?php get_footer(); ?>
