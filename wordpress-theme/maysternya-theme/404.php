<?php
/**
 * 404 Page Template
 *
 * @package Maysternya
 */

get_header();
?>

<section class="error-404" data-testid="404-page">
    <div class="container">
        <div class="error-content text-center">
            <h1 class="error-title">404</h1>
            <h2><?php _e('PAGE NOT FOUND', 'maysternya'); ?></h2>
            <p class="error-description">
                <?php _e('The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.', 'maysternya'); ?>
            </p>
            <a href="<?php echo esc_url(home_url('/')); ?>" class="btn btn-primary">
                <?php _e('BACK TO HOME', 'maysternya'); ?>
            </a>
        </div>
    </div>
</section>

<style>
.error-404 {
    min-height: calc(100vh - var(--header-height));
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--spacing-xxl) 0;
}

.error-content {
    max-width: 600px;
}

.error-title {
    font-size: clamp(6rem, 20vw, 15rem);
    line-height: 1;
    margin-bottom: var(--spacing-md);
    opacity: 0.3;
}

.error-content h2 {
    font-size: clamp(1.5rem, 4vw, 2.5rem);
    margin-bottom: var(--spacing-lg);
}

.error-description {
    color: var(--color-text-secondary);
    margin-bottom: var(--spacing-xl);
}
</style>

<?php get_footer(); ?>
