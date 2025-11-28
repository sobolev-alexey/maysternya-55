# Maysternya 55 Theme - Installation Guide

## Requirements

- WordPress 6.0 or higher
- PHP 7.4 or higher
- Node.js 16+ and npm (for development/building blocks)

## Installation

### Method 1: Upload via WordPress Admin

1. Download the theme ZIP file
2. Go to WordPress Admin → Appearance → Themes
3. Click "Add New" → "Upload Theme"
4. Select the ZIP file and click "Install Now"
5. Click "Activate"

### Method 2: Manual Installation

1. Extract the theme folder
2. Upload `maysternya-theme` folder to `/wp-content/themes/`
3. Go to WordPress Admin → Appearance → Themes
4. Find "Maysternya 55" and click "Activate"

## Initial Setup

### 1. Build the Gutenberg Blocks

Before using the custom blocks, you need to build them:

```bash
cd /wp-content/themes/maysternya-theme/blocks
npm install
npm run build
```

For development with live reloading:
```bash
npm run start
```

### 2. Create Navigation Menu

1. Go to **Appearance → Menus**
2. Create a new menu named "Primary Menu"
3. Add the following pages:
   - Home
   - About Us (with sub-items: History, Founder, Manifesto, Team)
   - Projects (with sub-items: International Projects, Educational Projects)
   - Events
   - Support Us
   - Contacts
4. Check "Primary Menu" location
5. Save Menu

### 3. Configure Language Selector

The header includes a language selector with UK (English), German, and Ukrainian flags. 

If using a multilingual plugin like WPML or Polylang:
1. Install and configure the plugin
2. The language selector will automatically use available translations

For static display (default):
- The UK flag is shown by default
- Other flags appear in the dropdown

### 4. Set Up Pages

Create the following pages and assign their templates:

| Page Name | Template |
|-----------|----------|
| Home | Default (Front Page) |
| About Us | Default |
| History | History Page |
| Founder | Founder Page |
| Manifesto | Manifesto Page |
| Team | Team Page |
| International Projects | International Projects Page |
| Educational Projects | Educational Projects Page |
| Events | Default |
| Support Us | Support Us Page |
| Contacts | Contact Page |

### 5. Configure Settings

Go to **Appearance → Customize** to configure:

- **Site Identity**: Logo, site title, tagline
- **Social Links**: Facebook, Instagram, YouTube, Telegram URLs
- **Contact Info**: Phone number, email address

### 6. Set Static Front Page

1. Go to **Settings → Reading**
2. Select "A static page"
3. Choose your Home page as the front page
4. Save changes

## Theme Structure

```
maysternya-theme/
├── blocks/               # Gutenberg blocks source
│   ├── build/           # Compiled block assets
│   ├── src/             # Block source files
│   │   ├── blocks/      # Individual block components
│   │   ├── index.js     # Main entry point
│   │   ├── style.scss   # Frontend styles
│   │   └── editor.scss  # Editor styles
│   └── package.json     # Node dependencies
├── css/                 # Additional CSS files
├── fonts/               # Custom fonts (KharkivTone, Jost)
├── images/              # Theme images (logo, flags)
├── inc/                 # PHP includes
│   ├── blocks.php       # Block registration
│   ├── custom-post-types.php
│   ├── customizer.php
│   └── template-tags.php
├── js/                  # JavaScript files
├── style.css            # Main theme stylesheet
├── functions.php        # Theme functions
├── header.php           # Header template
├── footer.php           # Footer template
└── page-*.php           # Page templates
```

## Custom Post Types

The theme includes the following custom post types:

- **Projects** - For showcasing theater projects
- **Team Members** - For team member profiles
- **Performances** - For performance listings

## Troubleshooting

### Blocks not showing in editor

1. Ensure blocks are built: `cd blocks && npm run build`
2. Check browser console for JavaScript errors
3. Clear any caching plugins

### Styles not loading

1. Regenerate the build: `npm run build`
2. Clear browser cache
3. Check if `blocks/build/style-index.css` exists

### Menu not displaying

1. Verify menu is assigned to "Primary Menu" location
2. Check header.php for proper menu call
3. Ensure menu items are published

## Support

For issues or questions, please refer to the theme documentation or contact the development team.
