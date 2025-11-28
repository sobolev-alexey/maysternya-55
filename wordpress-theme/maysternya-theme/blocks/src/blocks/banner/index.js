/**
 * Banner Block
 * 
 * Full-width hero banner with background image, text overlay, and optional CTA button.
 * Supports multiple layout variants based on BANNER 1-7 screenshots.
 */

import { registerBlockType } from '@wordpress/blocks';
import { 
    InspectorControls, 
    MediaUpload, 
    MediaUploadCheck, 
    RichText,
    useBlockProps 
} from '@wordpress/block-editor';
import { 
    PanelBody, 
    TextControl, 
    SelectControl, 
    ToggleControl, 
    Button,
    RangeControl
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

registerBlockType('maysternya/banner', {
    title: __('Banner', 'maysternya'),
    description: __('Full-width hero banner with background image and text overlay', 'maysternya'),
    icon: 'cover-image',
    category: 'maysternya',
    keywords: [__('hero', 'maysternya'), __('banner', 'maysternya'), __('header', 'maysternya')],
    supports: {
        align: ['full', 'wide'],
        html: false
    },
    attributes: {
        pretitle: {
            type: 'string',
            default: ''
        },
        title: {
            type: 'string',
            default: 'IN\nTHEATRE\nWE TRUST'
        },
        titleTag: {
            type: 'string',
            default: 'h1'
        },
        subtitle: {
            type: 'string',
            default: ''
        },
        showCta: {
            type: 'boolean',
            default: true
        },
        ctaText: {
            type: 'string',
            default: 'GO TO PERFORMANCES'
        },
        ctaUrl: {
            type: 'string',
            default: '#'
        },
        ctaStyle: {
            type: 'string',
            default: 'outline'
        },
        ctaHoverOnly: {
            type: 'boolean',
            default: false
        },
        backgroundImage: {
            type: 'string',
            default: ''
        },
        backgroundImageId: {
            type: 'number'
        },
        contentAlignment: {
            type: 'string',
            default: 'center'
        },
        height: {
            type: 'string',
            default: 'full'
        },
        showOverlay: {
            type: 'boolean',
            default: true
        },
        overlayOpacity: {
            type: 'number',
            default: 30
        }
    },
    
    edit: function({ attributes, setAttributes }) {
        const blockProps = useBlockProps({
            className: `wp-block-maysternya-banner wp-block-maysternya-banner--align-${attributes.contentAlignment} wp-block-maysternya-banner--height-${attributes.height}`
        });
        
        const {
            pretitle,
            title,
            titleTag,
            subtitle,
            showCta,
            ctaText,
            ctaUrl,
            ctaStyle,
            ctaHoverOnly,
            backgroundImage,
            contentAlignment,
            height,
            showOverlay,
            overlayOpacity
        } = attributes;
        
        // Generate placeholder image if no image is set
        const placeholderStyle = !backgroundImage ? {
            backgroundColor: '#333333',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        } : {};
        
        return (
            <>
                <InspectorControls>
                    <PanelBody title={__('Layout Settings', 'maysternya')} initialOpen={true}>
                        <SelectControl
                            label={__('Content Alignment', 'maysternya')}
                            value={contentAlignment}
                            options={[
                                { label: __('Center', 'maysternya'), value: 'center' },
                                { label: __('Left', 'maysternya'), value: 'left' },
                                { label: __('Right', 'maysternya'), value: 'right' }
                            ]}
                            onChange={(value) => setAttributes({ contentAlignment: value })}
                        />
                        <SelectControl
                            label={__('Banner Height', 'maysternya')}
                            value={height}
                            options={[
                                { label: __('Full Screen', 'maysternya'), value: 'full' },
                                { label: __('Large (80vh)', 'maysternya'), value: 'large' },
                                { label: __('Medium (60vh)', 'maysternya'), value: 'medium' },
                                { label: __('Small (400px)', 'maysternya'), value: 'small' }
                            ]}
                            onChange={(value) => setAttributes({ height: value })}
                        />
                        <SelectControl
                            label={__('Title Tag', 'maysternya')}
                            value={titleTag}
                            options={[
                                { label: 'H1', value: 'h1' },
                                { label: 'H2', value: 'h2' },
                                { label: 'H3', value: 'h3' },
                                { label: 'H4', value: 'h4' }
                            ]}
                            onChange={(value) => setAttributes({ titleTag: value })}
                        />
                    </PanelBody>
                    
                    <PanelBody title={__('Background Image', 'maysternya')} initialOpen={true}>
                        <MediaUploadCheck>
                            <MediaUpload
                                onSelect={(media) => setAttributes({ 
                                    backgroundImage: media.url, 
                                    backgroundImageId: media.id 
                                })}
                                allowedTypes={['image']}
                                value={attributes.backgroundImageId}
                                render={({ open }) => (
                                    <div>
                                        <Button 
                                            onClick={open}
                                            variant="secondary"
                                            style={{ marginBottom: '10px', width: '100%' }}
                                        >
                                            {backgroundImage ? __('Replace Image', 'maysternya') : __('Select Image', 'maysternya')}
                                        </Button>
                                        {backgroundImage && (
                                            <>
                                                <img 
                                                    src={backgroundImage} 
                                                    alt="" 
                                                    style={{ maxWidth: '100%', marginBottom: '10px' }} 
                                                />
                                                <Button
                                                    onClick={() => setAttributes({ backgroundImage: '', backgroundImageId: null })}
                                                    variant="link"
                                                    isDestructive
                                                >
                                                    {__('Remove Image', 'maysternya')}
                                                </Button>
                                            </>
                                        )}
                                    </div>
                                )}
                            />
                        </MediaUploadCheck>
                        
                        <ToggleControl
                            label={__('Show Overlay', 'maysternya')}
                            checked={showOverlay}
                            onChange={(value) => setAttributes({ showOverlay: value })}
                        />
                        
                        {showOverlay && (
                            <RangeControl
                                label={__('Overlay Opacity', 'maysternya')}
                                value={overlayOpacity}
                                onChange={(value) => setAttributes({ overlayOpacity: value })}
                                min={0}
                                max={100}
                            />
                        )}
                    </PanelBody>
                    
                    <PanelBody title={__('CTA Button', 'maysternya')} initialOpen={false}>
                        <ToggleControl
                            label={__('Show CTA Button', 'maysternya')}
                            checked={showCta}
                            onChange={(value) => setAttributes({ showCta: value })}
                        />
                        
                        {showCta && (
                            <>
                                <TextControl
                                    label={__('Button Text', 'maysternya')}
                                    value={ctaText}
                                    onChange={(value) => setAttributes({ ctaText: value })}
                                />
                                <TextControl
                                    label={__('Button URL', 'maysternya')}
                                    value={ctaUrl}
                                    onChange={(value) => setAttributes({ ctaUrl: value })}
                                />
                                <SelectControl
                                    label={__('Button Style', 'maysternya')}
                                    value={ctaStyle}
                                    options={[
                                        { label: __('Outline', 'maysternya'), value: 'outline' },
                                        { label: __('Filled', 'maysternya'), value: 'filled' }
                                    ]}
                                    onChange={(value) => setAttributes({ ctaStyle: value })}
                                />
                                <ToggleControl
                                    label={__('Show on Hover Only (Desktop)', 'maysternya')}
                                    help={__('Button always visible on mobile, only on hover for desktop', 'maysternya')}
                                    checked={ctaHoverOnly}
                                    onChange={(value) => setAttributes({ ctaHoverOnly: value })}
                                />
                            </>
                        )}
                    </PanelBody>
                </InspectorControls>
                
                <div {...blockProps}>
                    <div className="wp-block-maysternya-banner__background" style={placeholderStyle}>
                        {backgroundImage ? (
                            <img src={backgroundImage} alt="" />
                        ) : (
                            <span style={{ color: '#666', fontSize: '14px' }}>
                                {__('Select a background image', 'maysternya')}
                            </span>
                        )}
                    </div>
                    
                    {showOverlay && (
                        <div 
                            className="wp-block-maysternya-banner__overlay"
                            style={{ background: `rgba(0, 0, 0, ${overlayOpacity / 100})` }}
                        />
                    )}
                    
                    <div className="wp-block-maysternya-banner__content">
                        {pretitle !== '' && (
                            <RichText
                                tagName="span"
                                className="wp-block-maysternya-banner__pretitle"
                                value={pretitle}
                                onChange={(value) => setAttributes({ pretitle: value })}
                                placeholder={__('Pre-title text...', 'maysternya')}
                            />
                        )}
                        
                        <RichText
                            tagName={titleTag}
                            className="wp-block-maysternya-banner__title"
                            value={title}
                            onChange={(value) => setAttributes({ title: value })}
                            placeholder={__('Enter banner title...', 'maysternya')}
                        />
                        
                        {subtitle !== '' && (
                            <RichText
                                tagName="p"
                                className="wp-block-maysternya-banner__subtitle"
                                value={subtitle}
                                onChange={(value) => setAttributes({ subtitle: value })}
                                placeholder={__('Subtitle text...', 'maysternya')}
                            />
                        )}
                        
                        {showCta && (
                            <div className={`maysternya-cta-button ${ctaStyle === 'filled' ? 'maysternya-cta-button--filled' : ''} ${ctaHoverOnly ? 'maysternya-cta-hover-only' : ''}`}>
                                {ctaText || __('Button Text', 'maysternya')}
                            </div>
                        )}
                    </div>
                </div>
            </>
        );
    },
    
    save: function({ attributes }) {
        const blockProps = useBlockProps.save({
            className: `wp-block-maysternya-banner wp-block-maysternya-banner--align-${attributes.contentAlignment} wp-block-maysternya-banner--height-${attributes.height}`
        });
        
        const {
            pretitle,
            title,
            titleTag,
            subtitle,
            showCta,
            ctaText,
            ctaUrl,
            ctaStyle,
            ctaHoverOnly,
            backgroundImage,
            showOverlay,
            overlayOpacity
        } = attributes;
        
        const TitleTag = titleTag;
        
        return (
            <div {...blockProps}>
                <div className="wp-block-maysternya-banner__background">
                    {backgroundImage ? (
                        <img src={backgroundImage} alt="" />
                    ) : (
                        <div className="maysternya-placeholder-image" style={{ width: '100%', height: '100%' }}>
                            Placeholder Image
                        </div>
                    )}
                </div>
                
                {showOverlay && (
                    <div 
                        className="wp-block-maysternya-banner__overlay"
                        style={{ background: `rgba(0, 0, 0, ${overlayOpacity / 100})` }}
                    />
                )}
                
                <div className="wp-block-maysternya-banner__content">
                    {pretitle && (
                        <RichText.Content
                            tagName="span"
                            className="wp-block-maysternya-banner__pretitle"
                            value={pretitle}
                        />
                    )}
                    
                    <RichText.Content
                        tagName={TitleTag}
                        className="wp-block-maysternya-banner__title"
                        value={title}
                    />
                    
                    {subtitle && (
                        <RichText.Content
                            tagName="p"
                            className="wp-block-maysternya-banner__subtitle"
                            value={subtitle}
                        />
                    )}
                    
                    {showCta && ctaText && (
                        <a 
                            href={ctaUrl}
                            className={`maysternya-cta-button ${ctaStyle === 'filled' ? 'maysternya-cta-button--filled' : ''} ${ctaHoverOnly ? 'maysternya-cta-hover-only' : ''}`}
                        >
                            {ctaText}
                        </a>
                    )}
                </div>
            </div>
        );
    }
});
