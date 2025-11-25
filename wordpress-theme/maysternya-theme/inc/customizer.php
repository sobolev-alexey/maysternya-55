<?php
/**
 * Theme Customizer
 *
 * @package Maysternya
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Add customizer options
 */
function maysternya_customize_register($wp_customize) {
    
    // ==========================================
    // Contact Information Section
    // ==========================================
    $wp_customize->add_section('maysternya_contact', array(
        'title' => __('Contact Information', 'maysternya'),
        'priority' => 30,
    ));

    // Phone Number
    $wp_customize->add_setting('contact_phone', array(
        'default' => '+380950000000',
        'sanitize_callback' => 'sanitize_text_field',
        'transport' => 'refresh',
    ));

    $wp_customize->add_control('contact_phone', array(
        'label' => __('Phone Number', 'maysternya'),
        'section' => 'maysternya_contact',
        'type' => 'text',
    ));

    // Email
    $wp_customize->add_setting('contact_email', array(
        'default' => 'maysternya55@gmail.com',
        'sanitize_callback' => 'sanitize_email',
        'transport' => 'refresh',
    ));

    $wp_customize->add_control('contact_email', array(
        'label' => __('Email Address', 'maysternya'),
        'section' => 'maysternya_contact',
        'type' => 'email',
    ));

    // Address
    $wp_customize->add_setting('contact_address', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_textarea_field',
        'transport' => 'refresh',
    ));

    $wp_customize->add_control('contact_address', array(
        'label' => __('Address', 'maysternya'),
        'section' => 'maysternya_contact',
        'type' => 'textarea',
    ));

    // ==========================================
    // Social Media Section
    // ==========================================
    $wp_customize->add_section('maysternya_social', array(
        'title' => __('Social Media Links', 'maysternya'),
        'priority' => 31,
    ));

    // Facebook
    $wp_customize->add_setting('social_facebook', array(
        'default' => '',
        'sanitize_callback' => 'esc_url_raw',
    ));

    $wp_customize->add_control('social_facebook', array(
        'label' => __('Facebook URL', 'maysternya'),
        'section' => 'maysternya_social',
        'type' => 'url',
    ));

    // Instagram
    $wp_customize->add_setting('social_instagram', array(
        'default' => '',
        'sanitize_callback' => 'esc_url_raw',
    ));

    $wp_customize->add_control('social_instagram', array(
        'label' => __('Instagram URL', 'maysternya'),
        'section' => 'maysternya_social',
        'type' => 'url',
    ));

    // YouTube
    $wp_customize->add_setting('social_youtube', array(
        'default' => '',
        'sanitize_callback' => 'esc_url_raw',
    ));

    $wp_customize->add_control('social_youtube', array(
        'label' => __('YouTube URL', 'maysternya'),
        'section' => 'maysternya_social',
        'type' => 'url',
    ));

    // Telegram
    $wp_customize->add_setting('social_telegram', array(
        'default' => '',
        'sanitize_callback' => 'esc_url_raw',
    ));

    $wp_customize->add_control('social_telegram', array(
        'label' => __('Telegram URL', 'maysternya'),
        'section' => 'maysternya_social',
        'type' => 'url',
    ));

    // ==========================================
    // Hero Section
    // ==========================================
    $wp_customize->add_section('maysternya_hero', array(
        'title' => __('Hero Section', 'maysternya'),
        'priority' => 32,
    ));

    // Hero Title
    $wp_customize->add_setting('hero_title', array(
        'default' => 'IN THEATRE WE TRUST',
        'sanitize_callback' => 'sanitize_text_field',
        'transport' => 'refresh',
    ));

    $wp_customize->add_control('hero_title', array(
        'label' => __('Hero Title', 'maysternya'),
        'section' => 'maysternya_hero',
        'type' => 'text',
    ));

    // Hero Button Text
    $wp_customize->add_setting('hero_button_text', array(
        'default' => 'GO TO PERFORMANCES',
        'sanitize_callback' => 'sanitize_text_field',
        'transport' => 'refresh',
    ));

    $wp_customize->add_control('hero_button_text', array(
        'label' => __('Hero Button Text', 'maysternya'),
        'section' => 'maysternya_hero',
        'type' => 'text',
    ));

    // Hero Button Link
    $wp_customize->add_setting('hero_button_link', array(
        'default' => '/performances',
        'sanitize_callback' => 'esc_url_raw',
        'transport' => 'refresh',
    ));

    $wp_customize->add_control('hero_button_link', array(
        'label' => __('Hero Button Link', 'maysternya'),
        'section' => 'maysternya_hero',
        'type' => 'url',
    ));

    // Hero Background Image
    $wp_customize->add_setting('hero_background', array(
        'default' => '',
        'sanitize_callback' => 'esc_url_raw',
    ));

    $wp_customize->add_control(new WP_Customize_Image_Control($wp_customize, 'hero_background', array(
        'label' => __('Hero Background Image', 'maysternya'),
        'section' => 'maysternya_hero',
    )));

    // ==========================================
    // Footer Section
    // ==========================================
    $wp_customize->add_section('maysternya_footer', array(
        'title' => __('Footer Settings', 'maysternya'),
        'priority' => 33,
    ));

    // Footer Description
    $wp_customize->add_setting('footer_description', array(
        'default' => 'Maysternya 55 is a contemporary theatre company founded in 2006, dedicated to experimental and innovative theatrical productions.',
        'sanitize_callback' => 'sanitize_textarea_field',
    ));

    $wp_customize->add_control('footer_description', array(
        'label' => __('Footer Description', 'maysternya'),
        'section' => 'maysternya_footer',
        'type' => 'textarea',
    ));

    // Copyright Text
    $wp_customize->add_setting('footer_copyright', array(
        'default' => '© ' . date('Y') . ' Maysternya 55. All rights reserved.',
        'sanitize_callback' => 'sanitize_text_field',
    ));

    $wp_customize->add_control('footer_copyright', array(
        'label' => __('Copyright Text', 'maysternya'),
        'section' => 'maysternya_footer',
        'type' => 'text',
    ));
}
add_action('customize_register', 'maysternya_customize_register');

/**
 * Selective refresh for customizer
 */
function maysternya_customize_preview_js() {
    wp_enqueue_script('maysternya-customizer', MAYSTERNYA_URI . '/js/customizer.js', array('customize-preview'), MAYSTERNYA_VERSION, true);
}
add_action('customize_preview_init', 'maysternya_customize_preview_js');
