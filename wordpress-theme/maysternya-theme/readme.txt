Theme: Maysternya 55 Theatre
Version: 2.0.0

A custom WordPress theme designed for Maysternya 55 Theatre based on Figma design.
Features pixel-perfect design with custom Gutenberg blocks for flexible content creation.

== INSTALLATION ==

1. Upload the 'maysternya-theme' folder to /wp-content/themes/
2. Activate the theme through Appearance > Themes in WordPress admin
3. Build Gutenberg blocks: cd blocks && npm install && npm run build
4. Go to Appearance > Customize to configure theme settings
5. Go to Appearance > Menus to set up navigation menus

See docs/INSTALLATION.md for detailed instructions.

== FEATURES ==

- Pixel-perfect design matching Figma screenshots
- Responsive design (mobile-first)
- 17 Custom Gutenberg Blocks
- Custom post types: Performances, Projects, Team Members
- Custom navigation with dropdown support
- Language selector (UK, German, Ukrainian flags)
- Social media integration
- Theme Customizer options

== CUSTOM GUTENBERG BLOCKS ==

All blocks are available under "Maysternya 55" category in the editor:

Layout & Hero:
- Banner - Full-width hero with image, text, CTA
- Full Width Image - Edge-to-edge image display

Text & Headings:
- Section Separator - Section divider with headline and line
- Headline + Subline - Large heading with optional subline
- Text Block - Flexible text with column options

Image Blocks:
- Image + Text Inside - Image with text overlay
- Image Grid - Two images side by side
- Small Image Grid - Multi-image grid
- Image + Icon - Image with icon overlay
- Image + Subline - Image with caption

Content Cards:
- Project Card - Square project display card
- Event Card - Event listing with date/time
- Project Landing Card - Large featured project card
- Educational Project Card - Educational project display
- Project Compact - Horizontal compact listing

Mixed Content:
- Text + Image - Two-column text/image layout
- Carousel - Image/content slider

See docs/CONTENT-CREATOR-GUIDE.md for usage instructions.

== PAGE TEMPLATES ==

All pages use Gutenberg blocks for content:
- Front Page
- Founder Page
- Team Page
- Contact Page
- Support Us Page
- History Page
- Manifesto Page
- Educational Projects Page
- International Projects Page

== MENU LOCATIONS ==

1. Primary Menu - Main header navigation
2. Footer Menu - Footer navigation
3. Mobile Menu - Mobile navigation

== CUSTOMIZER SETTINGS ==

1. Contact Information
   - Phone Number
   - Email Address
   - Address

2. Social Media Links
   - Facebook URL
   - Instagram URL
   - YouTube URL
   - Telegram URL

3. Hero Section
   - Hero Title
   - Hero Button Text
   - Hero Button Link
   - Hero Background Image

4. Footer Settings
   - Footer Description
   - Copyright Text

== CREATING PAGES ==

To use custom page templates:
1. Create a new page in WordPress
2. In the Page Attributes box, select the desired template from the Template dropdown
3. Publish the page

== ADDING PERFORMANCES ==

1. Go to Performances > Add New
2. Enter the title (performance name)
3. Fill in Performance Details:
   - Performance Date
   - Performance Time
   - Author/Playwright
   - Venue
   - Ticket Link
4. Add featured image
5. Publish

== ADDING PROJECTS ==

1. Go to Projects > Add New
2. Enter the project title
3. Add content and featured image
4. Assign Project Type if needed
5. Publish

== ADDING TEAM MEMBERS ==

1. Go to Team > Add New
2. Enter team member name as title
3. Fill in Team Member Details:
   - Role/Position
4. Add featured image (member photo)
5. Publish

== SUPPORT ==

For support and customization inquiries, please contact the development team.
