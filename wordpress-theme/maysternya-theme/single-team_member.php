<?php
/**
 * Single Team Member Template
 *
 * @package Maysternya
 */

get_header();
?>

<?php maysternya_breadcrumbs(); ?>

<?php while (have_posts()) : the_post(); ?>

<article <?php post_class('single-team-member'); ?> data-testid="single-team-member">
    <div class="container">
        <div class="about-grid">
            <div class="about-image">
                <?php if (has_post_thumbnail()) : ?>
                    <?php the_post_thumbnail('large'); ?>
                <?php endif; ?>
            </div>
            <div class="about-content">
                <span class="about-pretitle">
                    <?php 
                    $role = get_post_meta(get_the_ID(), '_team_role', true);
                    echo esc_html($role ? $role : __('Team Member', 'maysternya'));
                    ?>
                </span>
                <h1 class="about-title"><?php the_title(); ?></h1>
                <div class="about-description">
                    <?php the_content(); ?>
                </div>
                <a href="<?php echo esc_url(get_post_type_archive_link('team_member')); ?>" class="btn btn-secondary">
                    <?php _e('BACK TO TEAM', 'maysternya'); ?>
                </a>
            </div>
        </div>
    </div>
</article>

<?php endwhile; ?>

<?php get_footer(); ?>
