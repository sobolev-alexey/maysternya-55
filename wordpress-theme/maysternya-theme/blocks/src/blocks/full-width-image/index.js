/**
 * Full Width Image Block
 * 
 * Full-width image display.
 * Based on Image full size screenshot.
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
    SelectControl, 
    Button,
    TextControl
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

registerBlockType('maysternya/full-width-image', {
    title: __('Full Width Image', 'maysternya'),
    description: __('Full-width image display', 'maysternya'),
    icon: 'format-image',
    category: 'maysternya',
    keywords: [__('image', 'maysternya'), __('full', 'maysternya'), __('width', 'maysternya')],
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
        alt: {
            type: 'string',
            default: ''
        },
        height: {
            type: 'string',
            default: 'auto'
        },
        link: {
            type: 'string',
            default: ''
        }
    },
    
    edit: function({ attributes, setAttributes }) {
        const blockProps = useBlockProps({
            className: `wp-block-maysternya-full-width-image wp-block-maysternya-full-width-image--height-${attributes.height}`
        });
        
        const { image, alt, height, link } = attributes;
        
        return (
            <>
                <InspectorControls>
                    <PanelBody title={__('Image', 'maysternya')} initialOpen={true}>
                        <MediaUploadCheck>
                            <MediaUpload
                                onSelect={(media) => setAttributes({ image: media.url, imageId: media.id, alt: media.alt || '' })}
                                allowedTypes={['image']}
                                value={attributes.imageId}
                                render={({ open }) => (
                                    <div>
                                        <Button onClick={open} variant="secondary" style={{ marginBottom: '10px', width: '100%' }}>
                                            {image ? __('Replace Image', 'maysternya') : __('Select Image', 'maysternya')}
                                        </Button>
                                        {image && (
                                            <>
                                                <img src={image} alt="" style={{ maxWidth: '100%', marginBottom: '10px' }} />
                                                <Button onClick={() => setAttributes({ image: '', imageId: null })} variant="link" isDestructive>
                                                    {__('Remove Image', 'maysternya')}
                                                </Button>
                                            </>
                                        )}
                                    </div>
                                )}
                            />
                        </MediaUploadCheck>
                        <TextControl
                            label={__('Alt Text', 'maysternya')}
                            value={alt}
                            onChange={(value) => setAttributes({ alt: value })}
                        />
                    </PanelBody>
                    
                    <PanelBody title={__('Height', 'maysternya')} initialOpen={false}>
                        <SelectControl
                            label={__('Image Height', 'maysternya')}
                            value={height}
                            options={[
                                { label: __('Auto', 'maysternya'), value: 'auto' },
                                { label: __('Medium (50vh)', 'maysternya'), value: 'medium' },
                                { label: __('Large (70vh)', 'maysternya'), value: 'large' },
                                { label: __('Full Screen', 'maysternya'), value: 'full' }
                            ]}
                            onChange={(value) => setAttributes({ height: value })}
                        />
                    </PanelBody>
                    
                    <PanelBody title={__('Link', 'maysternya')} initialOpen={false}>
                        <TextControl
                            label={__('Link URL', 'maysternya')}
                            value={link}
                            onChange={(value) => setAttributes({ link: value })}
                        />
                    </PanelBody>
                </InspectorControls>
                
                <div {...blockProps}>
                    <div className="wp-block-maysternya-full-width-image__image">
                        {image ? (
                            <img src={image} alt={alt} />
                        ) : (
                            <div className="maysternya-placeholder-image" style={{ aspectRatio: '21/9', width: '100%' }}>
                                {__('Select an image', 'maysternya')}
                            </div>
                        )}
                    </div>
                </div>
            </>
        );
    },
    
    save: function({ attributes }) {
        const blockProps = useBlockProps.save({
            className: `wp-block-maysternya-full-width-image wp-block-maysternya-full-width-image--height-${attributes.height}`
        });
        
        const { image, alt, link } = attributes;
        
        const imageElement = (
            <div className="wp-block-maysternya-full-width-image__image">
                {image ? (
                    <img src={image} alt={alt} />
                ) : (
                    <div className="maysternya-placeholder-image">Placeholder</div>
                )}
            </div>
        );
        
        return link ? (
            <a {...blockProps} href={link}>
                {imageElement}
            </a>
        ) : (
            <div {...blockProps}>
                {imageElement}
            </div>
        );
    }
});
