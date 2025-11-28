<?php
/**
 * Maysternya Custom Gutenberg Blocks
 * 
 * Registers all custom blocks for the theme using modern @wordpress/scripts approach
 * Blocks use React for both editor and frontend rendering (static HTML saved to database)
 * 
 * @package Maysternya
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Register block category for Maysternya blocks
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
    // Check if build files exist
    $build_dir = MAYSTERNYA_DIR . '/blocks/build';
    
    if (!file_exists($build_dir . '/index.js')) {
        return;
    }
    
    // Get asset file for dependencies and version
    $asset_file_path = $build_dir . '/index.asset.php';
    if (file_exists($asset_file_path)) {
        $asset_file = include($asset_file_path);
    } else {
        $asset_file = array(
            'dependencies' => array('wp-blocks', 'wp-element', 'wp-block-editor', 'wp-components', 'wp-i18n'),
            'version' => MAYSTERNYA_VERSION,
        );
    }
    
    // Register block editor script
    wp_register_script(
        'maysternya-blocks-editor',
        MAYSTERNYA_URI . '/blocks/build/index.js',
        $asset_file['dependencies'],
        $asset_file['version'],
        true
    );

    // Register block editor styles
    wp_register_style(
        'maysternya-blocks-editor',
        MAYSTERNYA_URI . '/blocks/build/index.css',
        array('wp-edit-blocks'),
        $asset_file['version']
    );

    // Register frontend styles
    wp_register_style(
        'maysternya-blocks-style',
        MAYSTERNYA_URI . '/blocks/build/style-index.css',
        array(),
        $asset_file['version']
    );

    // Define all blocks to register
    $blocks = array(
        'banner',
        'section-separator',
        'headline-subline',
        'text-block',
        'image-text-inside',
        'project-card',
        'event-card',
        'image-grid',
        'small-image-grid',
        'carousel',
        'image-icon',
        'image-subline',
        'text-image',
        'project-compact',
        'project-landing-card',
        'educational-project-card',
        'full-width-image',
    );

    // Register each block
    foreach ($blocks as $block) {
        register_block_type('maysternya/' . $block, array(
            'editor_script' => 'maysternya-blocks-editor',
            'editor_style'  => 'maysternya-blocks-editor',
            'style'         => 'maysternya-blocks-style',
        ));
    }
}
add_action('init', 'maysternya_register_blocks');

/**
 * Enqueue frontend block styles
 */
function maysternya_enqueue_block_frontend_assets() {
    $build_dir = MAYSTERNYA_DIR . '/blocks/build';
    
    if (!file_exists($build_dir . '/style-index.css')) {
        return;
    }
    
    $asset_file_path = $build_dir . '/index.asset.php';
    $version = MAYSTERNYA_VERSION;
    
    if (file_exists($asset_file_path)) {
        $asset_file = include($asset_file_path);
        $version = $asset_file['version'];
    }
    
    wp_enqueue_style(
        'maysternya-blocks-frontend',
        MAYSTERNYA_URI . '/blocks/build/style-index.css',
        array(),
        $version
    );
}
add_action('wp_enqueue_scripts', 'maysternya_enqueue_block_frontend_assets');

/**
 * Enqueue carousel/slider JavaScript for frontend
 */
function maysternya_enqueue_carousel_script() {
    if (!is_admin()) {
        wp_enqueue_script(
            'maysternya-carousel',
            MAYSTERNYA_URI . '/js/carousel.js',
            array(),
            MAYSTERNYA_VERSION,
            true
        );
    }
}
add_action('wp_enqueue_scripts', 'maysternya_enqueue_carousel_script');
