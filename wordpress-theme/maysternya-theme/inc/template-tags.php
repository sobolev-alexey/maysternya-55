<?php
/**
 * Template Tags
 *
 * @package Maysternya
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Get social media links
 */
function maysternya_get_social_links() {
    $social = array(
        'facebook' => get_theme_mod('social_facebook', ''),
        'instagram' => get_theme_mod('social_instagram', ''),
        'youtube' => get_theme_mod('social_youtube', ''),
        'telegram' => get_theme_mod('social_telegram', ''),
    );
    
    return array_filter($social);
}

/**
 * Display social links
 */
function maysternya_social_links($class = 'social-links') {
    $social = maysternya_get_social_links();
    
    if (empty($social)) {
        return;
    }
    
    $icons = array(
        'facebook' => '<svg viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>',
        'instagram' => '<svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>',
        'youtube' => '<svg viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>',
        'telegram' => '<svg viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>',
    );
    
    echo '<div class="' . esc_attr($class) . '">';
    foreach ($social as $network => $url) {
        if (!empty($url)) {
            printf(
                '<a href="%s" class="social-link social-%s" target="_blank" rel="noopener noreferrer" aria-label="%s">%s</a>',
                esc_url($url),
                esc_attr($network),
                esc_attr(ucfirst($network)),
                $icons[$network]
            );
        }
    }
    echo '</div>';
}

/**
 * Display breadcrumbs
 */
function maysternya_breadcrumbs() {
    if (is_front_page()) {
        return;
    }
    
    echo '<nav class="breadcrumb" aria-label="Breadcrumb">';
    echo '<div class="container">';
    echo '<ol class="breadcrumb-list">';
    
    echo '<li class="breadcrumb-item"><a href="' . esc_url(home_url('/')) . '">' . __('Main Page', 'maysternya') . '</a></li>';
    echo '<span class="breadcrumb-separator">/</span>';
    
    if (is_singular('performance')) {
        echo '<li class="breadcrumb-item"><a href="' . esc_url(get_post_type_archive_link('performance')) . '">' . __('Performances', 'maysternya') . '</a></li>';
        echo '<span class="breadcrumb-separator">/</span>';
        echo '<li class="breadcrumb-item current">' . get_the_title() . '</li>';
    } elseif (is_singular('project')) {
        echo '<li class="breadcrumb-item"><a href="' . esc_url(get_post_type_archive_link('project')) . '">' . __('Projects', 'maysternya') . '</a></li>';
        echo '<span class="breadcrumb-separator">/</span>';
        echo '<li class="breadcrumb-item current">' . get_the_title() . '</li>';
    } elseif (is_post_type_archive('performance')) {
        echo '<li class="breadcrumb-item current">' . __('Performances', 'maysternya') . '</li>';
    } elseif (is_post_type_archive('project')) {
        echo '<li class="breadcrumb-item current">' . __('Projects', 'maysternya') . '</li>';
    } elseif (is_page()) {
        echo '<li class="breadcrumb-item current">' . get_the_title() . '</li>';
    } elseif (is_single()) {
        echo '<li class="breadcrumb-item current">' . get_the_title() . '</li>';
    }
    
    echo '</ol>';
    echo '</div>';
    echo '</nav>';
}

/**
 * Display performance card
 */
function maysternya_performance_card($post_id = null) {
    if (!$post_id) {
        $post_id = get_the_ID();
    }
    
    $date = get_post_meta($post_id, '_performance_date', true);
    $time = get_post_meta($post_id, '_performance_time', true);
    $author = get_post_meta($post_id, '_performance_author', true);
    
    ?>
    <article class="performance-card" data-testid="performance-card">
        <div class="performance-date">
            <?php if ($date) : 
                $date_obj = new DateTime($date);
            ?>
            <span class="performance-day"><?php echo $date_obj->format('d'); ?></span>
            <span class="performance-month"><?php echo $date_obj->format('M'); ?></span>
            <?php endif; ?>
            <?php if ($time) : ?>
            <span class="performance-time"><?php echo esc_html($time); ?></span>
            <?php endif; ?>
        </div>
        <div class="performance-info">
            <?php if ($author) : ?>
            <span class="performance-author"><?php echo esc_html($author); ?></span>
            <?php endif; ?>
            <h3 class="performance-title">
                <a href="<?php the_permalink($post_id); ?>"><?php echo get_the_title($post_id); ?></a>
            </h3>
        </div>
        <?php if (has_post_thumbnail($post_id)) : ?>
        <div class="performance-image">
            <?php echo get_the_post_thumbnail($post_id, 'project-card'); ?>
        </div>
        <?php endif; ?>
    </article>
    <?php
}

/**
 * Display project card
 */
function maysternya_project_card($post_id = null) {
    if (!$post_id) {
        $post_id = get_the_ID();
    }
    
    ?>
    <article class="project-card" data-testid="project-card">
        <a href="<?php the_permalink($post_id); ?>" class="project-link">
            <div class="project-image">
                <?php if (has_post_thumbnail($post_id)) : ?>
                    <?php echo get_the_post_thumbnail($post_id, 'project-card'); ?>
                <?php else : ?>
                    <div class="project-placeholder"></div>
                <?php endif; ?>
                <div class="project-overlay">
                    <h3 class="project-title"><?php echo get_the_title($post_id); ?></h3>
                    <span class="project-meta"><?php echo esc_html(get_the_excerpt($post_id)); ?></span>
                </div>
            </div>
        </a>
    </article>
    <?php
}

/**
 * Display team member card
 */
function maysternya_team_member_card($post_id = null) {
    if (!$post_id) {
        $post_id = get_the_ID();
    }
    
    $role = get_post_meta($post_id, '_team_role', true);
    
    ?>
    <article class="team-member" data-testid="team-member-card">
        <div class="team-member-image">
            <?php if (has_post_thumbnail($post_id)) : ?>
                <?php echo get_the_post_thumbnail($post_id, 'team-member'); ?>
            <?php else : ?>
                <div class="team-member-placeholder"></div>
            <?php endif; ?>
        </div>
        <h3 class="team-member-name"><?php echo get_the_title($post_id); ?></h3>
        <?php if ($role) : ?>
        <span class="team-member-role"><?php echo esc_html($role); ?></span>
        <?php endif; ?>
    </article>
    <?php
}

/**
 * Get formatted performance date
 */
function maysternya_get_performance_date($post_id = null) {
    if (!$post_id) {
        $post_id = get_the_ID();
    }
    
    $date = get_post_meta($post_id, '_performance_date', true);
    $time = get_post_meta($post_id, '_performance_time', true);
    
    if (!$date) {
        return '';
    }
    
    $date_obj = new DateTime($date);
    $formatted = $date_obj->format('d/m');
    
    if ($time) {
        $formatted .= ' ' . $time;
    }
    
    return $formatted;
}
