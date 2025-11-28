/**
 * Educational Project Card Block
 * 
 * Card for displaying educational project information.
 * Based on Educational project card mob screenshot.
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
    Button
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

registerBlockType('maysternya/educational-project-card', {
    title: __('Educational Project Card', 'maysternya'),
    description: __('Card for displaying educational project information', 'maysternya'),
    icon: 'welcome-learn-more',
    category: 'maysternya',
    keywords: [__('educational', 'maysternya'), __('project', 'maysternya'), __('course', 'maysternya')],
    supports: {
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
            default: 'EDUCATIONAL'
        },
        showBadge: {
            type: 'boolean',
            default: true
        },
        title: {
            type: 'string',
            default: 'WORKSHOP NAME'
        },
        description: {
            type: 'string',
            default: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.'
        },
        duration: {
            type: 'string',
            default: '3 days'
        },
        participants: {
            type: 'string',
            default: '12 participants'
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
        }
    },
    
    edit: function({ attributes, setAttributes }) {
        const blockProps = useBlockProps({
            className: 'wp-block-maysternya-educational-project-card'
        });
        
        const { image, badge, showBadge, title, description, duration, participants, showCta, ctaText, ctaUrl } = attributes;
        
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
                            label={__('Duration', 'maysternya')}
                            value={duration}
                            onChange={(value) => setAttributes({ duration: value })}
                        />
                        <TextControl
                            label={__('Participants', 'maysternya')}
                            value={participants}
                            onChange={(value) => setAttributes({ participants: value })}
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
                
                <div {...blockProps}>
                    <div className="wp-block-maysternya-educational-project-card__image">
                        {image ? (
                            <img src={image} alt="" />
                        ) : (
                            <div className="maysternya-placeholder-image" style={{ aspectRatio: '16/9', width: '100%' }}>
                                {__('Select an image', 'maysternya')}
                            </div>
                        )}
                        {showBadge && badge && (
                            <span className="wp-block-maysternya-educational-project-card__badge">{badge}</span>
                        )}
                    </div>
                    
                    <div className="wp-block-maysternya-educational-project-card__content">
                        <RichText
                            tagName="h3"
                            className="wp-block-maysternya-educational-project-card__title"
                            value={title}
                            onChange={(value) => setAttributes({ title: value })}
                            placeholder={__('Project Title', 'maysternya')}
                        />
                        
                        <RichText
                            tagName="p"
                            className="wp-block-maysternya-educational-project-card__description"
                            value={description}
                            onChange={(value) => setAttributes({ description: value })}
                            placeholder={__('Description...', 'maysternya')}
                        />
                        
                        <div className="wp-block-maysternya-educational-project-card__meta">
                            {duration && <span>{duration}</span>}
                            {participants && <span>{participants}</span>}
                        </div>
                        
                        {showCta && (
                            <div className="maysternya-cta-button">
                                {ctaText || __('Learn More', 'maysternya')}
                            </div>
                        )}
                    </div>
                </div>
            </>
        );
    },
    
    save: function({ attributes }) {
        const blockProps = useBlockProps.save({
            className: 'wp-block-maysternya-educational-project-card'
        });
        
        const { image, badge, showBadge, title, description, duration, participants, showCta, ctaText, ctaUrl } = attributes;
        
        return (
            <article {...blockProps}>
                <div className="wp-block-maysternya-educational-project-card__image">
                    {image ? (
                        <img src={image} alt="" />
                    ) : (
                        <div className="maysternya-placeholder-image">Placeholder</div>
                    )}
                    {showBadge && badge && (
                        <span className="wp-block-maysternya-educational-project-card__badge">{badge}</span>
                    )}
                </div>
                
                <div className="wp-block-maysternya-educational-project-card__content">
                    <RichText.Content
                        tagName="h3"
                        className="wp-block-maysternya-educational-project-card__title"
                        value={title}
                    />
                    
                    {description && (
                        <RichText.Content
                            tagName="p"
                            className="wp-block-maysternya-educational-project-card__description"
                            value={description}
                        />
                    )}
                    
                    <div className="wp-block-maysternya-educational-project-card__meta">
                        {duration && <span>{duration}</span>}
                        {participants && <span>{participants}</span>}
                    </div>
                    
                    {showCta && ctaText && (
                        <a href={ctaUrl} className="maysternya-cta-button">
                            {ctaText}
                        </a>
                    )}
                </div>
            </article>
        );
    }
});
