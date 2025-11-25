<?php
/**
 * Single Post Template
 *
 * @package Maysternya
 */

get_header();
?>

<?php maysternya_breadcrumbs(); ?>

<?php while (have_posts()) : the_post(); ?>

<article <?php post_class('single-post'); ?> data-testid="single-post">
    
    <?php if (has_post_thumbnail()) : ?>
    <div class="post-hero">
        <div class="hero-background">
            <?php the_post_thumbnail('hero-image'); ?>
            <div class="hero-overlay"></div>
        </div>
        <div class="container">
            <h1 class="post-title"><?php the_title(); ?></h1>
            <div class="post-meta">
                <span class="post-date"><?php echo get_the_date(); ?></span>
                <?php if (has_category()) : ?>
                <span class="post-category"><?php the_category(', '); ?></span>
                <?php endif; ?>
            </div>
        </div>
    </div>
    <?php else : ?>
    <div class="container">
        <header class="page-header">
            <h1 class="page-title"><?php the_title(); ?></h1>
            <div class="post-meta">
                <span class="post-date"><?php echo get_the_date(); ?></span>
                <?php if (has_category()) : ?>
                <span class="post-category"><?php the_category(', '); ?></span>
                <?php endif; ?>
            </div>
        </header>
    </div>
    <?php endif; ?>

    <div class="container">
        <div class="post-content">
            <?php the_content(); ?>
        </div>
        
        <?php if (has_tag()) : ?>
        <div class="post-tags">
            <span class="tags-label"><?php _e('Tags:', 'maysternya'); ?></span>
            <?php the_tags('', ', ', ''); ?>
        </div>
        <?php endif; ?>
        
        <!-- Post Navigation -->
        <nav class="post-navigation">
            <div class="nav-links">
                <?php
                $prev_post = get_previous_post();
                $next_post = get_next_post();
                ?>
                <?php if ($prev_post) : ?>
                <a href="<?php echo get_permalink($prev_post); ?>" class="nav-previous">
                    <span class="nav-label"><?php _e('Previous', 'maysternya'); ?></span>
                    <span class="nav-title"><?php echo get_the_title($prev_post); ?></span>
                </a>
                <?php endif; ?>
                <?php if ($next_post) : ?>
                <a href="<?php echo get_permalink($next_post); ?>" class="nav-next">
                    <span class="nav-label"><?php _e('Next', 'maysternya'); ?></span>
                    <span class="nav-title"><?php echo get_the_title($next_post); ?></span>
                </a>
                <?php endif; ?>
            </div>
        </nav>
    </div>
</article>

<?php endwhile; ?>

<style>
.single-post .post-hero {
    position: relative;
    min-height: 50vh;
    display: flex;
    align-items: flex-end;
    padding: var(--spacing-xxl) 0;
}

.single-post .post-title {
    position: relative;
    z-index: 1;
    font-size: clamp(2rem, 5vw, 3.5rem);
    margin-bottom: var(--spacing-md);
}

.single-post .post-meta {
    display: flex;
    gap: var(--spacing-md);
    font-size: 0.875rem;
    color: var(--color-text-secondary);
    letter-spacing: 0.1em;
    text-transform: uppercase;
}

.single-post .post-content {
    padding: var(--spacing-xxl) 0;
    font-size: 1.125rem;
    line-height: 1.8;
    max-width: 800px;
}

.single-post .post-tags {
    padding: var(--spacing-lg) 0;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.single-post .tags-label {
    font-size: 0.75rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-right: var(--spacing-sm);
}

.single-post .post-navigation {
    padding: var(--spacing-xl) 0;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.single-post .nav-links {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-lg);
}

.single-post .nav-previous,
.single-post .nav-next {
    display: block;
    padding: var(--spacing-md);
    background-color: var(--color-bg-card);
    transition: var(--transition-fast);
}

.single-post .nav-previous:hover,
.single-post .nav-next:hover {
    background-color: var(--color-bg-secondary);
}

.single-post .nav-next {
    text-align: right;
}

.single-post .nav-label {
    display: block;
    font-size: 0.75rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--color-text-muted);
    margin-bottom: var(--spacing-xs);
}

.single-post .nav-title {
    font-size: 1rem;
    font-weight: 500;
}
</style>

<?php get_footer(); ?>
