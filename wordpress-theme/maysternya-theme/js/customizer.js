<?php
/**
 * Customizer JavaScript for live preview
 *
 * @package Maysternya
 */

(function($) {
    'use strict';

    // Hero title
    wp.customize('hero_title', function(value) {
        value.bind(function(to) {
            $('[data-testid="hero-title"]').text(to);
        });
    });

    // Hero button text
    wp.customize('hero_button_text', function(value) {
        value.bind(function(to) {
            $('[data-testid="hero-cta"]').text(to);
        });
    });

    // Footer copyright
    wp.customize('footer_copyright', function(value) {
        value.bind(function(to) {
            $('.footer-copyright').text(to);
        });
    });

})(jQuery);
