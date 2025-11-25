<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="profile" href="https://gmpg.org/xfn/11">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<header class="site-header" id="site-header" data-testid="site-header">
    <div class="header-inner">
        <!-- Logo -->
        <a href="<?php echo esc_url(home_url('/')); ?>" class="site-logo" data-testid="site-logo">
            <?php if (has_custom_logo()) : ?>
                <?php the_custom_logo(); ?>
            <?php else : ?>
                <div class="logo-icon">
                    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 8L20 32L32 8" stroke="currentColor" stroke-width="2"/>
                        <path d="M14 20H26" stroke="currentColor" stroke-width="2"/>
                    </svg>
                </div>
                <span>MAYSTERNYA</span>
            <?php endif; ?>
        </a>

        <!-- Desktop Navigation -->
        <nav class="main-nav" data-testid="main-navigation">
            <?php
            if (has_nav_menu('primary')) {
                wp_nav_menu(array(
                    'theme_location' => 'primary',
                    'menu_class' => 'nav-menu',
                    'container' => false,
                    'walker' => new Maysternya_Nav_Walker(),
                ));
            } else {
                // Default menu if none is set
                ?>
                <ul class="nav-menu">
                    <li class="nav-item menu-item-has-children">
                        <a href="#" class="nav-link">About Us <span class="arrow">▼</span></a>
                        <ul class="dropdown-menu">
                            <li><a href="<?php echo esc_url(home_url('/founder')); ?>" class="dropdown-item">Founder</a></li>
                            <li><a href="<?php echo esc_url(home_url('/history')); ?>" class="dropdown-item">History</a></li>
                            <li><a href="<?php echo esc_url(home_url('/international-projects')); ?>" class="dropdown-item">International Projects</a></li>
                            <li><a href="<?php echo esc_url(home_url('/team')); ?>" class="dropdown-item">Team</a></li>
                            <li><a href="<?php echo esc_url(home_url('/manifesto')); ?>" class="dropdown-item">Manifesto</a></li>
                        </ul>
                    </li>
                    <li class="nav-item">
                        <a href="<?php echo esc_url(get_post_type_archive_link('performance')); ?>" class="nav-link">On Stage</a>
                    </li>
                    <li class="nav-item menu-item-has-children">
                        <a href="#" class="nav-link">Archive <span class="arrow">▼</span></a>
                        <ul class="dropdown-menu">
                            <li><a href="<?php echo esc_url(home_url('/performances')); ?>" class="dropdown-item">Performances</a></li>
                            <li><a href="<?php echo esc_url(home_url('/educational-projects')); ?>" class="dropdown-item">Educational Projects</a></li>
                        </ul>
                    </li>
                    <li class="nav-item">
                        <a href="#" class="nav-link contact-trigger" data-testid="contact-trigger">Contacts</a>
                    </li>
                    <li class="nav-item">
                        <a href="<?php echo esc_url(home_url('/support-us')); ?>" class="nav-link">Support Us</a>
                    </li>
                </ul>
                <?php
            }
            ?>
        </nav>

        <!-- Header Actions (Social & Language) -->
        <div class="header-actions">
            <?php maysternya_social_links('social-links'); ?>
            <div class="lang-selector" data-testid="language-selector">
                <img src="<?php echo MAYSTERNYA_URI; ?>/images/flag-uk.svg" alt="English">
                <span class="arrow">▼</span>
            </div>
        </div>

        <!-- Mobile Menu Toggle -->
        <button class="mobile-menu-toggle" id="mobile-menu-toggle" aria-label="<?php esc_attr_e('Toggle menu', 'maysternya'); ?>" data-testid="mobile-menu-toggle">
            <span></span>
            <span></span>
            <span></span>
        </button>
    </div>
</header>

<!-- Mobile Menu -->
<div class="mobile-menu" id="mobile-menu" data-testid="mobile-menu">
    <nav class="mobile-nav">
        <ul class="mobile-nav-menu">
            <li class="mobile-nav-item has-dropdown">
                <a href="#" class="mobile-nav-link">About Us <span class="arrow">▼</span></a>
                <div class="mobile-dropdown">
                    <a href="<?php echo esc_url(home_url('/founder')); ?>" class="mobile-dropdown-item">Founder</a>
                    <a href="<?php echo esc_url(home_url('/history')); ?>" class="mobile-dropdown-item">History</a>
                    <a href="<?php echo esc_url(home_url('/international-projects')); ?>" class="mobile-dropdown-item">International Projects</a>
                    <a href="<?php echo esc_url(home_url('/team')); ?>" class="mobile-dropdown-item">Team</a>
                    <a href="<?php echo esc_url(home_url('/manifesto')); ?>" class="mobile-dropdown-item">Manifesto</a>
                </div>
            </li>
            <li class="mobile-nav-item">
                <a href="<?php echo esc_url(get_post_type_archive_link('performance')); ?>" class="mobile-nav-link">On Stage</a>
            </li>
            <li class="mobile-nav-item has-dropdown">
                <a href="#" class="mobile-nav-link">Archive <span class="arrow">▼</span></a>
                <div class="mobile-dropdown">
                    <a href="<?php echo esc_url(home_url('/performances')); ?>" class="mobile-dropdown-item">Performances</a>
                    <a href="<?php echo esc_url(home_url('/educational-projects')); ?>" class="mobile-dropdown-item">Educational Projects</a>
                </div>
            </li>
            <li class="mobile-nav-item">
                <a href="#" class="mobile-nav-link contact-trigger">Contacts</a>
            </li>
            <li class="mobile-nav-item">
                <a href="<?php echo esc_url(home_url('/support-us')); ?>" class="mobile-nav-link">Support Us</a>
            </li>
        </ul>
        <div class="mobile-social">
            <?php maysternya_social_links('social-links'); ?>
        </div>
    </nav>
</div>

<!-- Contact Modal -->
<div class="contact-modal" id="contact-modal" data-testid="contact-modal">
    <div class="modal-backdrop"></div>
    <div class="modal-content">
        <button class="modal-close" id="modal-close" aria-label="<?php esc_attr_e('Close', 'maysternya'); ?>">&times;</button>
        <h2 class="modal-title">GET IN TOUCH</h2>
        <?php 
        $phone = get_theme_mod('contact_phone', '+380950000000');
        $email = get_theme_mod('contact_email', 'maysternya55@gmail.com');
        ?>
        <div class="modal-contact-item">
            <a href="tel:<?php echo esc_attr($phone); ?>" class="modal-contact-value"><?php echo esc_html($phone); ?></a>
        </div>
        <div class="modal-contact-item">
            <a href="mailto:<?php echo esc_attr($email); ?>" class="modal-contact-value"><?php echo esc_html($email); ?></a>
        </div>
        <p class="modal-label">Social media:</p>
        <div class="modal-social">
            <?php 
            $social = maysternya_get_social_links();
            $icons = array(
                'telegram' => '<svg viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>',
                'facebook' => '<svg viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>',
                'instagram' => '<svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>',
            );
            foreach ($social as $network => $url) {
                if (!empty($url) && isset($icons[$network])) {
                    printf(
                        '<a href="%s" class="modal-social-link" target="_blank" rel="noopener noreferrer">%s</a>',
                        esc_url($url),
                        $icons[$network]
                    );
                }
            }
            ?>
        </div>
    </div>
</div>

<main id="main" class="site-main">
