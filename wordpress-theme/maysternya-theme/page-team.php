<?php
/**
 * Template Name: Team Page
 * 
 * @package Maysternya
 */

get_header();
?>

<?php maysternya_breadcrumbs(); ?>

<section class="team-section" data-testid="team-page">
    <div class="container">
        <header class="page-header">
            <h1 class="page-title"><?php _e('OUR TEAM', 'maysternya'); ?></h1>
        </header>

        <div class="team-grid">
            <?php
            $team = new WP_Query(array(
                'post_type' => 'team_member',
                'posts_per_page' => -1,
                'orderby' => 'menu_order',
                'order' => 'ASC',
            ));

            if ($team->have_posts()) :
                while ($team->have_posts()) : $team->the_post();
                    maysternya_team_member_card();
                endwhile;
                wp_reset_postdata();
            else :
            ?>
                <p class="text-center"><?php _e('No team members found.', 'maysternya'); ?></p>
            <?php endif; ?>
        </div>
    </div>
</section>

<?php get_footer(); ?>
