# Maysternya 55 Theme - Content Creator Guide

## Overview

This guide explains how to use the custom Gutenberg blocks to build page content in the Maysternya 55 WordPress theme.

## Available Blocks

All custom blocks are available in the WordPress editor under the **"Maysternya 55"** category.

### Layout & Hero Blocks

#### 1. Banner Block (`maysternya/banner`)
Full-width hero section with background image, text overlay, and optional CTA button.

**Settings:**
- **Background Image** - Upload or select from media library
- **Height** - Short (50vh), Medium (70vh), Full (100vh)
- **Overlay Intensity** - Light, Medium, Dark
- **Content Alignment** - Left, Center, Right
- **Headline** - Main title text (RichText)
- **Subheadline** - Secondary text (RichText)
- **CTA Button Text** - Button label (optional)
- **CTA Button URL** - Button link

**Usage:**
Best for homepage hero sections or page headers with impactful imagery.

---

#### 2. Full Width Image Block (`maysternya/full-width-image`)
Edge-to-edge image display with optional overlay text.

**Settings:**
- **Image** - Upload or select image
- **Height** - Auto, Short, Medium, Tall
- **Caption** - Optional caption text below image

---

### Text & Heading Blocks

#### 3. Section Separator Block (`maysternya/section-separator`)
Section divider with headline and full-width line underneath.

**Settings:**
- **Title** - Section heading text
- **Subtitle** - Optional text above line
- **Line Style** - Solid, Dashed
- **Alignment** - Left, Center

**Example:** "EVENTS" section header with white line stretching edge to edge.

---

#### 4. Headline + Subline Block (`maysternya/headline-subline`)
Large headline with optional subline text.

**Settings:**
- **Headline** - Main heading (RichText, supports H1-H6)
- **Subline** - Supporting text
- **Alignment** - Left, Center, Right
- **Size** - Small, Medium, Large, Extra Large

---

#### 5. Text Block (`maysternya/text-block`)
Flexible text content block with multiple column options.

**Settings:**
- **Content** - RichText content area
- **Columns** - 1, 2, or 3 columns
- **Width** - Full, Narrow (centered)
- **Alignment** - Left, Center, Justified

---

### Image Blocks

#### 6. Image + Text Inside Block (`maysternya/image-text-inside`)
Image with text overlay positioned at various locations.

**Settings:**
- **Image** - Background image
- **Title** - Overlay title (RichText)
- **Description** - Overlay description (RichText)
- **Text Position** - Top Left, Top Right, Bottom Left, Bottom Right, Center
- **CTA Button** - Optional button with text and URL
- **Show CTA on Mobile Only** - Toggle for mobile-specific CTA

---

#### 7. Image Grid Block (`maysternya/image-grid`)
Two images displayed side by side with optional captions.

**Settings:**
- **Left Image** - First image
- **Right Image** - Second image
- **Left Caption** - Caption for left image
- **Right Caption** - Caption for right image
- **Gap** - Small, Medium, Large

---

#### 8. Small Image Grid Block (`maysternya/small-image-grid`)
Grid of multiple smaller images.

**Settings:**
- **Images** - Multiple image selection
- **Columns** - 2, 3, 4, or 5 columns
- **Gap** - None, Small, Medium
- **Show Captions** - Toggle captions visibility

---

#### 9. Image + Icon Block (`maysternya/image-icon`)
Image with decorative icon overlay.

**Settings:**
- **Image** - Main image
- **Icon** - Select icon or upload
- **Icon Position** - Top Left, Top Right, Bottom Left, Bottom Right
- **Icon Size** - Small, Medium, Large

---

#### 10. Image + Subline Block (`maysternya/image-subline`)
Image with caption text displayed below.

**Settings:**
- **Image** - Main image
- **Caption** - Text below image (RichText)
- **Alignment** - Left, Center, Right

---

### Content Card Blocks

#### 11. Project Card Block (`maysternya/project-card`)
Square card for project displays with image, badge, title, and metadata.

**Settings:**
- **Image** - Project image (square recommended)
- **Badge** - Category badge text (e.g., "MAYSTERNYA 55")
- **Title** - Project title (supports multi-line)
- **Location** - Location text
- **Author** - Author information
- **Director** - Director information
- **Link** - Project detail page URL
- **Show Badge** - Toggle badge visibility
- **CTA Button** - Optional button (shows on hover on desktop, always on mobile)

---

#### 12. Event Card Block (`maysternya/event-card`)
Event listing with date, time, description, and image.

**Settings:**
- **Date** - Event date (e.g., "11/03")
- **Time** - Event time (e.g., "2:30pm")
- **Type** - Event type label (e.g., "PERFORMANCE")
- **Title** - Event title (RichText)
- **Author** - Author text
- **Director** - Director text
- **Image** - Event image
- **Link** - Event detail page URL

---

#### 13. Project Landing Card Block (`maysternya/project-landing-card`)
Large hero-style card for featured projects.

**Settings:**
- **Background Image** - Full background image
- **Badge** - Category badge
- **Title** - Large project title
- **Description** - Project description
- **CTA Button** - Call-to-action button

---

#### 14. Educational Project Card Block (`maysternya/educational-project-card`)
Card designed for educational project displays.

**Settings:**
- **Image** - Project image
- **Badge** - Status badge (e.g., "TEMPORARILY SUSPENDED")
- **Title** - Project title
- **Subtitle** - Project subtitle
- **Description** - Project description text
- **Link** - More info link

---

#### 15. Project Compact Block (`maysternya/project-compact`)
Horizontal compact project display for listing views.

**Settings:**
- **Image** - Thumbnail image
- **Title** - Project title
- **Subtitle** - Additional info
- **Link** - Project link
- **Arrow** - Show/hide arrow indicator

---

### Text + Image Blocks

#### 16. Text + Image Block (`maysternya/text-image`)
Two-column layout with text on one side and image on the other.

**Settings:**
- **Title** - Section title (RichText)
- **Content** - Text content (RichText)
- **Image** - Side image
- **Image Position** - Left or Right
- **Image Caption** - Optional caption

---

### Carousel Block

#### 17. Carousel Block (`maysternya/carousel`)
Image/content slider with navigation.

**Settings:**
- **Slides** - Add multiple slides (image + optional text per slide)
- **Autoplay** - Enable automatic slide progression
- **Interval** - Autoplay timing (milliseconds)
- **Show Dots** - Navigation dots
- **Show Arrows** - Navigation arrows

---

## Working with Blocks

### Adding a Block

1. In the WordPress editor, click the **+** button
2. Search for the block name or browse the **Maysternya 55** category
3. Click to insert the block
4. Configure settings in the right sidebar (Inspector Controls)

### Block Settings Panel

When a block is selected, settings appear in the right sidebar:
- **Block** tab - Block-specific settings
- **Advanced** tab - Additional CSS classes, anchor links

### RichText Fields

Many blocks include RichText fields that support:
- **Bold** / **Italic** / **Underline**
- **Links**
- **Font size adjustments** (via block settings)
- **Alignment** (left, center, right)

### Optional Elements

Some blocks have optional elements (like CTA buttons):
- Enable/disable in block settings
- Configure text, URL, and styling when enabled
- Some elements appear on hover (desktop) but always visible on mobile

---

## Building Pages

### Example: Home Page

1. Add **Banner Block** for hero section
2. Add **Section Separator** with "PROJECTS" title
3. Add multiple **Project Card** blocks (use columns or group block for layout)
4. Add **Section Separator** with "EVENTS" title
5. Add **Event Card** blocks for upcoming events
6. Add **Banner Block** for "About Us" teaser section
7. Add **Text Block** for description content

### Example: Project Page

1. Add **Project Landing Card** for project hero
2. Add **Text Block** with project description
3. Add **Image Grid** for project gallery
4. Add **Carousel** for additional images
5. Add **Section Separator** for related content

---

## Previewing Changes

### In Editor
- Use the **Preview** button (top right) to see desktop/tablet/mobile views
- Changes are shown in real-time in the editor

### Bypassing Cache

If changes don't appear on the frontend:

1. **WordPress Cache**: Clear via caching plugin (W3 Total Cache, WP Super Cache, etc.)
2. **Browser Cache**: Hard refresh with `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
3. **CDN Cache**: Purge via CDN dashboard if using Cloudflare, etc.

---

## Tips for Content Creators

### Images
- Use high-quality images (minimum 1200px wide for full-width)
- Maintain consistent aspect ratios within grids
- Optimize images before upload (use tools like TinyPNG)

### Text Formatting
- Use heading hierarchy (H1 once per page, then H2, H3, etc.)
- Keep paragraphs concise for readability
- Use white text on dark backgrounds (theme default)

### Responsive Design
- Preview all viewport sizes before publishing
- Some elements behave differently on mobile (CTAs, navigation)
- Test touch interactions for carousels

### Accessibility
- Always add alt text to images
- Use descriptive link text (not "click here")
- Maintain good color contrast (theme handles this automatically)

---

## Block Styling Reference

### Colors
- Background: `#000000` (black)
- Text: `#ffffff` (white)
- Borders: `#ffffff` (white)

### Fonts
- **KharkivTone** - Main headings, uppercase text
- **Jost** - Body text, subheadings

### Spacing
- Standard padding: 60px (desktop), 30px (mobile)
- Grid gaps vary by block settings

---

## Troubleshooting

### Block not rendering correctly
1. Check all required fields are filled
2. Verify images are uploaded (not just linked)
3. Clear cache and hard refresh

### Styles look different in editor
1. Editor styles approximate frontend; always preview
2. Some hover states only visible on frontend

### Content not saving
1. Check for JavaScript errors in browser console
2. Ensure user has edit permissions
3. Try disabling other plugins temporarily

---

## Support

For technical issues with blocks, contact the development team with:
- WordPress version
- Browser and version
- Steps to reproduce the issue
- Screenshots if applicable
