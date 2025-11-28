# Here are your Instructions
The ultimate goal is to create a WordPress website that is an exact replica of a provided Figma design in form of screenshots of all pages.
We need to create a Wordpress theme containing styling, pages layout, basic setup for the list of initial pages provided below (no content on the pages, but general elements like header, footer, logo, navigation, mobile adjustments, breadcrumbs should be present and available on every page).
For the content we need to build a number of custom reusable Gutenberg blocks, which should include content blocks as well as grid container blocks to serve as responsive layout container for several smaller blocks placed inside. 


# PRODUCT REQUIREMENTS:
* Pixel-Perfect Design: exact replica of a provided design (screenshots in `/screenshots` folder). The theme's styling (fonts, colors, layout, spacing, borders) must strictly match the design for all sections, including the header and footer.
* Responsive Layout: Every page must have a responsive layout, switching between mobile and desktop versions based on viewport width.
* Navigation: Implement the navigation menu as designed in the header navigation section.
* Content Management: Content sections should be clearly marked so that content creators can easily modify content and replace images within WordPress.
* Custom Fonts & Assets: The theme must use the provided custom fonts (Kharkiv Tone, Jost) and logo.
* Content Import: Create WordPress import files (.xml) for pages, starting with the Home page, using dummy text and placeholder images.

## What currently exists? 
A WordPress theme named `maysternya-theme` has been created in the `/wordpress-theme/` directory. The theme includes multiple PHP templates, CSS files for layout and responsiveness, a js directory, and a fonts directory containing the user-provided fonts. An XML file for importing the home page content exists in `/wordpress-import/`. The theme has been iterated upon twice but still fails to accurately match the user's design, so every building block and general theme design and styling need to be reworked.
### Feel free to modify the source code within the initial theme and extend it with new files.

## Technical instructions
* You should use React and WordPress block API for building blocks and add wordpress PHP wrapper to make the blocks usable as Gutenberg building blocks.
* Create Block registration with proper attributes and controls.
* Editor-side customization (what you see in the WordPress editor)
* Frontend rendering (what visitors see on your site)
* Inspector controls for customizing text, colors, spacing, etc.
* Reusable components that can be used across your site
* Create comprehensive installation instructions on how to install and configure the theme (menu items, language selector, common blocks like header, footer, navigation, menu etc.)
* Create comprehensive usage instruction for content creators, so that it is clear which pages exist, which building blocks exist, which block wrappers exist and how to assemble blocks within wrappers, which customizations are possible for each block. Also describe how to use, add, modify blocks within Wordpress WP-admin interface while building content of pages, and how to preview the results skipping the previously cached version.
* Create a script to compress the wordpress theme folder into ZIP, which can be uploaded into wordpress.

## Content block requirements
Completed Gutenberg blocks should have a dummy "Lorem ipsum" content of the same length as the text in the screenshot. Blocks with image should use a placeholder image of the same dimensions as the expected image from the screenshot. It should have a grey background, contrast enough to be visible on the black background, and that the text on top of the image is still readable.
Multiple blocks are structured that way, that image is at the bottom layer, and the text/CTA is located on top of the image, and ofter either centered or left/right aligned. It should be implemented exactly the same way in the corresponding building blocks.
Make all text elements of such blocks configurable rich text components in terms of font size, type (H1-H6, p), alignment (centered, left/right). Font weight, italic, underline etc. should be adjustable for certain words withing the text component. Make all of them optional. Similarly, make CTA buttons configurable, so that button text, link are configurable, CTA button itself is optional and can be removed from the block.

Implement section dividers as blocks as well. For example, a section divider block would contain a Headline like `Events`, a white line  separator below it, which should stretch from edge to edge. Make Text and font size of such blocks configurable.

Several blocks might have little discrepancies in the design, for example a CTA button might be visible on mobile, but not on desktop.
In this case implement the such button and similar elements so that these are always shown in the mobile version, but only appear in the desktop version when the block is hovered by the mouse cursor. Place such elements where it has space in the desktop version of the site, to not overlap with the content which is always shown. Also make such elements (CTAs) configurable and optional, so content creators can remove them entirely.

Look for screenshots in several folders: 
* `/screenshots/blocks` for Desktop and mobile versions of individual blocks. Consider file names to understand, which screenshot belongs to which block. 
The same blocks could be often found on several pages, so mainly process screenshots from `/screenshots/blocks`, and then verify that the design, layout and content of the blocks matches the requirement by checking the complete pages screenshots. 
* Naming convention of the screenshots inside the `/screenshots/blocks` folder:
 - Files names similarly but with index, like `BANNER 1` and `BANNER 5` represent the same block in its different variants. File names containing `mob`, like `Small image grid mob` represent the same component as `Small image grid` but in its mobile version. Disregard the case, file names could be in uppercase or capitalized, this is irrelevant.
* While creating a new block, identify all screenshot files containing the same block name in all possible variants and mobile version (where available), process information from all identified screenshots of the same block, and only then start implementing, considering all possible variants and Content block requirements from the instructions above.  
* For reference only - once all blocks are implemented, *and only if the context window allows to process a number of large screenshots*, continue with the following: process full page screenshots from  `/screenshots/pages/desktop` for Desktop version and `/screenshots/pages/mobile` for mobile version of every page. Consider file names to understand, which screenshot belongs to which page or sub-page. Then make sure that the blocks you implemented match the design and styling and can be assembled to the pages like on the screenshot. If you find some mistakes in the block implementation, make small corrections and verify again, but only if the context window still allows to proceed. 

## Ensure header navigation and header elements structure according to design (screenshots). 
There should be a logo image, but also a text saying `Maysternya`. Header navigation should be dynamic and contain main navigation links and sub-pages, in desktop view a list of sub-pages should be built as dropdown, for the mobile menu consult the respective screenshot. 
Also there should be a language selector with options for English (UK flag, default option), German and Ukrainian. Make sure the language selector is also a dropdown with only selected or default option visible, and that only flag and no text is shown.

Use logo image located under `/wordpress-theme/maysternya-theme/images/logo.png`

## Theming, styling
Website uses two major colors: #000000 as the background color, #ffffff as the main color for text, headlines, borders, menu elements, dropdown items etc. So far no other colors are expected.

Website uses two main Font families located under `/wordpress-theme/maysternya-theme/fonts`: KharkivTone for the main headings and some text, Jost for the remaining sub-headings and text. Consult screenshots to determine which font should be used for which text/heading/CTA item.

## Clear page content of pages located under `/wordpress-theme/maysternya-theme/` (all but 404 page), as the content should be built using Gutenberg blocks and not hard-coded




