<?php
/**
 * Custom Post Types for Maysternya Theatre
 *
 * @package Maysternya
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Register Custom Post Types
 */
function maysternya_register_post_types() {
    // Performances Post Type
    $performance_labels = array(
        'name' => _x('Performances', 'Post Type General Name', 'maysternya'),
        'singular_name' => _x('Performance', 'Post Type Singular Name', 'maysternya'),
        'menu_name' => __('Performances', 'maysternya'),
        'all_items' => __('All Performances', 'maysternya'),
        'add_new_item' => __('Add New Performance', 'maysternya'),
        'add_new' => __('Add New', 'maysternya'),
        'new_item' => __('New Performance', 'maysternya'),
        'edit_item' => __('Edit Performance', 'maysternya'),
        'update_item' => __('Update Performance', 'maysternya'),
        'view_item' => __('View Performance', 'maysternya'),
        'view_items' => __('View Performances', 'maysternya'),
        'search_items' => __('Search Performance', 'maysternya'),
        'featured_image' => __('Performance Image', 'maysternya'),
        'set_featured_image' => __('Set performance image', 'maysternya'),
    );
    
    $performance_args = array(
        'label' => __('Performance', 'maysternya'),
        'description' => __('Theatre performances', 'maysternya'),
        'labels' => $performance_labels,
        'supports' => array('title', 'editor', 'thumbnail', 'excerpt', 'custom-fields'),
        'hierarchical' => false,
        'public' => true,
        'show_ui' => true,
        'show_in_menu' => true,
        'menu_position' => 5,
        'menu_icon' => 'dashicons-tickets-alt',
        'show_in_admin_bar' => true,
        'show_in_nav_menus' => true,
        'can_export' => true,
        'has_archive' => true,
        'exclude_from_search' => false,
        'publicly_queryable' => true,
        'capability_type' => 'post',
        'show_in_rest' => true,
        'rewrite' => array('slug' => 'performances'),
    );
    
    register_post_type('performance', $performance_args);

    // Projects Post Type
    $project_labels = array(
        'name' => _x('Projects', 'Post Type General Name', 'maysternya'),
        'singular_name' => _x('Project', 'Post Type Singular Name', 'maysternya'),
        'menu_name' => __('Projects', 'maysternya'),
        'all_items' => __('All Projects', 'maysternya'),
        'add_new_item' => __('Add New Project', 'maysternya'),
        'add_new' => __('Add New', 'maysternya'),
        'new_item' => __('New Project', 'maysternya'),
        'edit_item' => __('Edit Project', 'maysternya'),
        'update_item' => __('Update Project', 'maysternya'),
        'view_item' => __('View Project', 'maysternya'),
        'featured_image' => __('Project Image', 'maysternya'),
        'set_featured_image' => __('Set project image', 'maysternya'),
    );
    
    $project_args = array(
        'label' => __('Project', 'maysternya'),
        'description' => __('Theatre projects', 'maysternya'),
        'labels' => $project_labels,
        'supports' => array('title', 'editor', 'thumbnail', 'excerpt', 'custom-fields'),
        'hierarchical' => false,
        'public' => true,
        'show_ui' => true,
        'show_in_menu' => true,
        'menu_position' => 6,
        'menu_icon' => 'dashicons-portfolio',
        'show_in_admin_bar' => true,
        'show_in_nav_menus' => true,
        'can_export' => true,
        'has_archive' => true,
        'exclude_from_search' => false,
        'publicly_queryable' => true,
        'capability_type' => 'post',
        'show_in_rest' => true,
        'rewrite' => array('slug' => 'projects'),
    );
    
    register_post_type('project', $project_args);

    // Team Members Post Type
    $team_labels = array(
        'name' => _x('Team Members', 'Post Type General Name', 'maysternya'),
        'singular_name' => _x('Team Member', 'Post Type Singular Name', 'maysternya'),
        'menu_name' => __('Team', 'maysternya'),
        'all_items' => __('All Team Members', 'maysternya'),
        'add_new_item' => __('Add New Team Member', 'maysternya'),
        'add_new' => __('Add New', 'maysternya'),
        'new_item' => __('New Team Member', 'maysternya'),
        'edit_item' => __('Edit Team Member', 'maysternya'),
        'featured_image' => __('Member Photo', 'maysternya'),
        'set_featured_image' => __('Set member photo', 'maysternya'),
    );
    
    $team_args = array(
        'label' => __('Team Member', 'maysternya'),
        'description' => __('Theatre team members', 'maysternya'),
        'labels' => $team_labels,
        'supports' => array('title', 'editor', 'thumbnail', 'custom-fields'),
        'hierarchical' => false,
        'public' => true,
        'show_ui' => true,
        'show_in_menu' => true,
        'menu_position' => 7,
        'menu_icon' => 'dashicons-groups',
        'show_in_admin_bar' => true,
        'show_in_nav_menus' => true,
        'can_export' => true,
        'has_archive' => true,
        'exclude_from_search' => false,
        'publicly_queryable' => true,
        'capability_type' => 'post',
        'show_in_rest' => true,
        'rewrite' => array('slug' => 'team'),
    );
    
    register_post_type('team_member', $team_args);
}
add_action('init', 'maysternya_register_post_types');

/**
 * Register Custom Taxonomies
 */
function maysternya_register_taxonomies() {
    // Performance Category
    $perf_cat_labels = array(
        'name' => _x('Performance Categories', 'Taxonomy General Name', 'maysternya'),
        'singular_name' => _x('Performance Category', 'Taxonomy Singular Name', 'maysternya'),
        'menu_name' => __('Categories', 'maysternya'),
        'all_items' => __('All Categories', 'maysternya'),
        'parent_item' => __('Parent Category', 'maysternya'),
        'parent_item_colon' => __('Parent Category:', 'maysternya'),
        'new_item_name' => __('New Category Name', 'maysternya'),
        'add_new_item' => __('Add New Category', 'maysternya'),
        'edit_item' => __('Edit Category', 'maysternya'),
    );
    
    $perf_cat_args = array(
        'labels' => $perf_cat_labels,
        'hierarchical' => true,
        'public' => true,
        'show_ui' => true,
        'show_admin_column' => true,
        'show_in_nav_menus' => true,
        'show_tagcloud' => false,
        'show_in_rest' => true,
        'rewrite' => array('slug' => 'performance-category'),
    );
    
    register_taxonomy('performance_category', array('performance'), $perf_cat_args);

    // Project Type
    $project_type_labels = array(
        'name' => _x('Project Types', 'Taxonomy General Name', 'maysternya'),
        'singular_name' => _x('Project Type', 'Taxonomy Singular Name', 'maysternya'),
        'menu_name' => __('Project Types', 'maysternya'),
    );
    
    $project_type_args = array(
        'labels' => $project_type_labels,
        'hierarchical' => true,
        'public' => true,
        'show_ui' => true,
        'show_admin_column' => true,
        'show_in_nav_menus' => true,
        'show_in_rest' => true,
        'rewrite' => array('slug' => 'project-type'),
    );
    
    register_taxonomy('project_type', array('project'), $project_type_args);
}
add_action('init', 'maysternya_register_taxonomies');

/**
 * Add Custom Meta Boxes for Performances
 */
function maysternya_add_performance_meta_boxes() {
    add_meta_box(
        'performance_details',
        __('Performance Details', 'maysternya'),
        'maysternya_performance_details_callback',
        'performance',
        'normal',
        'high'
    );
}
add_action('add_meta_boxes', 'maysternya_add_performance_meta_boxes');

function maysternya_performance_details_callback($post) {
    wp_nonce_field('maysternya_performance_details', 'maysternya_performance_nonce');
    
    $performance_date = get_post_meta($post->ID, '_performance_date', true);
    $performance_time = get_post_meta($post->ID, '_performance_time', true);
    $performance_author = get_post_meta($post->ID, '_performance_author', true);
    $performance_venue = get_post_meta($post->ID, '_performance_venue', true);
    $ticket_link = get_post_meta($post->ID, '_ticket_link', true);
    ?>
    <div class="maysternya-meta-box">
        <p>
            <label for="performance_date"><strong><?php _e('Performance Date', 'maysternya'); ?></strong></label><br>
            <input type="date" id="performance_date" name="performance_date" value="<?php echo esc_attr($performance_date); ?>" class="widefat">
        </p>
        <p>
            <label for="performance_time"><strong><?php _e('Performance Time', 'maysternya'); ?></strong></label><br>
            <input type="time" id="performance_time" name="performance_time" value="<?php echo esc_attr($performance_time); ?>" class="widefat">
        </p>
        <p>
            <label for="performance_author"><strong><?php _e('Author/Playwright', 'maysternya'); ?></strong></label><br>
            <input type="text" id="performance_author" name="performance_author" value="<?php echo esc_attr($performance_author); ?>" class="widefat" placeholder="<?php _e('e.g., A.P. Chekhov', 'maysternya'); ?>">
        </p>
        <p>
            <label for="performance_venue"><strong><?php _e('Venue', 'maysternya'); ?></strong></label><br>
            <input type="text" id="performance_venue" name="performance_venue" value="<?php echo esc_attr($performance_venue); ?>" class="widefat">
        </p>
        <p>
            <label for="ticket_link"><strong><?php _e('Ticket Link', 'maysternya'); ?></strong></label><br>
            <input type="url" id="ticket_link" name="ticket_link" value="<?php echo esc_url($ticket_link); ?>" class="widefat" placeholder="https://...">
        </p>
    </div>
    <?php
}

function maysternya_save_performance_meta($post_id) {
    if (!isset($_POST['maysternya_performance_nonce']) || 
        !wp_verify_nonce($_POST['maysternya_performance_nonce'], 'maysternya_performance_details')) {
        return;
    }
    
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }
    
    if (!current_user_can('edit_post', $post_id)) {
        return;
    }
    
    $fields = array(
        'performance_date' => '_performance_date',
        'performance_time' => '_performance_time',
        'performance_author' => '_performance_author',
        'performance_venue' => '_performance_venue',
        'ticket_link' => '_ticket_link',
    );
    
    foreach ($fields as $field => $meta_key) {
        if (isset($_POST[$field])) {
            update_post_meta($post_id, $meta_key, sanitize_text_field($_POST[$field]));
        }
    }
}
add_action('save_post_performance', 'maysternya_save_performance_meta');

/**
 * Add Custom Meta Boxes for Team Members
 */
function maysternya_add_team_meta_boxes() {
    add_meta_box(
        'team_member_details',
        __('Team Member Details', 'maysternya'),
        'maysternya_team_member_details_callback',
        'team_member',
        'normal',
        'high'
    );
}
add_action('add_meta_boxes', 'maysternya_add_team_meta_boxes');

function maysternya_team_member_details_callback($post) {
    wp_nonce_field('maysternya_team_member_details', 'maysternya_team_nonce');
    
    $role = get_post_meta($post->ID, '_team_role', true);
    ?>
    <div class="maysternya-meta-box">
        <p>
            <label for="team_role"><strong><?php _e('Role/Position', 'maysternya'); ?></strong></label><br>
            <input type="text" id="team_role" name="team_role" value="<?php echo esc_attr($role); ?>" class="widefat" placeholder="<?php _e('e.g., Director, Actor', 'maysternya'); ?>">
        </p>
    </div>
    <?php
}

function maysternya_save_team_meta($post_id) {
    if (!isset($_POST['maysternya_team_nonce']) || 
        !wp_verify_nonce($_POST['maysternya_team_nonce'], 'maysternya_team_member_details')) {
        return;
    }
    
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }
    
    if (!current_user_can('edit_post', $post_id)) {
        return;
    }
    
    if (isset($_POST['team_role'])) {
        update_post_meta($post_id, '_team_role', sanitize_text_field($_POST['team_role']));
    }
}
add_action('save_post_team_member', 'maysternya_save_team_meta');
