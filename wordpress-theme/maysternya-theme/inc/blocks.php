<?php
/**
 * Maysternya Custom Gutenberg Blocks
 * 
 * Registers all custom blocks for the theme
 * 
 * @package Maysternya
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Register block category
 */
function maysternya_block_category($categories) {
    return array_merge(
        array(
            array(
                'slug'  => 'maysternya',
                'title' => __('Maysternya 55', 'maysternya'),
                'icon'  => 'theater',
            ),
        ),
        $categories
    );
}
add_filter('block_categories_all', 'maysternya_block_category', 10, 1);

/**
 * Register block scripts and styles
 */
function maysternya_register_blocks() {
    // Register block editor script
    wp_register_script(
        'maysternya-blocks-editor',
        MAYSTERNYA_URI . '/blocks/build/index.js',
        array('wp-blocks', 'wp-element', 'wp-block-editor', 'wp-components', 'wp-i18n', 'wp-data'),
        MAYSTERNYA_VERSION,
        true
    );

    // Register block editor styles
    wp_register_style(
        'maysternya-blocks-editor',
        MAYSTERNYA_URI . '/blocks/build/editor.css',
        array('wp-edit-blocks'),
        MAYSTERNYA_VERSION
    );

    // Register frontend styles
    wp_register_style(
        'maysternya-blocks-style',
        MAYSTERNYA_URI . '/blocks/build/style.css',
        array(),
        MAYSTERNYA_VERSION
    );

    // Define all blocks
    $blocks = array(
        'page-hero',
        'section-header',
        'hero-section',
        'bio-section',
        'two-column-content',
        'image-strip',
        'centered-quote',
        'timeline',
        'project-card',
        'event-card',
        'about-hero',
        'full-width-image',
        'team-member',
    );

    // Register each block
    foreach ($blocks as $block) {
        register_block_type('maysternya/' . $block, array(
            'editor_script' => 'maysternya-blocks-editor',
            'editor_style'  => 'maysternya-blocks-editor',
            'style'         => 'maysternya-blocks-style',
            'render_callback' => 'maysternya_render_block_' . str_replace('-', '_', $block),
        ));
    }
}
add_action('init', 'maysternya_register_blocks');

/**
 * Block Render Callbacks
 */

// Page Hero Block
function maysternya_render_block_page_hero($attributes) {
    $breadcrumb = isset($attributes['breadcrumb']) ? $attributes['breadcrumb'] : 'MAIN PAGE';
    $pretitle = isset($attributes['pretitle']) ? $attributes['pretitle'] : '';
    $title = isset($attributes['title']) ? $attributes['title'] : 'Page Title';
    $image = isset($attributes['imageUrl']) ? $attributes['imageUrl'] : '';
    $imagePosition = isset($attributes['imagePosition']) ? $attributes['imagePosition'] : 'left';
    
    ob_start();
    ?>
    <section class="page-hero-block <?php echo esc_attr('image-' . $imagePosition); ?>">
        <div class="container">
            <span class="breadcrumb"><?php echo esc_html($breadcrumb); ?></span>
            <div class="page-hero-inner">
                <?php if ($image && $imagePosition === 'left') : ?>
                <div class="page-hero-image">
                    <img src="<?php echo esc_url($image); ?>" alt="">
                </div>
                <?php endif; ?>
                <div class="page-hero-content">
                    <?php if ($pretitle) : ?>
                    <span class="pretitle"><?php echo esc_html($pretitle); ?></span>
                    <?php endif; ?>
                    <h1 class="page-hero-title"><?php echo wp_kses_post(nl2br($title)); ?></h1>
                </div>
                <?php if ($image && $imagePosition === 'right') : ?>
                <div class="page-hero-image">
                    <img src="<?php echo esc_url($image); ?>" alt="">
                </div>
                <?php endif; ?>
            </div>
        </div>
    </section>
    <?php
    return ob_get_clean();
}

// Section Header Block
function maysternya_render_block_section_header($attributes) {
    $title = isset($attributes['title']) ? $attributes['title'] : 'Section Title';
    $subtitle = isset($attributes['subtitle']) ? $attributes['subtitle'] : '';
    
    ob_start();
    ?>
    <div class="section-header-block">
        <div class="container">
            <div class="section-header">
                <h2 class="section-title"><?php echo esc_html($title); ?></h2>
                <?php if ($subtitle) : ?>
                <span class="section-subtitle"><?php echo esc_html($subtitle); ?></span>
                <?php endif; ?>
            </div>
        </div>
    </div>
    <?php
    return ob_get_clean();
}

// Hero Section Block
function maysternya_render_block_hero_section($attributes) {
    $title = isset($attributes['title']) ? $attributes['title'] : 'IN\nTHEATRE\nWE TRUST';
    $buttonText = isset($attributes['buttonText']) ? $attributes['buttonText'] : 'GO TO PERFORMANCES';
    $buttonUrl = isset($attributes['buttonUrl']) ? $attributes['buttonUrl'] : '#';
    $backgroundImage = isset($attributes['backgroundImage']) ? $attributes['backgroundImage'] : '';
    
    ob_start();
    ?>
    <section class="hero-section-block">
        <div class="hero-background">
            <?php if ($backgroundImage) : ?>
            <img src="<?php echo esc_url($backgroundImage); ?>" alt="">
            <?php endif; ?>
            <div class="hero-overlay"></div>
        </div>
        <div class="hero-content">
            <h1 class="hero-title"><?php echo wp_kses_post(nl2br($title)); ?></h1>
            <?php if ($buttonText) : ?>
            <a href="<?php echo esc_url($buttonUrl); ?>" class="btn btn-primary"><?php echo esc_html($buttonText); ?></a>
            <?php endif; ?>
        </div>
    </section>
    <?php
    return ob_get_clean();
}

// Bio Section Block
function maysternya_render_block_bio_section($attributes) {
    $title = isset($attributes['title']) ? $attributes['title'] : 'Title';
    $content = isset($attributes['content']) ? $attributes['content'] : '';
    $image = isset($attributes['imageUrl']) ? $attributes['imageUrl'] : '';
    $imageCaption = isset($attributes['imageCaption']) ? $attributes['imageCaption'] : '';
    $imagePosition = isset($attributes['imagePosition']) ? $attributes['imagePosition'] : 'left';
    
    ob_start();
    ?>
    <section class="bio-section-block <?php echo esc_attr('image-' . $imagePosition); ?>">
        <div class="container">
            <div class="bio-inner">
                <?php if ($image && $imagePosition === 'left') : ?>
                <div class="bio-image">
                    <img src="<?php echo esc_url($image); ?>" alt="">
                    <?php if ($imageCaption) : ?>
                    <span class="image-caption"><?php echo esc_html($imageCaption); ?></span>
                    <?php endif; ?>
                </div>
                <?php endif; ?>
                <div class="bio-content">
                    <h2 class="bio-title"><?php echo wp_kses_post(nl2br($title)); ?></h2>
                    <div class="bio-text"><?php echo wp_kses_post($content); ?></div>
                </div>
                <?php if ($image && $imagePosition === 'right') : ?>
                <div class="bio-image">
                    <img src="<?php echo esc_url($image); ?>" alt="">
                    <?php if ($imageCaption) : ?>
                    <span class="image-caption"><?php echo esc_html($imageCaption); ?></span>
                    <?php endif; ?>
                </div>
                <?php endif; ?>
            </div>
        </div>
    </section>
    <?php
    return ob_get_clean();
}

// Two Column Content Block
function maysternya_render_block_two_column_content($attributes) {
    $title = isset($attributes['title']) ? $attributes['title'] : 'Title';
    $content = isset($attributes['content']) ? $attributes['content'] : '';
    $image = isset($attributes['imageUrl']) ? $attributes['imageUrl'] : '';
    $imagePosition = isset($attributes['imagePosition']) ? $attributes['imagePosition'] : 'right';
    
    ob_start();
    ?>
    <section class="two-column-block <?php echo esc_attr('image-' . $imagePosition); ?>">
        <div class="container">
            <div class="two-column-inner">
                <?php if ($image && $imagePosition === 'left') : ?>
                <div class="column-image">
                    <img src="<?php echo esc_url($image); ?>" alt="">
                </div>
                <?php endif; ?>
                <div class="column-content">
                    <h2 class="column-title"><?php echo wp_kses_post(nl2br($title)); ?></h2>
                    <div class="column-text"><?php echo wp_kses_post($content); ?></div>
                </div>
                <?php if ($image && $imagePosition === 'right') : ?>
                <div class="column-image">
                    <img src="<?php echo esc_url($image); ?>" alt="">
                </div>
                <?php endif; ?>
            </div>
        </div>
    </section>
    <?php
    return ob_get_clean();
}

// Image Strip Block
function maysternya_render_block_image_strip($attributes) {
    $images = isset($attributes['images']) ? $attributes['images'] : array();
    $caption = isset($attributes['caption']) ? $attributes['caption'] : '';
    
    ob_start();
    ?>
    <section class="image-strip-block">
        <div class="image-strip-container">
            <div class="image-strip">
                <?php foreach ($images as $image) : ?>
                <div class="strip-image">
                    <img src="<?php echo esc_url($image['url']); ?>" alt="<?php echo esc_attr($image['alt'] ?? ''); ?>">
                </div>
                <?php endforeach; ?>
            </div>
        </div>
        <?php if ($caption) : ?>
        <div class="container">
            <p class="strip-caption"><?php echo wp_kses_post($caption); ?></p>
        </div>
        <?php endif; ?>
    </section>
    <?php
    return ob_get_clean();
}

// Centered Quote Block
function maysternya_render_block_centered_quote($attributes) {
    $text = isset($attributes['text']) ? $attributes['text'] : '';
    $showIcon = isset($attributes['showIcon']) ? $attributes['showIcon'] : true;
    $iconType = isset($attributes['iconType']) ? $attributes['iconType'] : 'heart';
    
    ob_start();
    ?>
    <section class="centered-quote-block">
        <div class="container">
            <div class="quote-inner">
                <p class="quote-text"><?php echo wp_kses_post($text); ?></p>
                <?php if ($showIcon) : ?>
                <div class="quote-icon">
                    <?php if ($iconType === 'heart') : ?>
                    <svg viewBox="0 0 24 24" width="48" height="48"><path fill="currentColor" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                    <?php elseif ($iconType === 'flame') : ?>
                    <svg viewBox="0 0 24 24" width="48" height="48"><path fill="currentColor" d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z"/></svg>
                    <?php endif; ?>
                </div>
                <?php endif; ?>
            </div>
        </div>
    </section>
    <?php
    return ob_get_clean();
}

// Timeline Block
function maysternya_render_block_timeline($attributes) {
    $title = isset($attributes['title']) ? $attributes['title'] : 'TIMELINE';
    $subtitle = isset($attributes['subtitle']) ? $attributes['subtitle'] : '';
    $periods = isset($attributes['periods']) ? $attributes['periods'] : array();
    
    ob_start();
    ?>
    <section class="timeline-block">
        <div class="container">
            <div class="timeline-header">
                <h2 class="timeline-title"><?php echo esc_html($title); ?></h2>
                <?php if ($subtitle) : ?>
                <span class="timeline-subtitle"><?php echo esc_html($subtitle); ?></span>
                <?php endif; ?>
            </div>
            <div class="timeline-nav">
                <button class="timeline-arrow timeline-prev" aria-label="Previous">&lt;</button>
                <div class="timeline-years">
                    <?php foreach ($periods as $index => $period) : ?>
                    <button class="timeline-year <?php echo $index === 0 ? 'active' : ''; ?>" data-index="<?php echo $index; ?>">
                        <?php echo esc_html($period['year']); ?>
                    </button>
                    <?php endforeach; ?>
                </div>
                <button class="timeline-arrow timeline-next" aria-label="Next">&gt;</button>
            </div>
            <div class="timeline-range">
                <?php if (!empty($periods)) : ?>
                <span class="range-start"><?php echo esc_html($periods[0]['startYear'] ?? $periods[0]['year']); ?></span>
                <span class="range-separator">—</span>
                <span class="range-end"><?php echo esc_html($periods[0]['endYear'] ?? ''); ?></span>
                <?php endif; ?>
            </div>
        </div>
    </section>
    <?php
    return ob_get_clean();
}

// Project Card Block
function maysternya_render_block_project_card($attributes) {
    $title = isset($attributes['title']) ? $attributes['title'] : 'Project Title';
    $image = isset($attributes['imageUrl']) ? $attributes['imageUrl'] : '';
    $link = isset($attributes['link']) ? $attributes['link'] : '#';
    $badge = isset($attributes['badge']) ? $attributes['badge'] : 'MAYSTERNYA 55';
    $location = isset($attributes['location']) ? $attributes['location'] : '';
    $author = isset($attributes['author']) ? $attributes['author'] : '';
    $director = isset($attributes['director']) ? $attributes['director'] : '';
    
    ob_start();
    ?>
    <article class="project-card-block">
        <a href="<?php echo esc_url($link); ?>">
            <div class="project-image-wrapper">
                <?php if ($image) : ?>
                <img src="<?php echo esc_url($image); ?>" alt="">
                <?php else : ?>
                <img src="https://placehold.co/600x600/1a1a1a/1a1a1a.png" alt="">
                <?php endif; ?>
                <div class="project-overlay">
                    <span class="project-badge"><?php echo esc_html($badge); ?></span>
                    <h3 class="project-title"><?php echo wp_kses_post(nl2br($title)); ?></h3>
                </div>
            </div>
            <div class="project-meta">
                <?php if ($location) : ?>
                <p class="project-location"><?php echo esc_html($location); ?></p>
                <?php endif; ?>
                <?php if ($author) : ?>
                <p><?php echo esc_html($author); ?></p>
                <?php endif; ?>
                <?php if ($director) : ?>
                <p><?php echo esc_html($director); ?></p>
                <?php endif; ?>
            </div>
        </a>
    </article>
    <?php
    return ob_get_clean();
}

// Event Card Block
function maysternya_render_block_event_card($attributes) {
    $date = isset($attributes['date']) ? $attributes['date'] : '01/01';
    $time = isset($attributes['time']) ? $attributes['time'] : '7:00pm';
    $type = isset($attributes['type']) ? $attributes['type'] : 'PERFORMANCE';
    $title = isset($attributes['title']) ? $attributes['title'] : 'Event Title';
    $author = isset($attributes['author']) ? $attributes['author'] : '';
    $director = isset($attributes['director']) ? $attributes['director'] : '';
    $image = isset($attributes['imageUrl']) ? $attributes['imageUrl'] : '';
    
    ob_start();
    ?>
    <article class="event-card-block">
        <div class="event-col-date">
            <span class="event-day"><?php echo esc_html($date); ?></span>
            <span class="event-time"><?php echo esc_html($time); ?></span>
            <span class="event-type"><?php echo esc_html($type); ?></span>
        </div>
        <div class="event-col-content">
            <?php if ($author) : ?>
            <p class="event-author">Author: <?php echo esc_html($author); ?></p>
            <?php endif; ?>
            <h3 class="event-title"><?php echo wp_kses_post(nl2br($title)); ?></h3>
            <?php if ($director) : ?>
            <p class="event-director"><?php echo esc_html($director); ?></p>
            <?php endif; ?>
        </div>
        <div class="event-col-image">
            <?php if ($image) : ?>
            <img src="<?php echo esc_url($image); ?>" alt="">
            <?php else : ?>
            <img src="https://placehold.co/400x400/1a1a1a/1a1a1a.png" alt="">
            <?php endif; ?>
        </div>
    </article>
    <?php
    return ob_get_clean();
}

// About Hero Block
function maysternya_render_block_about_hero($attributes) {
    $label = isset($attributes['label']) ? $attributes['label'] : 'ABOUT US';
    $title = isset($attributes['title']) ? $attributes['title'] : 'MORE THAN A\nTHEATRE';
    $buttonText = isset($attributes['buttonText']) ? $attributes['buttonText'] : '';
    $buttonUrl = isset($attributes['buttonUrl']) ? $attributes['buttonUrl'] : '#';
    $backgroundImage = isset($attributes['backgroundImage']) ? $attributes['backgroundImage'] : '';
    
    ob_start();
    ?>
    <section class="about-hero-block">
        <div class="about-hero-bg">
            <?php if ($backgroundImage) : ?>
            <img src="<?php echo esc_url($backgroundImage); ?>" alt="">
            <?php else : ?>
            <img src="https://placehold.co/1920x900/1a1a1a/1a1a1a.png" alt="">
            <?php endif; ?>
            <div class="about-hero-overlay"></div>
        </div>
        <div class="about-hero-content">
            <span class="about-label"><?php echo esc_html($label); ?></span>
            <h2 class="about-hero-title"><?php echo wp_kses_post(nl2br($title)); ?></h2>
            <?php if ($buttonText) : ?>
            <a href="<?php echo esc_url($buttonUrl); ?>" class="btn btn-outline"><?php echo esc_html($buttonText); ?></a>
            <?php endif; ?>
        </div>
    </section>
    <?php
    return ob_get_clean();
}

// Full Width Image Block
function maysternya_render_block_full_width_image($attributes) {
    $image = isset($attributes['imageUrl']) ? $attributes['imageUrl'] : '';
    $overlayText = isset($attributes['overlayText']) ? $attributes['overlayText'] : '';
    $caption = isset($attributes['caption']) ? $attributes['caption'] : '';
    
    ob_start();
    ?>
    <section class="full-width-image-block">
        <div class="image-container">
            <?php if ($image) : ?>
            <img src="<?php echo esc_url($image); ?>" alt="">
            <?php endif; ?>
            <?php if ($overlayText) : ?>
            <div class="image-overlay">
                <h2 class="overlay-text"><?php echo wp_kses_post(nl2br($overlayText)); ?></h2>
            </div>
            <?php endif; ?>
        </div>
        <?php if ($caption) : ?>
        <div class="container">
            <p class="image-caption"><?php echo wp_kses_post($caption); ?></p>
        </div>
        <?php endif; ?>
    </section>
    <?php
    return ob_get_clean();
}

// Team Member Block
function maysternya_render_block_team_member($attributes) {
    $name = isset($attributes['name']) ? $attributes['name'] : 'Name';
    $role = isset($attributes['role']) ? $attributes['role'] : '';
    $image = isset($attributes['imageUrl']) ? $attributes['imageUrl'] : '';
    $link = isset($attributes['link']) ? $attributes['link'] : '';
    
    ob_start();
    ?>
    <article class="team-member-block">
        <?php if ($link) : ?><a href="<?php echo esc_url($link); ?>"><?php endif; ?>
        <div class="member-image">
            <?php if ($image) : ?>
            <img src="<?php echo esc_url($image); ?>" alt="<?php echo esc_attr($name); ?>">
            <?php else : ?>
            <img src="https://placehold.co/400x400/1a1a1a/1a1a1a.png" alt="">
            <?php endif; ?>
        </div>
        <div class="member-info">
            <h3 class="member-name"><?php echo esc_html($name); ?></h3>
            <?php if ($role) : ?>
            <p class="member-role"><?php echo esc_html($role); ?></p>
            <?php endif; ?>
        </div>
        <?php if ($link) : ?></a><?php endif; ?>
    </article>
    <?php
    return ob_get_clean();
}
