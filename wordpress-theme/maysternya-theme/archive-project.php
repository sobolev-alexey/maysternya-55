<?php
/**
 * Archive template for Projects
 *
 * @package Maysternya
 */

get_header();
?>

<?php maysternya_breadcrumbs(); ?>

<section class="projects-section archive-projects" data-testid="projects-archive">
    <div class="container">
        <header class="archive-header">
            <h1 class="page-title"><?php _e('PROJECTS', 'maysternya'); ?></h1>
            <p class="page-subtitle"><?php _e('MAYSTERNYA', 'maysternya'); ?></p>
            
            <?php
            $project_types = get_terms(array(
                'taxonomy' => 'project_type',
                'hide_empty' => true,
            ));
            
            if (!empty($project_types) && !is_wp_error($project_types)) :
            ?>
            <div class="archive-filters">
                <a href="<?php echo esc_url(get_post_type_archive_link('project')); ?>" class="filter-btn <?php echo !is_tax() ? 'active' : ''; ?>">
                    <?php _e('All', 'maysternya'); ?>
                </a>
                <?php foreach ($project_types as $type) : ?>
                <a href="<?php echo esc_url(get_term_link($type)); ?>" class="filter-btn <?php echo is_tax('project_type', $type->slug) ? 'active' : ''; ?>">
                    <?php echo esc_html($type->name); ?>
                </a>
                <?php endforeach; ?>
            </div>
            <?php endif; ?>
        </header>

        <?php if (have_posts()) : ?>
            <div class="archive-grid">
                <?php while (have_posts()) : the_post(); ?>
                    <?php maysternya_project_card(); ?>
                <?php endwhile; ?>
            </div>

            <?php the_posts_pagination(array(
                'prev_text' => '&laquo;',
                'next_text' => '&raquo;',
                'class' => 'pagination',
            )); ?>

        <?php else : ?>
            <p class="text-center"><?php _e('No projects found.', 'maysternya'); ?></p>
        <?php endif; ?>
    </div>
</section>

<?php get_footer(); ?>
