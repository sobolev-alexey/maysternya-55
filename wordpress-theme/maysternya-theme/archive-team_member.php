<?php
/**
 * Archive template for Team Members
 *
 * @package Maysternya
 */

get_header();
?>

<?php maysternya_breadcrumbs(); ?>

<section class="team-section archive-team" data-testid="team-archive">
    <div class="container">
        <header class="archive-header">
            <h1 class="page-title"><?php _e('OUR TEAM', 'maysternya'); ?></h1>
            <p class="page-subtitle"><?php _e('The people behind Maysternya 55', 'maysternya'); ?></p>
        </header>

        <?php if (have_posts()) : ?>
            <div class="team-grid">
                <?php while (have_posts()) : the_post(); ?>
                    <?php maysternya_team_member_card(); ?>
                <?php endwhile; ?>
            </div>

            <?php the_posts_pagination(array(
                'prev_text' => '&laquo;',
                'next_text' => '&raquo;',
                'class' => 'pagination',
            )); ?>

        <?php else : ?>
            <p class="text-center"><?php _e('No team members found.', 'maysternya'); ?></p>
        <?php endif; ?>
    </div>
</section>

<?php get_footer(); ?>
