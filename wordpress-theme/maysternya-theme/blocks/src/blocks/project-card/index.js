/**
 * Project Card Block
 * 
 * Card for displaying project information with image and metadata.
 * Based on Project card, Project card mob screenshots.
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

registerBlockType('maysternya/project-card', {
    title: __('Project Card', 'maysternya'),
    description: __('Card for displaying project information', 'maysternya'),
    icon: 'format-gallery',
    category: 'maysternya',
    keywords: [__('project', 'maysternya'), __('card', 'maysternya'), __('portfolio', 'maysternya')],
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
        location: {
            type: 'string',
            default: 'FARA-IN-SABINA'
        },
        author: {
            type: 'string',
            default: ''
        },
        director: {
            type: 'string',
            default: ''
        },
        linkUrl: {
            type: 'string',
            default: '#'
        }
    },
    
    edit: function({ attributes, setAttributes }) {
        const blockProps = useBlockProps({
            className: 'wp-block-maysternya-project-card'
        });
        
        const {
            image,
            badge,
            showBadge,
            title,
            location,
            author,
            director,
            linkUrl
        } = attributes;
        
        return (
            <>
                <InspectorControls>
                    <PanelBody title={__('Image', 'maysternya')} initialOpen={true}>
                        <MediaUploadCheck>
                            <MediaUpload
                                onSelect={(media) => setAttributes({ 
                                    image: media.url, 
                                    imageId: media.id 
                                })}
                                allowedTypes={['image']}
                                value={attributes.imageId}
                                render={({ open }) => (
                                    <div>
                                        <Button 
                                            onClick={open}
                                            variant="secondary"
                                            style={{ marginBottom: '10px', width: '100%' }}
                                        >
                                            {image ? __('Replace Image', 'maysternya') : __('Select Image', 'maysternya')}
                                        </Button>
                                        {image && (
                                            <>
                                                <img 
                                                    src={image} 
                                                    alt="" 
                                                    style={{ maxWidth: '100%', marginBottom: '10px' }} 
                                                />
                                                <Button
                                                    onClick={() => setAttributes({ image: '', imageId: null })}
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
                            label={__('Location', 'maysternya')}
                            value={location}
                            onChange={(value) => setAttributes({ location: value })}
                        />
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
                    </PanelBody>
                    
                    <PanelBody title={__('Link', 'maysternya')} initialOpen={false}>
                        <TextControl
                            label={__('Link URL', 'maysternya')}
                            value={linkUrl}
                            onChange={(value) => setAttributes({ linkUrl: value })}
                        />
                    </PanelBody>
                </InspectorControls>
                
                <div {...blockProps}>
                    <div className="wp-block-maysternya-project-card__link">
                        <div className="wp-block-maysternya-project-card__image-wrapper">
                            {image ? (
                                <img src={image} alt="" />
                            ) : (
                                <div className="maysternya-placeholder-image" style={{ aspectRatio: '1', width: '100%' }}>
                                    {__('Select an image', 'maysternya')}
                                </div>
                            )}
                            <div className="wp-block-maysternya-project-card__overlay">
                                {showBadge && (
                                    <span className="wp-block-maysternya-project-card__badge">{badge}</span>
                                )}
                                <RichText
                                    tagName="h3"
                                    className="wp-block-maysternya-project-card__title"
                                    value={title}
                                    onChange={(value) => setAttributes({ title: value })}
                                    placeholder={__('Project Title', 'maysternya')}
                                />
                            </div>
                        </div>
                        <div className="wp-block-maysternya-project-card__meta">
                            {location && <p>{location}</p>}
                            {author && <p>{author}</p>}
                            {director && <p>{director}</p>}
                        </div>
                    </div>
                </div>
            </>
        );
    },
    
    save: function({ attributes }) {
        const blockProps = useBlockProps.save({
            className: 'wp-block-maysternya-project-card'
        });
        
        const {
            image,
            badge,
            showBadge,
            title,
            location,
            author,
            director,
            linkUrl
        } = attributes;
        
        return (
            <article {...blockProps}>
                <a href={linkUrl} className="wp-block-maysternya-project-card__link">
                    <div className="wp-block-maysternya-project-card__image-wrapper">
                        {image ? (
                            <img src={image} alt="" />
                        ) : (
                            <div className="maysternya-placeholder-image" style={{ aspectRatio: '1', width: '100%' }}>
                                Placeholder Image
                            </div>
                        )}
                        <div className="wp-block-maysternya-project-card__overlay">
                            {showBadge && badge && (
                                <span className="wp-block-maysternya-project-card__badge">{badge}</span>
                            )}
                            <RichText.Content
                                tagName="h3"
                                className="wp-block-maysternya-project-card__title"
                                value={title}
                            />
                        </div>
                    </div>
                    <div className="wp-block-maysternya-project-card__meta">
                        {location && <p>{location}</p>}
                        {author && <p>{author}</p>}
                        {director && <p>{director}</p>}
                    </div>
                </a>
            </article>
        );
    }
});
