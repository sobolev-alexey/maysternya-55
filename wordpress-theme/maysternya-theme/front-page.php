<?php
/**
 * Front Page Template - Exact Match to Figma Design
 *
 * @package Maysternya
 */

get_header();
?>

<!-- Hero Section -->
<section class="hero-section" data-testid="hero-section">
    <?php 
    $hero_bg = get_theme_mod('hero_background', '');
    ?>
    <div class="hero-background">
        <?php if ($hero_bg) : ?>
        <img src="<?php echo esc_url($hero_bg); ?>" alt="" class="hero-bg-image" loading="eager">
        <?php else : ?>
        <img src="https://placehold.co/1920x1080/1a1a2e/1a1a2e.png" alt="" class="hero-bg-image" loading="eager">
        <?php endif; ?>
        <div class="hero-overlay"></div>
    </div>
    
    <div class="hero-content">
        <h1 class="hero-title" data-testid="hero-title">
            IN<br>THEATRE<br>WE TRUST
        </h1>
        <a href="<?php echo esc_url(get_theme_mod('hero_button_link', get_post_type_archive_link('performance'))); ?>" class="btn btn-primary" data-testid="hero-cta">
            <?php echo esc_html(get_theme_mod('hero_button_text', 'GO TO PERFORMANCES')); ?>
        </a>
    </div>
</section>

<!-- Projects Section -->
<section class="projects-section" data-testid="projects-section">
    <div class="container">
        <div class="section-header">
            <h2 class="section-title"><?php _e('PROJECTS', 'maysternya'); ?></h2>
            <span class="section-subtitle"><?php _e('MAYSTERNYA 55', 'maysternya'); ?></span>
        </div>

        <div class="projects-grid">
            <?php
            $projects = new WP_Query(array(
                'post_type' => 'project',
                'posts_per_page' => 4,
                'orderby' => 'date',
                'order' => 'DESC',
            ));

            if ($projects->have_posts()) :
                while ($projects->have_posts()) : $projects->the_post();
                    $author = get_post_meta(get_the_ID(), '_project_author', true);
                    $director = get_post_meta(get_the_ID(), '_project_director', true);
                    $location = get_post_meta(get_the_ID(), '_project_location', true);
                    ?>
                    <article class="project-card" data-testid="project-card">
                        <div class="project-image">
                            <?php if (has_post_thumbnail()) : ?>
                                <?php the_post_thumbnail('project-card'); ?>
                            <?php else : ?>
                                <img src="https://placehold.co/600x600/1a1a2e/1a1a2e.png" alt="<?php the_title_attribute(); ?>">
                            <?php endif; ?>
                            <div class="project-overlay">
                                <span class="project-badge"><?php _e('MAYSTERNYA 55', 'maysternya'); ?></span>
                                <h3 class="project-title"><?php the_title(); ?></h3>
                                <?php if ($author) : ?>
                                <p class="project-author"><?php echo esc_html($author); ?></p>
                                <?php endif; ?>
                                <?php if ($director) : ?>
                                <p class="project-director"><?php echo esc_html($director); ?></p>
                                <?php endif; ?>
                                <?php if ($location) : ?>
                                <p class="project-location"><?php echo esc_html($location); ?></p>
                                <?php endif; ?>
                                <a href="<?php the_permalink(); ?>" class="btn btn-secondary"><?php _e('LEARN MORE', 'maysternya'); ?></a>
                            </div>
                        </div>
                    </article>
                    <?php
                endwhile;
                wp_reset_postdata();
            else :
                // Default placeholder projects matching Figma design - SQUARE images
                $placeholder_projects = array(
                    array(
                        'title' => "FLIPT\nFESTIVAL",
                        'location' => 'FARA-IN-SABINA',
                        'color' => '2a3a5a',
                    ),
                    array(
                        'title' => "THREE\nSISTERS",
                        'author' => 'A.P Chekhov',
                        'director' => 'Director: Leonid Sadovsky',
                        'color' => '1a1a2e',
                    ),
                    array(
                        'title' => 'FIVE MINUTES TO ZERO',
                        'author' => 'J.Soyref',
                        'director' => 'Director: Leonid Sadovsky',
                        'color' => '0a0a1a',
                    ),
                    array(
                        'title' => "ZUKUNF/ST\nFESTIVAL",
                        'location' => 'BERLIN',
                        'color' => '1a3a5c',
                    ),
                );

                foreach ($placeholder_projects as $project) :
            ?>
                <article class="project-card" data-testid="project-card-placeholder">
                    <div class="project-image">
                        <img src="https://placehold.co/600x600/<?php echo $project['color']; ?>/<?php echo $project['color']; ?>.png" alt="<?php echo esc_attr(str_replace("\n", ' ', $project['title'])); ?>">
                        <div class="project-overlay">
                            <span class="project-badge"><?php _e('MAYSTERNYA 55', 'maysternya'); ?></span>
                            <h3 class="project-title"><?php echo nl2br(esc_html($project['title'])); ?></h3>
                            <?php if (!empty($project['author'])) : ?>
                            <p class="project-author"><?php echo esc_html($project['author']); ?></p>
                            <?php endif; ?>
                            <?php if (!empty($project['director'])) : ?>
                            <p class="project-director"><?php echo esc_html($project['director']); ?></p>
                            <?php endif; ?>
                            <?php if (!empty($project['location'])) : ?>
                            <p class="project-location"><?php echo esc_html($project['location']); ?></p>
                            <?php endif; ?>
                            <a href="#" class="btn btn-secondary"><?php _e('LEARN MORE', 'maysternya'); ?></a>
                        </div>
                    </div>
                </article>
            <?php
                endforeach;
            endif;
            ?>
        </div>
    </div>
</section>

<!-- Events Section -->
<section class="events-section" data-testid="events-section">
    <div class="container">
        <div class="section-header">
            <h2 class="section-title"><?php _e('EVENTS', 'maysternya'); ?></h2>
        </div>

        <div class="events-list">
            <?php
            $performances = new WP_Query(array(
                'post_type' => 'performance',
                'posts_per_page' => 3,
                'meta_key' => '_performance_date',
                'orderby' => 'meta_value',
                'order' => 'ASC',
            ));

            if ($performances->have_posts()) :
                while ($performances->have_posts()) : $performances->the_post();
                    $date = get_post_meta(get_the_ID(), '_performance_date', true);
                    $time = get_post_meta(get_the_ID(), '_performance_time', true);
                    $author = get_post_meta(get_the_ID(), '_performance_author', true);
                    $ticket_link = get_post_meta(get_the_ID(), '_ticket_link', true);
                    
                    if ($date) {
                        $date_obj = new DateTime($date);
                        $formatted_date = $date_obj->format('d/m');
                    } else {
                        $formatted_date = '--/--';
                    }
                    ?>
                    <article class="event-card" data-testid="event-card">
                        <div class="event-date">
                            <span class="event-day"><?php echo esc_html($formatted_date); ?></span>
                            <span class="event-time"><?php echo esc_html($time ?: '7:00pm'); ?></span>
                        </div>
                        <div class="event-content">
                            <span class="event-type"><?php _e('PERFORMANCE', 'maysternya'); ?></span>
                            <h3 class="event-title"><?php the_title(); ?></h3>
                            <?php if ($author) : ?>
                            <p class="event-author"><?php printf(__('Author: %s', 'maysternya'), esc_html($author)); ?></p>
                            <?php endif; ?>
                            <p class="event-director"><?php _e('Director: Leonid Sadovsky', 'maysternya'); ?></p>
                        </div>
                        <div class="event-image">
                            <?php if (has_post_thumbnail()) : ?>
                                <?php the_post_thumbnail('thumbnail'); ?>
                            <?php else : ?>
                                <img src="https://placehold.co/400x400/1a1a2e/1a1a2e.png" alt="<?php the_title_attribute(); ?>">
                            <?php endif; ?>
                        </div>
                        <div class="event-action">
                            <a href="<?php echo esc_url($ticket_link ?: get_permalink()); ?>" class="btn btn-dark"><?php _e('BUY TICKETS', 'maysternya'); ?></a>
                        </div>
                    </article>
                    <?php
                endwhile;
                wp_reset_postdata();
            else :
                // Default placeholder events matching Figma design
                $placeholder_events = array(
                    array(
                        'date' => '11/03',
                        'time' => '2:30pm',
                        'title' => "THREE\nSISTERS",
                        'author' => 'A.P. Chekhov',
                        'color' => '2a2a3e',
                    ),
                    array(
                        'date' => '18/03',
                        'time' => '8:30pm',
                        'title' => "FIVE MINUTES\nTO ZERO",
                        'author' => 'J.Soyref',
                        'color' => '1a1a2e',
                    ),
                    array(
                        'date' => '27/04',
                        'time' => '6:30pm',
                        'title' => "JESUS CRIST\nSUPERSTAR",
                        'author' => 'A.Webber and T. Rice',
                        'color' => '3a2a4e',
                    ),
                );

                foreach ($placeholder_events as $event) :
            ?>
                <article class="event-card" data-testid="event-card-placeholder">
                    <div class="event-date">
                        <span class="event-day"><?php echo esc_html($event['date']); ?></span>
                        <span class="event-time"><?php echo esc_html($event['time']); ?></span>
                    </div>
                    <div class="event-content">
                        <span class="event-type"><?php _e('PERFORMANCE', 'maysternya'); ?></span>
                        <h3 class="event-title"><?php echo nl2br(esc_html($event['title'])); ?></h3>
                        <p class="event-author"><?php printf(__('Author: %s', 'maysternya'), esc_html($event['author'])); ?></p>
                        <p class="event-director"><?php _e('Director: Leonid Sadovsky', 'maysternya'); ?></p>
                    </div>
                    <div class="event-image">
                        <img src="https://placehold.co/400x400/<?php echo $event['color']; ?>/<?php echo $event['color']; ?>.png" alt="<?php echo esc_attr(str_replace("\n", ' ', $event['title'])); ?>">
                    </div>
                    <div class="event-action">
                        <a href="#" class="btn btn-dark"><?php _e('BUY TICKETS', 'maysternya'); ?></a>
                    </div>
                </article>
            <?php
                endforeach;
            endif;
            ?>
        </div>
    </div>
</section>

<!-- About Us Section -->
<section class="about-section" data-testid="about-section">
    <div class="about-hero">
        <div class="about-hero-background">
            <?php 
            $about_bg = get_theme_mod('about_background', '');
            if ($about_bg) : 
            ?>
            <img src="<?php echo esc_url($about_bg); ?>" alt="<?php _e('About Us', 'maysternya'); ?>">
            <?php else : ?>
            <img src="https://placehold.co/1920x800/1a2a3e/1a2a3e.png" alt="<?php _e('About Us', 'maysternya'); ?>">
            <?php endif; ?>
            <div class="about-hero-overlay"></div>
        </div>
        <div class="container">
            <div class="about-hero-content">
                <span class="about-pretitle"><?php _e('ABOUT US', 'maysternya'); ?></span>
                <h2 class="about-hero-title"><?php _e('MORE THAN A', 'maysternya'); ?><br><?php _e('THEATRE', 'maysternya'); ?></h2>
            </div>
        </div>
    </div>
    
    <div class="container">
        <div class="about-content">
            <div class="about-intro">
                <p class="about-tagline">
                    <?php _e('MAYSTERNYA 55 –', 'maysternya'); ?><br>
                    <?php _e('INDEPENDENT UKRAINIAN', 'maysternya'); ?><br>
                    <?php _e('THEATRE WITH', 'maysternya'); ?><br>
                    <?php _e('INTERNATIONAL ACTIVITIES', 'maysternya'); ?><br>
                    <?php _e('AND ITS OWN UNIQUE METHOD.', 'maysternya'); ?>
                </p>
            </div>
            <div class="about-description">
                <p><?php _e('Founded in 2006 in Kharkiv by director and teacher Leonid Sadovsky, the theater grew out of an author\'s acting course at the I. P. Kotlyarevsky Kharkiv National University of Arts. It is based on a unique method that combines dramatic theater with modern performative practices, the depth of psychological theater with the expressiveness of the body, and performances with educational projects.', 'maysternya'); ?></p>
                <p><?php _e('Today "MAYSTERNYA 55" is more than a theater. It is a laboratory where classics and modernity, traditions and innovations, content and form, feelings and thoughts meet. It is a space for creative search, experimentation and love. It is a theater about the idea that lives in people, and about people who live by this idea.', 'maysternya'); ?></p>
            </div>
        </div>
    </div>
</section>

<?php get_footer(); ?>
