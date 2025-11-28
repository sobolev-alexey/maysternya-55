/**
 * Project Landing Card Block
 * 
 * Large project card for landing pages with full background image.
 * Based on Project landing card, Project landing card mob screenshots.
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
    ToggleControl, 
    Button,
    RangeControl
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

registerBlockType('maysternya/project-landing-card', {
    title: __('Project Landing Card', 'maysternya'),
    description: __('Large project card for landing pages', 'maysternya'),
    icon: 'format-gallery',
    category: 'maysternya',
    keywords: [__('project', 'maysternya'), __('landing', 'maysternya'), __('hero', 'maysternya')],
    supports: {
        align: ['full', 'wide'],
        html: false
    },
    attributes: {
        image: {
            type: 'string',
            default: ''
        },
        imageId: {
            type: 'number'
        },
        badge: {
            type: 'string',
            default: 'MAYSTERNYA 55'
        },
        showBadge: {
            type: 'boolean',
            default: true
        },
        title: {
            type: 'string',
            default: 'FLIPT\nFESTIVAL'
        },
        meta: {
            type: 'string',
            default: 'FARA-IN-SABINA, ITALY'
        },
        showCta: {
            type: 'boolean',
            default: true
        },
        ctaText: {
            type: 'string',
            default: 'VIEW PROJECT'
        },
        ctaUrl: {
            type: 'string',
            default: '#'
        },
        minHeight: {
            type: 'number',
            default: 500
        }
    },
    
    edit: function({ attributes, setAttributes }) {
        const blockProps = useBlockProps({
            className: 'wp-block-maysternya-project-landing-card'
        });
        
        const { image, badge, showBadge, title, meta, showCta, ctaText, ctaUrl, minHeight } = attributes;
        
        return (
            <>
                <InspectorControls>
                    <PanelBody title={__('Image', 'maysternya')} initialOpen={true}>
                        <MediaUploadCheck>
                            <MediaUpload
                                onSelect={(media) => setAttributes({ image: media.url, imageId: media.id })}
                                allowedTypes={['image']}
                                value={attributes.imageId}
                                render={({ open }) => (
                                    <div>
                                        <Button onClick={open} variant="secondary" style={{ marginBottom: '10px', width: '100%' }}>
                                            {image ? __('Replace Image', 'maysternya') : __('Select Image', 'maysternya')}
                                        </Button>
                                        {image && (
                                            <Button onClick={() => setAttributes({ image: '', imageId: null })} variant="link" isDestructive>
                                                {__('Remove Image', 'maysternya')}
                                            </Button>
                                        )}
                                    </div>
                                )}
                            />
                        </MediaUploadCheck>
                        <RangeControl
                            label={__('Minimum Height (px)', 'maysternya')}
                            value={minHeight}
                            onChange={(value) => setAttributes({ minHeight: value })}
                            min={300}
                            max={800}
                        />
                    </PanelBody>
                    
                    <PanelBody title={__('Badge', 'maysternya')} initialOpen={false}>
                        <ToggleControl
                            label={__('Show Badge', 'maysternya')}
                            checked={showBadge}
                            onChange={(value) => setAttributes({ showBadge: value })}
                        />
                        {showBadge && (
                            <TextControl
                                label={__('Badge Text', 'maysternya')}
                                value={badge}
                                onChange={(value) => setAttributes({ badge: value })}
                            />
                        )}
                    </PanelBody>
                    
                    <PanelBody title={__('Metadata', 'maysternya')} initialOpen={false}>
                        <TextControl
                            label={__('Meta Text', 'maysternya')}
                            value={meta}
                            onChange={(value) => setAttributes({ meta: value })}
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
                            </>
                        )}
                    </PanelBody>
                </InspectorControls>
                
                <div {...blockProps} style={{ minHeight: `${minHeight}px` }}>
                    <div className="wp-block-maysternya-project-landing-card__background">
                        {image ? (
                            <img src={image} alt="" />
                        ) : (
                            <div className="maysternya-placeholder-image" style={{ width: '100%', height: '100%', minHeight: `${minHeight}px` }}>
                                {__('Select an image', 'maysternya')}
                            </div>
                        )}
                    </div>
                    
                    <div className="wp-block-maysternya-project-landing-card__content">
                        {showBadge && badge && (
                            <span className="wp-block-maysternya-project-landing-card__badge">{badge}</span>
                        )}
                        
                        <RichText
                            tagName="h2"
                            className="wp-block-maysternya-project-landing-card__title"
                            value={title}
                            onChange={(value) => setAttributes({ title: value })}
                            placeholder={__('Project Title', 'maysternya')}
                        />
                        
                        {meta && (
                            <p className="wp-block-maysternya-project-landing-card__meta">{meta}</p>
                        )}
                        
                        {showCta && (
                            <div className="maysternya-cta-button maysternya-cta-hover-only">
                                {ctaText || __('View Project', 'maysternya')}
                            </div>
                        )}
                    </div>
                </div>
            </>
        );
    },
    
    save: function({ attributes }) {
        const blockProps = useBlockProps.save({
            className: 'wp-block-maysternya-project-landing-card'
        });
        
        const { image, badge, showBadge, title, meta, showCta, ctaText, ctaUrl, minHeight } = attributes;
        
        return (
            <article {...blockProps} style={{ minHeight: `${minHeight}px` }}>
                <div className="wp-block-maysternya-project-landing-card__background">
                    {image ? (
                        <img src={image} alt="" />
                    ) : (
                        <div className="maysternya-placeholder-image">Placeholder</div>
                    )}
                </div>
                
                <div className="wp-block-maysternya-project-landing-card__content">
                    {showBadge && badge && (
                        <span className="wp-block-maysternya-project-landing-card__badge">{badge}</span>
                    )}
                    
                    <RichText.Content
                        tagName="h2"
                        className="wp-block-maysternya-project-landing-card__title"
                        value={title}
                    />
                    
                    {meta && (
                        <p className="wp-block-maysternya-project-landing-card__meta">{meta}</p>
                    )}
                    
                    {showCta && ctaText && (
                        <a href={ctaUrl} className="maysternya-cta-button maysternya-cta-hover-only">
                            {ctaText}
                        </a>
                    )}
                </div>
            </article>
        );
    }
});
