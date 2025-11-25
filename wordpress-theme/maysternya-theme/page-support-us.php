<?php
/**
 * Template Name: Support Us Page
 * 
 * @package Maysternya
 */

get_header();
?>

<?php maysternya_breadcrumbs(); ?>

<section class="support-section" data-testid="support-page">
    <div class="container">
        <div class="support-content">
            <h1 class="support-title"><?php _e('HELP US GROW!', 'maysternya'); ?></h1>
            <p class="support-description">
                <?php _e("We're growing — and with your help, we can bring even more powerful stories to the stage.", 'maysternya'); ?>
            </p>
            
            <div class="support-buttons">
                <a href="#donate" class="btn btn-primary" data-testid="donate-button">
                    <?php _e('DONATE NOW', 'maysternya'); ?>
                </a>
            </div>
            
            <p class="support-note">
                <?php _e('Every gift makes a difference!', 'maysternya'); ?>
            </p>
            
            <div class="support-page-content">
                <?php
                while (have_posts()) : the_post();
                    the_content();
                endwhile;
                ?>
            </div>
        </div>
    </div>
</section>

<?php get_footer(); ?>
