<?php
/**
 * Theme functions and definitions
 *
 * @package Maysternya
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

/**
 * Define theme constants
 */
define('MAYSTERNYA_VERSION', '1.0.0');
define('MAYSTERNYA_DIR', get_template_directory());
define('MAYSTERNYA_URI', get_template_directory_uri());

/**
 * Theme setup
 */
function maysternya_setup() {
    // Add default posts and comments RSS feed links to head
    add_theme_support('automatic-feed-links');

    // Let WordPress manage the document title
    add_theme_support('title-tag');

    // Enable support for Post Thumbnails
    add_theme_support('post-thumbnails');

    // Add custom image sizes
    add_image_size('hero-image', 1920, 1080, true);
    add_image_size('project-card', 800, 500, true);
    add_image_size('team-member', 400, 400, true);
    add_image_size('gallery-image', 600, 450, true);

    // Register navigation menus
    register_nav_menus(array(
        'primary' => esc_html__('Primary Menu', 'maysternya'),
        'footer' => esc_html__('Footer Menu', 'maysternya'),
        'mobile' => esc_html__('Mobile Menu', 'maysternya'),
    ));

    // Enable HTML5 markup support
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
        'style',
        'script',
    ));

    // Add support for custom logo
    add_theme_support('custom-logo', array(
        'height' => 80,
        'width' => 200,
        'flex-width' => true,
        'flex-height' => true,
    ));

    // Add support for editor styles
    add_theme_support('editor-styles');
    add_editor_style('css/editor-style.css');

    // Add support for responsive embedded content
    add_theme_support('responsive-embeds');

    // Add support for wide alignment
    add_theme_support('align-wide');
}
add_action('after_setup_theme', 'maysternya_setup');

/**
 * Enqueue scripts and styles
 */
function maysternya_scripts() {
    // Google Fonts - Space Grotesk
    wp_enqueue_style('google-fonts', 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap', array(), null);
    
    // Main stylesheet
    wp_enqueue_style('maysternya-style', get_stylesheet_uri(), array(), MAYSTERNYA_VERSION);
    
    // Additional CSS files
    wp_enqueue_style('maysternya-sections', MAYSTERNYA_URI . '/css/sections.css', array('maysternya-style'), MAYSTERNYA_VERSION);
    wp_enqueue_style('maysternya-footer', MAYSTERNYA_URI . '/css/footer.css', array('maysternya-style'), MAYSTERNYA_VERSION);
    wp_enqueue_style('maysternya-responsive', MAYSTERNYA_URI . '/css/responsive.css', array('maysternya-style'), MAYSTERNYA_VERSION);
    
    // Main JavaScript
    wp_enqueue_script('maysternya-main', MAYSTERNYA_URI . '/js/main.js', array(), MAYSTERNYA_VERSION, true);
    
    // Localize script for AJAX
    wp_localize_script('maysternya-main', 'maysternyaAjax', array(
        'ajaxurl' => admin_url('admin-ajax.php'),
        'nonce' => wp_create_nonce('maysternya_nonce'),
    ));
}
add_action('wp_enqueue_scripts', 'maysternya_scripts');

/**
 * Register widget areas
 */
function maysternya_widgets_init() {
    register_sidebar(array(
        'name' => esc_html__('Footer Widget 1', 'maysternya'),
        'id' => 'footer-1',
        'description' => esc_html__('Add widgets here.', 'maysternya'),
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget' => '</div>',
        'before_title' => '<h4 class="widget-title">',
        'after_title' => '</h4>',
    ));

    register_sidebar(array(
        'name' => esc_html__('Footer Widget 2', 'maysternya'),
        'id' => 'footer-2',
        'description' => esc_html__('Add widgets here.', 'maysternya'),
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget' => '</div>',
        'before_title' => '<h4 class="widget-title">',
        'after_title' => '</h4>',
    ));
}
add_action('widgets_init', 'maysternya_widgets_init');

/**
 * Custom Walker for Navigation Menu
 */
class Maysternya_Nav_Walker extends Walker_Nav_Menu {
    public function start_lvl(&$output, $depth = 0, $args = null) {
        $output .= '<ul class="dropdown-menu">';
    }

    public function end_lvl(&$output, $depth = 0, $args = null) {
        $output .= '</ul>';
    }

    public function start_el(&$output, $item, $depth = 0, $args = null, $id = 0) {
        $classes = empty($item->classes) ? array() : (array) $item->classes;
        $has_children = in_array('menu-item-has-children', $classes);
        
        $class_names = join(' ', apply_filters('nav_menu_css_class', array_filter($classes), $item, $args, $depth));
        $class_names = $class_names ? ' class="nav-item ' . esc_attr($class_names) . '"' : ' class="nav-item"';

        $output .= '<li' . $class_names . '>';

        $atts = array();
        $atts['title'] = !empty($item->attr_title) ? $item->attr_title : '';
        $atts['target'] = !empty($item->target) ? $item->target : '';
        $atts['rel'] = !empty($item->xfn) ? $item->xfn : '';
        $atts['href'] = !empty($item->url) ? $item->url : '';
        $atts['class'] = $depth === 0 ? 'nav-link' : 'dropdown-item';

        $atts = apply_filters('nav_menu_link_attributes', $atts, $item, $args, $depth);

        $attributes = '';
        foreach ($atts as $attr => $value) {
            if (!empty($value)) {
                $value = ('href' === $attr) ? esc_url($value) : esc_attr($value);
                $attributes .= ' ' . $attr . '="' . $value . '"';
            }
        }

        $item_output = $args->before;
        $item_output .= '<a' . $attributes . '>';
        $item_output .= $args->link_before . apply_filters('the_title', $item->title, $item->ID) . $args->link_after;
        
        if ($has_children && $depth === 0) {
            $item_output .= ' <span class="arrow">▼</span>';
        }
        
        $item_output .= '</a>';
        $item_output .= $args->after;

        $output .= apply_filters('walker_nav_menu_start_el', $item_output, $item, $depth, $args);
    }
}

/**
 * Include theme customizer options
 */
require_once MAYSTERNYA_DIR . '/inc/customizer.php';

/**
 * Include custom post types
 */
require_once MAYSTERNYA_DIR . '/inc/custom-post-types.php';

/**
 * Include template tags
 */
require_once MAYSTERNYA_DIR . '/inc/template-tags.php';

/**
 * Add body classes
 */
function maysternya_body_classes($classes) {
    if (is_front_page()) {
        $classes[] = 'front-page';
    }
    
    if (is_singular()) {
        $classes[] = 'singular';
    }
    
    return $classes;
}
add_filter('body_class', 'maysternya_body_classes');

/**
 * Modify excerpt length
 */
function maysternya_excerpt_length($length) {
    return 20;
}
add_filter('excerpt_length', 'maysternya_excerpt_length');

/**
 * Modify excerpt more
 */
function maysternya_excerpt_more($more) {
    return '...';
}
add_filter('excerpt_more', 'maysternya_excerpt_more');
