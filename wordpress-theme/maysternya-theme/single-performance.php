<?php
/**
 * Single Performance Template
 *
 * @package Maysternya
 */

get_header();
?>

<?php maysternya_breadcrumbs(); ?>

<?php while (have_posts()) : the_post(); ?>

<article <?php post_class('single-performance'); ?> data-testid="single-performance">
    
    <?php if (has_post_thumbnail()) : ?>
    <div class="performance-hero">
        <div class="hero-background">
            <?php the_post_thumbnail('hero-image'); ?>
            <div class="hero-overlay"></div>
        </div>
        <div class="container">
            <div class="performance-hero-content">
                <?php 
                $author = get_post_meta(get_the_ID(), '_performance_author', true);
                if ($author) : 
                ?>
                <span class="performance-author"><?php echo esc_html($author); ?></span>
                <?php endif; ?>
                <h1 class="performance-title"><?php the_title(); ?></h1>
                <?php 
                $date = get_post_meta(get_the_ID(), '_performance_date', true);
                $time = get_post_meta(get_the_ID(), '_performance_time', true);
                if ($date) : 
                    $date_obj = new DateTime($date);
                ?>
                <div class="performance-datetime">
                    <span class="date"><?php echo $date_obj->format('d/m/Y'); ?></span>
                    <?php if ($time) : ?>
                    <span class="time"><?php echo esc_html($time); ?></span>
                    <?php endif; ?>
                </div>
                <?php endif; ?>
            </div>
        </div>
    </div>
    <?php endif; ?>

    <div class="container">
        <div class="performance-content">
            <div class="performance-main">
                <?php the_content(); ?>
            </div>
            
            <aside class="performance-sidebar">
                <?php 
                $venue = get_post_meta(get_the_ID(), '_performance_venue', true);
                $ticket_link = get_post_meta(get_the_ID(), '_ticket_link', true);
                ?>
                
                <?php if ($date || $time || $venue) : ?>
                <div class="sidebar-block">
                    <h3><?php _e('Details', 'maysternya'); ?></h3>
                    <?php if ($date) : ?>
                    <div class="detail-item">
                        <span class="label"><?php _e('Date', 'maysternya'); ?></span>
                        <span class="value"><?php echo $date_obj->format('F d, Y'); ?></span>
                    </div>
                    <?php endif; ?>
                    <?php if ($time) : ?>
                    <div class="detail-item">
                        <span class="label"><?php _e('Time', 'maysternya'); ?></span>
                        <span class="value"><?php echo esc_html($time); ?></span>
                    </div>
                    <?php endif; ?>
                    <?php if ($venue) : ?>
                    <div class="detail-item">
                        <span class="label"><?php _e('Venue', 'maysternya'); ?></span>
                        <span class="value"><?php echo esc_html($venue); ?></span>
                    </div>
                    <?php endif; ?>
                </div>
                <?php endif; ?>
                
                <?php if ($ticket_link) : ?>
                <a href="<?php echo esc_url($ticket_link); ?>" class="btn btn-primary btn-block" target="_blank" rel="noopener noreferrer">
                    <?php _e('BUY TICKETS', 'maysternya'); ?>
                </a>
                <?php endif; ?>
            </aside>
        </div>
    </div>
</article>

<?php endwhile; ?>

<?php get_footer(); ?>
