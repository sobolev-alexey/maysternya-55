<?php
/**
 * Front Page Template - Exact Match to Figma Design
 *
 * @package Maysternya
 */

get_header();
?>

<!-- Hero Section -->
<section class="hero-section">
    <div class="hero-background">
        <img src="https://placehold.co/1920x1080/1a1a2e/1a1a2e.png" alt="">
        <div class="hero-overlay"></div>
    </div>
    <div class="hero-content">
        <h1 class="hero-title">IN<br>THEATRE<br>WE TRUST</h1>
        <a href="<?php echo esc_url(get_post_type_archive_link('performance')); ?>" class="btn btn-primary">GO TO PERFORMANCES</a>
    </div>
</section>

<!-- Projects Section -->
<section class="projects-section">
    <div class="container">
        <div class="section-header">
            <h2 class="section-title">PROJECTS</h2>
        </div>

        <div class="projects-grid">
            <?php
            // Project data matching design exactly
            $projects = array(
                array(
                    'title' => "FLIPT\nFESTIVAL",
                    'location' => 'FARA-IN-SABINA',
                    'link' => '#',
                    'color' => '2a3a5a',
                ),
                array(
                    'title' => "THREE\nSISTERS",
                    'author' => 'A.P Chekhov',
                    'director' => 'Director: Leonid Sadovsky',
                    'link' => '#',
                    'color' => '1a1a2e',
                ),
                array(
                    'title' => 'FIVE MINUTES TO ZERO',
                    'author' => 'J. Soyref',
                    'director' => 'Director: Leonid Sadovsky',
                    'link' => '#',
                    'color' => '0a0a1a',
                ),
                array(
                    'title' => "ZUKUNF/ST\nFESTIVAL",
                    'location' => 'BERLIN',
                    'link' => '#',
                    'color' => '1a3a5c',
                ),
            );

            foreach ($projects as $project) :
            ?>
            <article class="project-card">
                <a href="<?php echo esc_url($project['link']); ?>">
                    <!-- Square Image with text ON TOP -->
                    <div class="project-image-wrapper">
                        <img src="https://placehold.co/600x600/<?php echo $project['color']; ?>/<?php echo $project['color']; ?>.png" alt="">
                        <div class="project-overlay">
                            <span class="project-badge">MAYSTERNYA 55</span>
                            <h3 class="project-title"><?php echo nl2br(esc_html($project['title'])); ?></h3>
                        </div>
                    </div>
                    <!-- Meta text BELOW image, right-aligned -->
                    <div class="project-meta">
                        <?php if (!empty($project['location'])) : ?>
                        <p class="project-location"><?php echo esc_html($project['location']); ?></p>
                        <?php endif; ?>
                        <?php if (!empty($project['author'])) : ?>
                        <p><?php echo esc_html($project['author']); ?></p>
                        <?php endif; ?>
                        <?php if (!empty($project['director'])) : ?>
                        <p><?php echo esc_html($project['director']); ?></p>
                        <?php endif; ?>
                    </div>
                </a>
            </article>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<!-- Events Section - 3 Columns -->
<section class="events-section">
    <div class="container">
        <div class="section-header">
            <h2 class="section-title">EVENTS</h2>
        </div>

        <div class="events-list">
            <?php
            // Events data matching design exactly
            $events = array(
                array(
                    'date' => '11/03',
                    'time' => '2:30pm',
                    'title' => "THREE\nSISTERS",
                    'author' => 'A.P. Chekhov',
                    'director' => 'Director: Leonid Sadovsky',
                    'color' => '2a2a3e',
                ),
                array(
                    'date' => '18/03',
                    'time' => '8:30pm',
                    'title' => "FIVE MINUTES\nTO ZERO",
                    'author' => 'J.Soyref',
                    'director' => 'Director: Leonid Sadovsky',
                    'color' => '1a1a2e',
                ),
                array(
                    'date' => '27/04',
                    'time' => '6:30pm',
                    'title' => "JESUS CRIST\nSUPERSTAR",
                    'author' => 'A.Webber and T. Rice',
                    'director' => 'Director: Leonid Sadovsky',
                    'color' => '3a2a4e',
                ),
            );

            foreach ($events as $event) :
            ?>
            <article class="event-card">
                <!-- Column 1: Date, Time, Label -->
                <div class="event-col-date">
                    <span class="event-day"><?php echo esc_html($event['date']); ?></span>
                    <span class="event-time"><?php echo esc_html($event['time']); ?></span>
                    <span class="event-type">PERFORMANCE</span>
                </div>
                
                <!-- Column 2: Author, Title, Director -->
                <div class="event-col-content">
                    <p class="event-author">Author: <?php echo esc_html($event['author']); ?></p>
                    <h3 class="event-title"><?php echo nl2br(esc_html($event['title'])); ?></h3>
                    <p class="event-director"><?php echo esc_html($event['director']); ?></p>
                </div>
                
                <!-- Column 3: Image -->
                <div class="event-col-image">
                    <img src="https://placehold.co/400x400/<?php echo $event['color']; ?>/<?php echo $event['color']; ?>.png" alt="">
                </div>
            </article>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<!-- About Us Section -->
<section class="about-section">
    <!-- Hero Image with centered text and CTA -->
    <div class="about-hero">
        <div class="about-hero-bg">
            <img src="https://placehold.co/1920x900/1a2a3e/1a2a3e.png" alt="">
            <div class="about-hero-overlay"></div>
        </div>
        <div class="about-hero-content">
            <span class="about-label">ABOUT US</span>
            <h2 class="about-hero-title">MORE THAN A<br>THEATRE</h2>
            <a href="<?php echo esc_url(home_url('/about')); ?>" class="btn btn-outline">LEARN MORE ABOUT US</a>
        </div>
    </div>
    
    <!-- Content Below: Title + Two Paragraphs -->
    <div class="about-content">
        <div class="container">
            <div class="about-inner">
                <div class="about-tagline">
                    MAYSTERNYA 55 –<br>
                    INDEPENDENT UKRAINIAN<br>
                    THEATRE WITH<br>
                    INTERNATIONAL ACTIVITIES<br>
                    AND ITS OWN UNIQUE METHOD.
                </div>
                <div class="about-description">
                    <p>Founded in 2006 in Kharkiv by director and teacher Leonid Sadovsky, the theater grew out of an author's acting course at the I. P. Kotlyarevsky Kharkiv National University of Arts. It is based on a unique method that combines dramatic theater with modern performative practices, the depth of psychological theater with the expressiveness of the body, and performances with educational projects.</p>
                    <p>Today "MAYSTERNYA 55" is more than a theater. It is a laboratory where classics and modernity, traditions and innovations, content and form, feelings and thoughts meet. It is a space for creative search, experimentation and love. It is a theater about the idea that lives in people, and about people who live by this idea.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<?php get_footer(); ?>
