/**
 * Project Compact Block
 * 
 * Compact project listing item with horizontal layout.
 * Based on Project compact, Project compact mob screenshots.
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

registerBlockType('maysternya/project-compact', {
    title: __('Project Compact', 'maysternya'),
    description: __('Compact project listing item', 'maysternya'),
    icon: 'list-view',
    category: 'maysternya',
    keywords: [__('project', 'maysternya'), __('compact', 'maysternya'), __('list', 'maysternya')],
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
        showImage: {
            type: 'boolean',
            default: true
        },
        title: {
            type: 'string',
            default: 'THREE SISTERS'
        },
        author: {
            type: 'string',
            default: 'A.P Chekhov'
        },
        director: {
            type: 'string',
            default: 'Leonid Sadovsky'
        },
        year: {
            type: 'string',
            default: '2024'
        },
        showCta: {
            type: 'boolean',
            default: true
        },
        ctaText: {
            type: 'string',
            default: 'VIEW'
        },
        ctaUrl: {
            type: 'string',
            default: '#'
        }
    },
    
    edit: function({ attributes, setAttributes }) {
        const blockProps = useBlockProps({
            className: 'wp-block-maysternya-project-compact'
        });
        
        const { image, showImage, title, author, director, year, showCta, ctaText, ctaUrl } = attributes;
        
        return (
            <>
                <InspectorControls>
                    <PanelBody title={__('Image', 'maysternya')} initialOpen={true}>
                        <ToggleControl
                            label={__('Show Image', 'maysternya')}
                            checked={showImage}
                            onChange={(value) => setAttributes({ showImage: value })}
                        />
                        {showImage && (
                            <MediaUploadCheck>
                                <MediaUpload
                                    onSelect={(media) => setAttributes({ image: media.url, imageId: media.id })}
                                    allowedTypes={['image']}
                                    value={attributes.imageId}
                                    render={({ open }) => (
                                        <Button onClick={open} variant="secondary" style={{ marginBottom: '10px', width: '100%' }}>
                                            {image ? __('Replace Image', 'maysternya') : __('Select Image', 'maysternya')}
                                        </Button>
                                    )}
                                />
                            </MediaUploadCheck>
                        )}
                    </PanelBody>
                    
                    <PanelBody title={__('Metadata', 'maysternya')} initialOpen={false}>
                        <TextControl
                            label={__('Author', 'maysternya')}
                            value={author}
                            onChange={(value) => setAttributes({ author: value })}
                        />
                        <TextControl
                            label={__('Director', 'maysternya')}
                            value={director}
                            onChange={(value) => setAttributes({ director: value })}
                        />
                        <TextControl
                            label={__('Year', 'maysternya')}
                            value={year}
                            onChange={(value) => setAttributes({ year: value })}
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
                    <div className="wp-block-maysternya-project-compact__inner">
                        {showImage && (
                            <div className="wp-block-maysternya-project-compact__image">
                                {image ? (
                                    <img src={image} alt="" />
                                ) : (
                                    <div className="maysternya-placeholder-image" style={{ aspectRatio: '1', width: '100%' }}>
                                        {__('Image', 'maysternya')}
                                    </div>
                                )}
                            </div>
                        )}
                        
                        <div className="wp-block-maysternya-project-compact__content">
                            <RichText
                                tagName="h3"
                                className="wp-block-maysternya-project-compact__title"
                                value={title}
                                onChange={(value) => setAttributes({ title: value })}
                                placeholder={__('Project Title', 'maysternya')}
                            />
                            <div className="wp-block-maysternya-project-compact__meta">
                                {author && <span>{author}</span>}
                                {director && <span>Dir: {director}</span>}
                                {year && <span>{year}</span>}
                            </div>
                        </div>
                        
                        {showCta && (
                            <div className="wp-block-maysternya-project-compact__link">
                                <div className="maysternya-cta-button">
                                    {ctaText || __('View', 'maysternya')}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </>
        );
    },
    
    save: function({ attributes }) {
        const blockProps = useBlockProps.save({
            className: 'wp-block-maysternya-project-compact'
        });
        
        const { image, showImage, title, author, director, year, showCta, ctaText, ctaUrl } = attributes;
        
        return (
            <article {...blockProps}>
                <div className="wp-block-maysternya-project-compact__inner">
                    {showImage && (
                        <div className="wp-block-maysternya-project-compact__image">
                            {image ? (
                                <img src={image} alt="" />
                            ) : (
                                <div className="maysternya-placeholder-image">Placeholder</div>
                            )}
                        </div>
                    )}
                    
                    <div className="wp-block-maysternya-project-compact__content">
                        <RichText.Content
                            tagName="h3"
                            className="wp-block-maysternya-project-compact__title"
                            value={title}
                        />
                        <div className="wp-block-maysternya-project-compact__meta">
                            {author && <span>{author}</span>}
                            {director && <span>Dir: {director}</span>}
                            {year && <span>{year}</span>}
                        </div>
                    </div>
                    
                    {showCta && ctaText && (
                        <div className="wp-block-maysternya-project-compact__link">
                            <a href={ctaUrl} className="maysternya-cta-button">
                                {ctaText}
                            </a>
                        </div>
                    )}
                </div>
            </article>
        );
    }
});
