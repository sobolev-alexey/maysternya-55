/**
 * Small Image Grid Block
 * 
 * Grid layout for displaying multiple smaller images.
 * Based on Small image grid, Small image grid mob screenshots.
 */

import { registerBlockType } from '@wordpress/blocks';
import { 
    InspectorControls, 
    MediaUpload, 
    MediaUploadCheck, 
    useBlockProps 
} from '@wordpress/block-editor';
import { 
    PanelBody, 
    TextControl, 
    Button,
    RangeControl
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

registerBlockType('maysternya/small-image-grid', {
    title: __('Small Image Grid', 'maysternya'),
    description: __('Grid layout for displaying multiple smaller images', 'maysternya'),
    icon: 'screenoptions',
    category: 'maysternya',
    keywords: [__('image', 'maysternya'), __('grid', 'maysternya'), __('gallery', 'maysternya'), __('small', 'maysternya')],
    supports: {
        align: ['full', 'wide'],
        html: false
    },
    attributes: {
        images: {
            type: 'array',
            default: []
        },
        columns: {
            type: 'number',
            default: 4
        },
        gap: {
            type: 'number',
            default: 24
        }
    },
    
    edit: function({ attributes, setAttributes }) {
        const blockProps = useBlockProps({
            className: 'wp-block-maysternya-small-image-grid'
        });
        
        const { images, columns, gap } = attributes;
        
        const addImage = (media) => {
            const newImages = [...images, {
                id: media.id,
                url: media.url,
                title: '',
                link: ''
            }];
            setAttributes({ images: newImages });
        };
        
        const removeImage = (index) => {
            const newImages = images.filter((_, i) => i !== index);
            setAttributes({ images: newImages });
        };
        
        const updateImage = (index, field, value) => {
            const newImages = images.map((img, i) => {
                if (i === index) {
                    return { ...img, [field]: value };
                }
                return img;
            });
            setAttributes({ images: newImages });
        };
        
        return (
            <>
                <InspectorControls>
                    <PanelBody title={__('Grid Settings', 'maysternya')} initialOpen={true}>
                        <RangeControl
                            label={__('Columns (Desktop)', 'maysternya')}
                            value={columns}
                            onChange={(value) => setAttributes({ columns: value })}
                            min={2}
                            max={6}
                        />
                        <RangeControl
                            label={__('Gap (px)', 'maysternya')}
                            value={gap}
                            onChange={(value) => setAttributes({ gap: value })}
                            min={0}
                            max={60}
                        />
                    </PanelBody>
                    
                    <PanelBody title={__('Images', 'maysternya')} initialOpen={true}>
                        <MediaUploadCheck>
                            <MediaUpload
                                onSelect={addImage}
                                allowedTypes={['image']}
                                render={({ open }) => (
                                    <Button onClick={open} variant="primary" style={{ marginBottom: '16px', width: '100%' }}>
                                        {__('Add Image', 'maysternya')}
                                    </Button>
                                )}
                            />
                        </MediaUploadCheck>
                        
                        {images.map((image, index) => (
                            <div key={index} style={{ marginBottom: '16px', padding: '12px', background: '#f0f0f0', borderRadius: '4px' }}>
                                <img src={image.url} alt="" style={{ width: '100%', marginBottom: '8px' }} />
                                <TextControl
                                    label={__('Title (optional)', 'maysternya')}
                                    value={image.title}
                                    onChange={(value) => updateImage(index, 'title', value)}
                                />
                                <TextControl
                                    label={__('Link URL (optional)', 'maysternya')}
                                    value={image.link}
                                    onChange={(value) => updateImage(index, 'link', value)}
                                />
                                <Button onClick={() => removeImage(index)} variant="link" isDestructive>
                                    {__('Remove', 'maysternya')}
                                </Button>
                            </div>
                        ))}
                    </PanelBody>
                </InspectorControls>
                
                <div {...blockProps}>
                    <div 
                        className="wp-block-maysternya-small-image-grid__inner"
                        style={{ 
                            gridTemplateColumns: `repeat(${columns}, 1fr)`,
                            gap: `${gap}px`
                        }}
                    >
                        {images.length > 0 ? images.map((image, index) => (
                            <div key={index} className="wp-block-maysternya-small-image-grid__item">
                                <img src={image.url} alt={image.title || ''} />
                                {image.title && (
                                    <div className="wp-block-maysternya-small-image-grid__overlay">
                                        <h4>{image.title}</h4>
                                    </div>
                                )}
                            </div>
                        )) : (
                            <div className="maysternya-editor-placeholder" style={{ gridColumn: `span ${columns}` }}>
                                <span className="maysternya-editor-placeholder__text">
                                    {__('Add images from the sidebar', 'maysternya')}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </>
        );
    },
    
    save: function({ attributes }) {
        const blockProps = useBlockProps.save({
            className: 'wp-block-maysternya-small-image-grid'
        });
        
        const { images, columns, gap } = attributes;
        
        return (
            <div {...blockProps}>
                <div 
                    className="wp-block-maysternya-small-image-grid__inner"
                    style={{ gap: `${gap}px` }}
                >
                    {images.map((image, index) => {
                        const content = (
                            <>
                                <img src={image.url} alt={image.title || ''} />
                                {image.title && (
                                    <div className="wp-block-maysternya-small-image-grid__overlay">
                                        <h4>{image.title}</h4>
                                    </div>
                                )}
                            </>
                        );
                        
                        return image.link ? (
                            <a key={index} href={image.link} className="wp-block-maysternya-small-image-grid__item">
                                {content}
                            </a>
                        ) : (
                            <div key={index} className="wp-block-maysternya-small-image-grid__item">
                                {content}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
});
