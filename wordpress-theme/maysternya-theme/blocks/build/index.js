/**
 * Maysternya Custom Gutenberg Blocks
 * 
 * This file registers all custom blocks for the theme
 */

(function(wp) {
    const { registerBlockType } = wp.blocks;
    const { Fragment, createElement: el } = wp.element;
    const { InspectorControls, MediaUpload, MediaUploadCheck, RichText, URLInputButton } = wp.blockEditor;
    const { PanelBody, TextControl, TextareaControl, SelectControl, ToggleControl, Button } = wp.components;
    const { __ } = wp.i18n;

    // Helper to create element
    const h = el;

    // ==========================================
    // PAGE HERO BLOCK
    // ==========================================
    registerBlockType('maysternya/page-hero', {
        title: __('Page Hero', 'maysternya'),
        description: __('Page header with breadcrumb, title and optional image', 'maysternya'),
        icon: 'cover-image',
        category: 'maysternya',
        attributes: {
            breadcrumb: { type: 'string', default: 'MAIN PAGE' },
            pretitle: { type: 'string', default: '' },
            title: { type: 'string', default: 'PAGE TITLE' },
            imageUrl: { type: 'string', default: '' },
            imageId: { type: 'number' },
            imagePosition: { type: 'string', default: 'left' }
        },
        edit: function(props) {
            const { attributes, setAttributes } = props;
            return h(Fragment, {},
                h(InspectorControls, {},
                    h(PanelBody, { title: __('Settings', 'maysternya') },
                        h(TextControl, {
                            label: __('Breadcrumb', 'maysternya'),
                            value: attributes.breadcrumb,
                            onChange: (val) => setAttributes({ breadcrumb: val })
                        }),
                        h(TextControl, {
                            label: __('Pre-title', 'maysternya'),
                            value: attributes.pretitle,
                            onChange: (val) => setAttributes({ pretitle: val })
                        }),
                        h(SelectControl, {
                            label: __('Image Position', 'maysternya'),
                            value: attributes.imagePosition,
                            options: [
                                { label: 'Left', value: 'left' },
                                { label: 'Right', value: 'right' },
                                { label: 'None', value: 'none' }
                            ],
                            onChange: (val) => setAttributes({ imagePosition: val })
                        })
                    ),
                    h(PanelBody, { title: __('Image', 'maysternya') },
                        h(MediaUploadCheck, {},
                            h(MediaUpload, {
                                onSelect: (media) => setAttributes({ imageUrl: media.url, imageId: media.id }),
                                allowedTypes: ['image'],
                                value: attributes.imageId,
                                render: ({ open }) => h(Button, {
                                    onClick: open,
                                    variant: 'secondary'
                                }, attributes.imageUrl ? __('Replace Image', 'maysternya') : __('Select Image', 'maysternya'))
                            })
                        ),
                        attributes.imageUrl && h('img', { src: attributes.imageUrl, style: { maxWidth: '100%', marginTop: '10px' } })
                    )
                ),
                h('div', { className: 'maysternya-block-preview page-hero-preview' },
                    h('span', { className: 'breadcrumb' }, attributes.breadcrumb),
                    h('div', { className: 'preview-inner', style: { display: 'flex', gap: '20px', alignItems: 'center' } },
                        attributes.imageUrl && attributes.imagePosition === 'left' && h('img', { src: attributes.imageUrl, style: { maxWidth: '200px' } }),
                        h('div', {},
                            attributes.pretitle && h('span', { className: 'pretitle' }, attributes.pretitle),
                            h(RichText, {
                                tagName: 'h1',
                                value: attributes.title,
                                onChange: (val) => setAttributes({ title: val }),
                                placeholder: __('Enter title...', 'maysternya')
                            })
                        ),
                        attributes.imageUrl && attributes.imagePosition === 'right' && h('img', { src: attributes.imageUrl, style: { maxWidth: '200px' } })
                    )
                )
            );
        },
        save: () => null
    });

    // ==========================================
    // SECTION HEADER BLOCK
    // ==========================================
    registerBlockType('maysternya/section-header', {
        title: __('Section Header', 'maysternya'),
        description: __('Section title with optional subtitle', 'maysternya'),
        icon: 'heading',
        category: 'maysternya',
        attributes: {
            title: { type: 'string', default: 'SECTION TITLE' },
            subtitle: { type: 'string', default: '' }
        },
        edit: function(props) {
            const { attributes, setAttributes } = props;
            return h(Fragment, {},
                h(InspectorControls, {},
                    h(PanelBody, { title: __('Settings', 'maysternya') },
                        h(TextControl, {
                            label: __('Subtitle', 'maysternya'),
                            value: attributes.subtitle,
                            onChange: (val) => setAttributes({ subtitle: val })
                        })
                    )
                ),
                h('div', { className: 'maysternya-block-preview section-header-preview' },
                    h('div', { className: 'section-header', style: { borderBottom: '1px solid #fff', paddingBottom: '20px', display: 'flex', justifyContent: 'space-between' } },
                        h(RichText, {
                            tagName: 'h2',
                            value: attributes.title,
                            onChange: (val) => setAttributes({ title: val }),
                            placeholder: __('Section Title', 'maysternya'),
                            style: { fontSize: '32px', fontFamily: 'var(--font-heading)' }
                        }),
                        attributes.subtitle && h('span', { style: { fontSize: '11px', letterSpacing: '0.15em' } }, attributes.subtitle)
                    )
                )
            );
        },
        save: () => null
    });

    // ==========================================
    // HERO SECTION BLOCK
    // ==========================================
    registerBlockType('maysternya/hero-section', {
        title: __('Hero Section', 'maysternya'),
        description: __('Full-screen hero with title and CTA button', 'maysternya'),
        icon: 'format-image',
        category: 'maysternya',
        attributes: {
            title: { type: 'string', default: 'IN\nTHEATRE\nWE TRUST' },
            buttonText: { type: 'string', default: 'GO TO PERFORMANCES' },
            buttonUrl: { type: 'string', default: '#' },
            backgroundImage: { type: 'string', default: '' },
            backgroundImageId: { type: 'number' }
        },
        edit: function(props) {
            const { attributes, setAttributes } = props;
            return h(Fragment, {},
                h(InspectorControls, {},
                    h(PanelBody, { title: __('Button Settings', 'maysternya') },
                        h(TextControl, {
                            label: __('Button Text', 'maysternya'),
                            value: attributes.buttonText,
                            onChange: (val) => setAttributes({ buttonText: val })
                        }),
                        h(TextControl, {
                            label: __('Button URL', 'maysternya'),
                            value: attributes.buttonUrl,
                            onChange: (val) => setAttributes({ buttonUrl: val })
                        })
                    ),
                    h(PanelBody, { title: __('Background Image', 'maysternya') },
                        h(MediaUploadCheck, {},
                            h(MediaUpload, {
                                onSelect: (media) => setAttributes({ backgroundImage: media.url, backgroundImageId: media.id }),
                                allowedTypes: ['image'],
                                value: attributes.backgroundImageId,
                                render: ({ open }) => h(Button, { onClick: open, variant: 'secondary' },
                                    attributes.backgroundImage ? __('Replace Image', 'maysternya') : __('Select Image', 'maysternya')
                                )
                            })
                        )
                    )
                ),
                h('div', { 
                    className: 'maysternya-block-preview hero-section-preview',
                    style: { 
                        backgroundImage: attributes.backgroundImage ? `url(${attributes.backgroundImage})` : 'none',
                        backgroundSize: 'cover',
                        minHeight: '400px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        position: 'relative'
                    }
                },
                    h('div', { style: { position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' } }),
                    h('div', { style: { position: 'relative', zIndex: 1 } },
                        h(RichText, {
                            tagName: 'h1',
                            value: attributes.title,
                            onChange: (val) => setAttributes({ title: val }),
                            placeholder: __('Enter hero title...', 'maysternya'),
                            style: { fontSize: '80px', lineHeight: '0.85' }
                        }),
                        h('span', { className: 'btn btn-primary', style: { display: 'inline-block', marginTop: '30px', padding: '16px 40px', border: '1px solid #fff', background: '#fff', color: '#000' } }, attributes.buttonText)
                    )
                )
            );
        },
        save: () => null
    });

    // ==========================================
    // BIO SECTION BLOCK
    // ==========================================
    registerBlockType('maysternya/bio-section', {
        title: __('Bio Section', 'maysternya'),
        description: __('Image with title, text and optional caption', 'maysternya'),
        icon: 'id-alt',
        category: 'maysternya',
        attributes: {
            title: { type: 'string', default: 'WHO\'S LEONID SADOVSKY?' },
            content: { type: 'string', default: '' },
            imageUrl: { type: 'string', default: '' },
            imageId: { type: 'number' },
            imageCaption: { type: 'string', default: '' },
            imagePosition: { type: 'string', default: 'left' }
        },
        edit: function(props) {
            const { attributes, setAttributes } = props;
            return h(Fragment, {},
                h(InspectorControls, {},
                    h(PanelBody, { title: __('Layout', 'maysternya') },
                        h(SelectControl, {
                            label: __('Image Position', 'maysternya'),
                            value: attributes.imagePosition,
                            options: [
                                { label: 'Left', value: 'left' },
                                { label: 'Right', value: 'right' }
                            ],
                            onChange: (val) => setAttributes({ imagePosition: val })
                        }),
                        h(TextControl, {
                            label: __('Image Caption (e.g., years)', 'maysternya'),
                            value: attributes.imageCaption,
                            onChange: (val) => setAttributes({ imageCaption: val })
                        })
                    ),
                    h(PanelBody, { title: __('Image', 'maysternya') },
                        h(MediaUploadCheck, {},
                            h(MediaUpload, {
                                onSelect: (media) => setAttributes({ imageUrl: media.url, imageId: media.id }),
                                allowedTypes: ['image'],
                                value: attributes.imageId,
                                render: ({ open }) => h(Button, { onClick: open, variant: 'secondary' },
                                    attributes.imageUrl ? __('Replace Image', 'maysternya') : __('Select Image', 'maysternya')
                                )
                            })
                        )
                    )
                ),
                h('div', { className: 'maysternya-block-preview bio-section-preview' },
                    h('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' } },
                        attributes.imagePosition === 'left' && h('div', {},
                            attributes.imageUrl ? h('img', { src: attributes.imageUrl, style: { width: '100%' } }) : h('div', { style: { background: '#333', aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center' } }, 'Select Image'),
                            attributes.imageCaption && h('span', { style: { display: 'block', marginTop: '10px', fontSize: '14px' } }, attributes.imageCaption)
                        ),
                        h('div', {},
                            h(RichText, {
                                tagName: 'h2',
                                value: attributes.title,
                                onChange: (val) => setAttributes({ title: val }),
                                placeholder: __('Enter title...', 'maysternya'),
                                style: { fontSize: '32px', marginBottom: '20px' }
                            }),
                            h(RichText, {
                                tagName: 'div',
                                value: attributes.content,
                                onChange: (val) => setAttributes({ content: val }),
                                placeholder: __('Enter content...', 'maysternya'),
                                multiline: 'p'
                            })
                        ),
                        attributes.imagePosition === 'right' && h('div', {},
                            attributes.imageUrl ? h('img', { src: attributes.imageUrl, style: { width: '100%' } }) : h('div', { style: { background: '#333', aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center' } }, 'Select Image'),
                            attributes.imageCaption && h('span', { style: { display: 'block', marginTop: '10px', fontSize: '14px' } }, attributes.imageCaption)
                        )
                    )
                )
            );
        },
        save: () => null
    });

    // ==========================================
    // TWO COLUMN CONTENT BLOCK
    // ==========================================
    registerBlockType('maysternya/two-column-content', {
        title: __('Two Column Content', 'maysternya'),
        description: __('Title and text on one side, image on the other', 'maysternya'),
        icon: 'columns',
        category: 'maysternya',
        attributes: {
            title: { type: 'string', default: 'LEGACY IN THEATRE AND ART' },
            content: { type: 'string', default: '' },
            imageUrl: { type: 'string', default: '' },
            imageId: { type: 'number' },
            imagePosition: { type: 'string', default: 'right' }
        },
        edit: function(props) {
            const { attributes, setAttributes } = props;
            return h(Fragment, {},
                h(InspectorControls, {},
                    h(PanelBody, { title: __('Layout', 'maysternya') },
                        h(SelectControl, {
                            label: __('Image Position', 'maysternya'),
                            value: attributes.imagePosition,
                            options: [
                                { label: 'Left', value: 'left' },
                                { label: 'Right', value: 'right' }
                            ],
                            onChange: (val) => setAttributes({ imagePosition: val })
                        })
                    ),
                    h(PanelBody, { title: __('Image', 'maysternya') },
                        h(MediaUploadCheck, {},
                            h(MediaUpload, {
                                onSelect: (media) => setAttributes({ imageUrl: media.url, imageId: media.id }),
                                allowedTypes: ['image'],
                                value: attributes.imageId,
                                render: ({ open }) => h(Button, { onClick: open, variant: 'secondary' },
                                    attributes.imageUrl ? __('Replace Image', 'maysternya') : __('Select Image', 'maysternya')
                                )
                            })
                        )
                    )
                ),
                h('div', { className: 'maysternya-block-preview two-column-preview' },
                    h('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' } },
                        attributes.imagePosition === 'left' && h('div', {},
                            attributes.imageUrl ? h('img', { src: attributes.imageUrl, style: { width: '100%' } }) : h('div', { style: { background: '#333', aspectRatio: '4/3', display: 'flex', alignItems: 'center', justifyContent: 'center' } }, 'Select Image')
                        ),
                        h('div', {},
                            h(RichText, {
                                tagName: 'h2',
                                value: attributes.title,
                                onChange: (val) => setAttributes({ title: val }),
                                placeholder: __('Enter title...', 'maysternya'),
                                style: { fontSize: '32px', marginBottom: '20px' }
                            }),
                            h(RichText, {
                                tagName: 'div',
                                value: attributes.content,
                                onChange: (val) => setAttributes({ content: val }),
                                placeholder: __('Enter content...', 'maysternya'),
                                multiline: 'p'
                            })
                        ),
                        attributes.imagePosition === 'right' && h('div', {},
                            attributes.imageUrl ? h('img', { src: attributes.imageUrl, style: { width: '100%' } }) : h('div', { style: { background: '#333', aspectRatio: '4/3', display: 'flex', alignItems: 'center', justifyContent: 'center' } }, 'Select Image')
                        )
                    )
                )
            );
        },
        save: () => null
    });

    // ==========================================
    // IMAGE STRIP BLOCK
    // ==========================================
    registerBlockType('maysternya/image-strip', {
        title: __('Image Strip', 'maysternya'),
        description: __('Horizontal row of images with optional caption', 'maysternya'),
        icon: 'images-alt2',
        category: 'maysternya',
        attributes: {
            images: { type: 'array', default: [] },
            caption: { type: 'string', default: '' }
        },
        edit: function(props) {
            const { attributes, setAttributes } = props;
            return h(Fragment, {},
                h(InspectorControls, {},
                    h(PanelBody, { title: __('Images', 'maysternya') },
                        h(MediaUploadCheck, {},
                            h(MediaUpload, {
                                onSelect: (media) => setAttributes({ images: media.map(m => ({ url: m.url, id: m.id, alt: m.alt })) }),
                                allowedTypes: ['image'],
                                multiple: true,
                                gallery: true,
                                value: attributes.images.map(i => i.id),
                                render: ({ open }) => h(Button, { onClick: open, variant: 'secondary' },
                                    attributes.images.length ? __('Edit Gallery', 'maysternya') : __('Select Images', 'maysternya')
                                )
                            })
                        )
                    ),
                    h(PanelBody, { title: __('Caption', 'maysternya') },
                        h(TextareaControl, {
                            label: __('Caption Text', 'maysternya'),
                            value: attributes.caption,
                            onChange: (val) => setAttributes({ caption: val })
                        })
                    )
                ),
                h('div', { className: 'maysternya-block-preview image-strip-preview' },
                    h('div', { style: { display: 'flex', gap: '0', overflow: 'hidden' } },
                        attributes.images.length > 0 
                            ? attributes.images.map((img, i) => h('img', { key: i, src: img.url, style: { height: '150px', width: 'auto' } }))
                            : h('div', { style: { padding: '40px', background: '#333', width: '100%', textAlign: 'center' } }, 'Select images for the strip')
                    ),
                    attributes.caption && h('p', { style: { marginTop: '20px', textAlign: 'center', fontSize: '14px' } }, attributes.caption)
                )
            );
        },
        save: () => null
    });

    // ==========================================
    // CENTERED QUOTE BLOCK
    // ==========================================
    registerBlockType('maysternya/centered-quote', {
        title: __('Centered Quote', 'maysternya'),
        description: __('Centered text with optional decorative icon', 'maysternya'),
        icon: 'format-quote',
        category: 'maysternya',
        attributes: {
            text: { type: 'string', default: '' },
            showIcon: { type: 'boolean', default: true },
            iconType: { type: 'string', default: 'heart' }
        },
        edit: function(props) {
            const { attributes, setAttributes } = props;
            return h(Fragment, {},
                h(InspectorControls, {},
                    h(PanelBody, { title: __('Icon Settings', 'maysternya') },
                        h(ToggleControl, {
                            label: __('Show Icon', 'maysternya'),
                            checked: attributes.showIcon,
                            onChange: (val) => setAttributes({ showIcon: val })
                        }),
                        attributes.showIcon && h(SelectControl, {
                            label: __('Icon Type', 'maysternya'),
                            value: attributes.iconType,
                            options: [
                                { label: 'Heart', value: 'heart' },
                                { label: 'Flame', value: 'flame' }
                            ],
                            onChange: (val) => setAttributes({ iconType: val })
                        })
                    )
                ),
                h('div', { className: 'maysternya-block-preview centered-quote-preview', style: { textAlign: 'center', padding: '60px 20px' } },
                    h(RichText, {
                        tagName: 'p',
                        value: attributes.text,
                        onChange: (val) => setAttributes({ text: val }),
                        placeholder: __('Enter quote text...', 'maysternya'),
                        style: { fontSize: '16px', lineHeight: '1.8', maxWidth: '700px', margin: '0 auto' }
                    }),
                    attributes.showIcon && h('div', { style: { marginTop: '30px' } },
                        attributes.iconType === 'heart' ? '♥' : '🔥'
                    )
                )
            );
        },
        save: () => null
    });

    // ==========================================
    // TIMELINE BLOCK
    // ==========================================
    registerBlockType('maysternya/timeline', {
        title: __('Timeline', 'maysternya'),
        description: __('Interactive timeline with year navigation', 'maysternya'),
        icon: 'backup',
        category: 'maysternya',
        attributes: {
            title: { type: 'string', default: 'TIMELINE' },
            subtitle: { type: 'string', default: 'OF MAYSTERNYA 55' },
            periods: { type: 'array', default: [
                { year: '2006', startYear: '2006', endYear: '2011' },
                { year: '2011', startYear: '2011', endYear: '2015' },
                { year: '2015', startYear: '2015', endYear: '2020' },
                { year: '2020', startYear: '2020', endYear: '2025' },
                { year: '2025', startYear: '2025', endYear: '' }
            ] }
        },
        edit: function(props) {
            const { attributes, setAttributes } = props;
            return h(Fragment, {},
                h(InspectorControls, {},
                    h(PanelBody, { title: __('Timeline Settings', 'maysternya') },
                        h(TextControl, {
                            label: __('Title', 'maysternya'),
                            value: attributes.title,
                            onChange: (val) => setAttributes({ title: val })
                        }),
                        h(TextControl, {
                            label: __('Subtitle', 'maysternya'),
                            value: attributes.subtitle,
                            onChange: (val) => setAttributes({ subtitle: val })
                        }),
                        h('p', {}, __('Edit periods in the code or use custom fields', 'maysternya'))
                    )
                ),
                h('div', { className: 'maysternya-block-preview timeline-preview', style: { textAlign: 'center', padding: '40px' } },
                    h('h2', { style: { fontSize: '48px', fontFamily: 'var(--font-heading)' } }, attributes.title),
                    h('p', { style: { fontSize: '14px', letterSpacing: '0.2em', marginBottom: '40px' } }, attributes.subtitle),
                    h('div', { style: { display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px' } },
                        h('span', {}, '<'),
                        attributes.periods.map((period, i) => h('span', { key: i, style: { padding: '10px', fontSize: '12px', opacity: i === 0 ? 1 : 0.5 } }, period.year)),
                        h('span', {}, '>')
                    ),
                    h('div', { style: { marginTop: '30px', fontSize: '48px' } },
                        attributes.periods[0] && `${attributes.periods[0].startYear} — ${attributes.periods[0].endYear}`
                    )
                )
            );
        },
        save: () => null
    });

    // ==========================================
    // PROJECT CARD BLOCK
    // ==========================================
    registerBlockType('maysternya/project-card', {
        title: __('Project Card', 'maysternya'),
        description: __('Square image with overlay text', 'maysternya'),
        icon: 'format-gallery',
        category: 'maysternya',
        attributes: {
            title: { type: 'string', default: 'PROJECT\nTITLE' },
            imageUrl: { type: 'string', default: '' },
            imageId: { type: 'number' },
            link: { type: 'string', default: '#' },
            badge: { type: 'string', default: 'MAYSTERNYA 55' },
            location: { type: 'string', default: '' },
            author: { type: 'string', default: '' },
            director: { type: 'string', default: '' }
        },
        edit: function(props) {
            const { attributes, setAttributes } = props;
            return h(Fragment, {},
                h(InspectorControls, {},
                    h(PanelBody, { title: __('Card Settings', 'maysternya') },
                        h(TextControl, {
                            label: __('Badge Text', 'maysternya'),
                            value: attributes.badge,
                            onChange: (val) => setAttributes({ badge: val })
                        }),
                        h(TextControl, {
                            label: __('Link URL', 'maysternya'),
                            value: attributes.link,
                            onChange: (val) => setAttributes({ link: val })
                        }),
                        h(TextControl, {
                            label: __('Location', 'maysternya'),
                            value: attributes.location,
                            onChange: (val) => setAttributes({ location: val })
                        }),
                        h(TextControl, {
                            label: __('Author', 'maysternya'),
                            value: attributes.author,
                            onChange: (val) => setAttributes({ author: val })
                        }),
                        h(TextControl, {
                            label: __('Director', 'maysternya'),
                            value: attributes.director,
                            onChange: (val) => setAttributes({ director: val })
                        })
                    ),
                    h(PanelBody, { title: __('Image', 'maysternya') },
                        h(MediaUploadCheck, {},
                            h(MediaUpload, {
                                onSelect: (media) => setAttributes({ imageUrl: media.url, imageId: media.id }),
                                allowedTypes: ['image'],
                                value: attributes.imageId,
                                render: ({ open }) => h(Button, { onClick: open, variant: 'secondary' },
                                    attributes.imageUrl ? __('Replace Image', 'maysternya') : __('Select Image', 'maysternya')
                                )
                            })
                        )
                    )
                ),
                h('div', { className: 'maysternya-block-preview project-card-preview' },
                    h('div', { style: { position: 'relative', aspectRatio: '1', background: '#1a1a1a', overflow: 'hidden' } },
                        attributes.imageUrl && h('img', { src: attributes.imageUrl, style: { width: '100%', height: '100%', objectFit: 'cover' } }),
                        h('div', { style: { position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' } },
                            h('span', { style: { fontSize: '10px', letterSpacing: '0.2em' } }, attributes.badge),
                            h(RichText, {
                                tagName: 'h3',
                                value: attributes.title,
                                onChange: (val) => setAttributes({ title: val }),
                                placeholder: __('Project Title', 'maysternya'),
                                style: { fontSize: '36px', lineHeight: '0.9' }
                            })
                        )
                    ),
                    h('div', { style: { textAlign: 'right', marginTop: '10px', fontSize: '12px' } },
                        attributes.location && h('p', {}, attributes.location),
                        attributes.author && h('p', {}, attributes.author),
                        attributes.director && h('p', {}, attributes.director)
                    )
                )
            );
        },
        save: () => null
    });

    // ==========================================
    // EVENT CARD BLOCK
    // ==========================================
    registerBlockType('maysternya/event-card', {
        title: __('Event Card', 'maysternya'),
        description: __('3-column event layout with date, content, and image', 'maysternya'),
        icon: 'calendar-alt',
        category: 'maysternya',
        attributes: {
            date: { type: 'string', default: '01/01' },
            time: { type: 'string', default: '7:00pm' },
            type: { type: 'string', default: 'PERFORMANCE' },
            title: { type: 'string', default: 'EVENT\nTITLE' },
            author: { type: 'string', default: '' },
            director: { type: 'string', default: '' },
            imageUrl: { type: 'string', default: '' },
            imageId: { type: 'number' }
        },
        edit: function(props) {
            const { attributes, setAttributes } = props;
            return h(Fragment, {},
                h(InspectorControls, {},
                    h(PanelBody, { title: __('Event Details', 'maysternya') },
                        h(TextControl, {
                            label: __('Date (e.g., 11/03)', 'maysternya'),
                            value: attributes.date,
                            onChange: (val) => setAttributes({ date: val })
                        }),
                        h(TextControl, {
                            label: __('Time', 'maysternya'),
                            value: attributes.time,
                            onChange: (val) => setAttributes({ time: val })
                        }),
                        h(TextControl, {
                            label: __('Event Type', 'maysternya'),
                            value: attributes.type,
                            onChange: (val) => setAttributes({ type: val })
                        }),
                        h(TextControl, {
                            label: __('Author', 'maysternya'),
                            value: attributes.author,
                            onChange: (val) => setAttributes({ author: val })
                        }),
                        h(TextControl, {
                            label: __('Director', 'maysternya'),
                            value: attributes.director,
                            onChange: (val) => setAttributes({ director: val })
                        })
                    ),
                    h(PanelBody, { title: __('Image', 'maysternya') },
                        h(MediaUploadCheck, {},
                            h(MediaUpload, {
                                onSelect: (media) => setAttributes({ imageUrl: media.url, imageId: media.id }),
                                allowedTypes: ['image'],
                                value: attributes.imageId,
                                render: ({ open }) => h(Button, { onClick: open, variant: 'secondary' },
                                    attributes.imageUrl ? __('Replace Image', 'maysternya') : __('Select Image', 'maysternya')
                                )
                            })
                        )
                    )
                ),
                h('div', { className: 'maysternya-block-preview event-card-preview', style: { display: 'grid', gridTemplateColumns: '100px 1fr 150px', gap: '30px', padding: '30px 0', borderTop: '1px solid rgba(255,255,255,0.3)' } },
                    h('div', {},
                        h('div', { style: { fontSize: '36px', fontFamily: 'var(--font-heading)' } }, attributes.date),
                        h('div', { style: { fontSize: '14px', marginTop: '5px' } }, attributes.time),
                        h('div', { style: { fontSize: '9px', letterSpacing: '0.2em', marginTop: '15px', opacity: 0.6 } }, attributes.type)
                    ),
                    h('div', {},
                        attributes.author && h('p', { style: { fontSize: '12px', opacity: 0.7, marginBottom: '10px' } }, 'Author: ' + attributes.author),
                        h(RichText, {
                            tagName: 'h3',
                            value: attributes.title,
                            onChange: (val) => setAttributes({ title: val }),
                            placeholder: __('Event Title', 'maysternya'),
                            style: { fontSize: '48px', lineHeight: '0.9', marginBottom: '15px' }
                        }),
                        attributes.director && h('p', { style: { fontSize: '12px', opacity: 0.7 } }, attributes.director)
                    ),
                    h('div', { style: { aspectRatio: '1', background: '#1a1a1a' } },
                        attributes.imageUrl && h('img', { src: attributes.imageUrl, style: { width: '100%', height: '100%', objectFit: 'cover' } })
                    )
                )
            );
        },
        save: () => null
    });

    // ==========================================
    // ABOUT HERO BLOCK
    // ==========================================
    registerBlockType('maysternya/about-hero', {
        title: __('About Hero', 'maysternya'),
        description: __('Large image with centered text overlay and optional CTA', 'maysternya'),
        icon: 'align-center',
        category: 'maysternya',
        attributes: {
            label: { type: 'string', default: 'ABOUT US' },
            title: { type: 'string', default: 'MORE THAN A\nTHEATRE' },
            buttonText: { type: 'string', default: 'LEARN MORE ABOUT US' },
            buttonUrl: { type: 'string', default: '#' },
            backgroundImage: { type: 'string', default: '' },
            backgroundImageId: { type: 'number' }
        },
        edit: function(props) {
            const { attributes, setAttributes } = props;
            return h(Fragment, {},
                h(InspectorControls, {},
                    h(PanelBody, { title: __('Content', 'maysternya') },
                        h(TextControl, {
                            label: __('Label', 'maysternya'),
                            value: attributes.label,
                            onChange: (val) => setAttributes({ label: val })
                        }),
                        h(TextControl, {
                            label: __('Button Text', 'maysternya'),
                            value: attributes.buttonText,
                            onChange: (val) => setAttributes({ buttonText: val })
                        }),
                        h(TextControl, {
                            label: __('Button URL', 'maysternya'),
                            value: attributes.buttonUrl,
                            onChange: (val) => setAttributes({ buttonUrl: val })
                        })
                    ),
                    h(PanelBody, { title: __('Background Image', 'maysternya') },
                        h(MediaUploadCheck, {},
                            h(MediaUpload, {
                                onSelect: (media) => setAttributes({ backgroundImage: media.url, backgroundImageId: media.id }),
                                allowedTypes: ['image'],
                                value: attributes.backgroundImageId,
                                render: ({ open }) => h(Button, { onClick: open, variant: 'secondary' },
                                    attributes.backgroundImage ? __('Replace Image', 'maysternya') : __('Select Image', 'maysternya')
                                )
                            })
                        )
                    )
                ),
                h('div', { 
                    className: 'maysternya-block-preview about-hero-preview',
                    style: { 
                        backgroundImage: attributes.backgroundImage ? `url(${attributes.backgroundImage})` : 'none',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        minHeight: '400px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        position: 'relative'
                    }
                },
                    h('div', { style: { position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' } }),
                    h('div', { style: { position: 'relative', zIndex: 1 } },
                        h('span', { style: { fontSize: '10px', letterSpacing: '0.3em', display: 'block', marginBottom: '20px' } }, attributes.label),
                        h(RichText, {
                            tagName: 'h2',
                            value: attributes.title,
                            onChange: (val) => setAttributes({ title: val }),
                            placeholder: __('Enter title...', 'maysternya'),
                            style: { fontSize: '80px', lineHeight: '0.85', marginBottom: '30px' }
                        }),
                        attributes.buttonText && h('span', { style: { display: 'inline-block', padding: '16px 40px', border: '1px solid #fff' } }, attributes.buttonText)
                    )
                )
            );
        },
        save: () => null
    });

    // ==========================================
    // FULL WIDTH IMAGE BLOCK
    // ==========================================
    registerBlockType('maysternya/full-width-image', {
        title: __('Full Width Image', 'maysternya'),
        description: __('Full-width image with optional text overlay and caption', 'maysternya'),
        icon: 'format-image',
        category: 'maysternya',
        attributes: {
            imageUrl: { type: 'string', default: '' },
            imageId: { type: 'number' },
            overlayText: { type: 'string', default: '' },
            caption: { type: 'string', default: '' }
        },
        edit: function(props) {
            const { attributes, setAttributes } = props;
            return h(Fragment, {},
                h(InspectorControls, {},
                    h(PanelBody, { title: __('Image', 'maysternya') },
                        h(MediaUploadCheck, {},
                            h(MediaUpload, {
                                onSelect: (media) => setAttributes({ imageUrl: media.url, imageId: media.id }),
                                allowedTypes: ['image'],
                                value: attributes.imageId,
                                render: ({ open }) => h(Button, { onClick: open, variant: 'secondary' },
                                    attributes.imageUrl ? __('Replace Image', 'maysternya') : __('Select Image', 'maysternya')
                                )
                            })
                        )
                    ),
                    h(PanelBody, { title: __('Content', 'maysternya') },
                        h(TextareaControl, {
                            label: __('Overlay Text', 'maysternya'),
                            value: attributes.overlayText,
                            onChange: (val) => setAttributes({ overlayText: val })
                        }),
                        h(TextareaControl, {
                            label: __('Caption', 'maysternya'),
                            value: attributes.caption,
                            onChange: (val) => setAttributes({ caption: val })
                        })
                    )
                ),
                h('div', { className: 'maysternya-block-preview full-width-image-preview' },
                    h('div', { style: { position: 'relative', minHeight: '300px', background: '#1a1a1a' } },
                        attributes.imageUrl && h('img', { src: attributes.imageUrl, style: { width: '100%', height: 'auto' } }),
                        attributes.overlayText && h('div', { style: { position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.3)' } },
                            h('h2', { style: { fontSize: '48px', textAlign: 'center' } }, attributes.overlayText)
                        )
                    ),
                    attributes.caption && h('p', { style: { marginTop: '20px', fontSize: '14px', textAlign: 'center' } }, attributes.caption)
                )
            );
        },
        save: () => null
    });

    // ==========================================
    // TEAM MEMBER BLOCK
    // ==========================================
    registerBlockType('maysternya/team-member', {
        title: __('Team Member', 'maysternya'),
        description: __('Team member card with photo, name and role', 'maysternya'),
        icon: 'admin-users',
        category: 'maysternya',
        attributes: {
            name: { type: 'string', default: 'Name' },
            role: { type: 'string', default: 'Role' },
            imageUrl: { type: 'string', default: '' },
            imageId: { type: 'number' },
            link: { type: 'string', default: '' }
        },
        edit: function(props) {
            const { attributes, setAttributes } = props;
            return h(Fragment, {},
                h(InspectorControls, {},
                    h(PanelBody, { title: __('Member Info', 'maysternya') },
                        h(TextControl, {
                            label: __('Name', 'maysternya'),
                            value: attributes.name,
                            onChange: (val) => setAttributes({ name: val })
                        }),
                        h(TextControl, {
                            label: __('Role', 'maysternya'),
                            value: attributes.role,
                            onChange: (val) => setAttributes({ role: val })
                        }),
                        h(TextControl, {
                            label: __('Link URL', 'maysternya'),
                            value: attributes.link,
                            onChange: (val) => setAttributes({ link: val })
                        })
                    ),
                    h(PanelBody, { title: __('Photo', 'maysternya') },
                        h(MediaUploadCheck, {},
                            h(MediaUpload, {
                                onSelect: (media) => setAttributes({ imageUrl: media.url, imageId: media.id }),
                                allowedTypes: ['image'],
                                value: attributes.imageId,
                                render: ({ open }) => h(Button, { onClick: open, variant: 'secondary' },
                                    attributes.imageUrl ? __('Replace Photo', 'maysternya') : __('Select Photo', 'maysternya')
                                )
                            })
                        )
                    )
                ),
                h('div', { className: 'maysternya-block-preview team-member-preview', style: { maxWidth: '200px' } },
                    h('div', { style: { aspectRatio: '1', background: '#1a1a1a', marginBottom: '15px' } },
                        attributes.imageUrl && h('img', { src: attributes.imageUrl, style: { width: '100%', height: '100%', objectFit: 'cover' } })
                    ),
                    h(RichText, {
                        tagName: 'h3',
                        value: attributes.name,
                        onChange: (val) => setAttributes({ name: val }),
                        placeholder: __('Name', 'maysternya'),
                        style: { fontSize: '16px', marginBottom: '5px' }
                    }),
                    h('p', { style: { fontSize: '12px', opacity: 0.7 } }, attributes.role)
                )
            );
        },
        save: () => null
    });

})(window.wp);
