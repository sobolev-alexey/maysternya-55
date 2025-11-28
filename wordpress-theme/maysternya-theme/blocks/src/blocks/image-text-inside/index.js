/**
 * Image + Text Inside Block
 * 
 * Image with text overlay inside.
 * Based on Image+Text inside, Image+Text inside mob screenshots.
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

registerBlockType('maysternya/image-text-inside', {
    title: __('Image + Text Inside', 'maysternya'),
    description: __('Image with text overlay inside', 'maysternya'),
    icon: 'format-image',
    category: 'maysternya',
    keywords: [__('image', 'maysternya'), __('text', 'maysternya'), __('overlay', 'maysternya')],
    supports: {
        align: ['full', 'wide'],
        html: false
    },
    attributes: {
        backgroundImage: {
            type: 'string',
            default: ''
        },
        backgroundImageId: {
            type: 'number'
        },
        title: {
            type: 'string',
            default: 'LOREM IPSUM\nDOLOR SIT'
        },
        titleTag: {
            type: 'string',
            default: 'h2'
        },
        text: {
            type: 'string',
            default: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.'
        },
        showCta: {
            type: 'boolean',
            default: true
        },
        ctaText: {
            type: 'string',
            default: 'LEARN MORE'
        },
        ctaUrl: {
            type: 'string',
            default: '#'
        },
        ctaHoverOnly: {
            type: 'boolean',
            default: false
        },
        contentPosition: {
            type: 'string',
            default: 'center'
        },
        minHeight: {
            type: 'number',
            default: 500
        }
    },
    
    edit: function({ attributes, setAttributes }) {
        const blockProps = useBlockProps({
            className: `wp-block-maysternya-image-text-inside wp-block-maysternya-image-text-inside--content-${attributes.contentPosition}`
        });
        
        const {
            backgroundImage,
            title,
            titleTag,
            text,
            showCta,
            ctaText,
            ctaUrl,
            ctaHoverOnly,
            contentPosition,
            minHeight
        } = attributes;
        
        const TitleTag = titleTag;
        
        return (
            <>
                <InspectorControls>
                    <PanelBody title={__('Image', 'maysternya')} initialOpen={true}>
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
                        <RangeControl
                            label={__('Minimum Height (px)', 'maysternya')}
                            value={minHeight}
                            onChange={(value) => setAttributes({ minHeight: value })}
                            min={200}
                            max={800}
                        />
                    </PanelBody>
                    
                    <PanelBody title={__('Content Settings', 'maysternya')} initialOpen={false}>
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
                        <SelectControl
                            label={__('Content Position', 'maysternya')}
                            value={contentPosition}
                            options={[
                                { label: __('Center', 'maysternya'), value: 'center' },
                                { label: __('Left', 'maysternya'), value: 'left' },
                                { label: __('Right', 'maysternya'), value: 'right' },
                                { label: __('Bottom', 'maysternya'), value: 'bottom' }
                            ]}
                            onChange={(value) => setAttributes({ contentPosition: value })}
                        />
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
                                <ToggleControl
                                    label={__('Show on Hover Only (Desktop)', 'maysternya')}
                                    checked={ctaHoverOnly}
                                    onChange={(value) => setAttributes({ ctaHoverOnly: value })}
                                />
                            </>
                        )}
                    </PanelBody>
                </InspectorControls>
                
                <div {...blockProps} style={{ minHeight: `${minHeight}px` }}>
                    <div className="wp-block-maysternya-image-text-inside__background">
                        {backgroundImage ? (
                            <img src={backgroundImage} alt="" />
                        ) : (
                            <div className="maysternya-placeholder-image" style={{ width: '100%', height: '100%', minHeight: `${minHeight}px` }}>
                                {__('Select an image', 'maysternya')}
                            </div>
                        )}
                    </div>
                    
                    <div className="wp-block-maysternya-image-text-inside__content">
                        <RichText
                            tagName={TitleTag}
                            className="wp-block-maysternya-image-text-inside__title"
                            value={title}
                            onChange={(value) => setAttributes({ title: value })}
                            placeholder={__('Enter title...', 'maysternya')}
                        />
                        
                        <RichText
                            tagName="p"
                            className="wp-block-maysternya-image-text-inside__text"
                            value={text}
                            onChange={(value) => setAttributes({ text: value })}
                            placeholder={__('Enter text...', 'maysternya')}
                        />
                        
                        {showCta && (
                            <div className={`maysternya-cta-button ${ctaHoverOnly ? 'maysternya-cta-hover-only' : ''}`}>
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
            className: `wp-block-maysternya-image-text-inside wp-block-maysternya-image-text-inside--content-${attributes.contentPosition}`
        });
        
        const {
            backgroundImage,
            title,
            titleTag,
            text,
            showCta,
            ctaText,
            ctaUrl,
            ctaHoverOnly,
            minHeight
        } = attributes;
        
        const TitleTag = titleTag;
        
        return (
            <div {...blockProps} style={{ minHeight: `${minHeight}px` }}>
                <div className="wp-block-maysternya-image-text-inside__background">
                    {backgroundImage ? (
                        <img src={backgroundImage} alt="" />
                    ) : (
                        <div className="maysternya-placeholder-image" style={{ width: '100%', height: '100%' }}>
                            Placeholder Image
                        </div>
                    )}
                </div>
                
                <div className="wp-block-maysternya-image-text-inside__content">
                    <RichText.Content
                        tagName={TitleTag}
                        className="wp-block-maysternya-image-text-inside__title"
                        value={title}
                    />
                    
                    {text && (
                        <RichText.Content
                            tagName="p"
                            className="wp-block-maysternya-image-text-inside__text"
                            value={text}
                        />
                    )}
                    
                    {showCta && ctaText && (
                        <a 
                            href={ctaUrl}
                            className={`maysternya-cta-button ${ctaHoverOnly ? 'maysternya-cta-hover-only' : ''}`}
                        >
                            {ctaText}
                        </a>
                    )}
                </div>
            </div>
        );
    }
});
