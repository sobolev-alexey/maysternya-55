/**
 * Image + Icon Block
 * 
 * Image with icon overlay.
 * Based on Image+icon, Image+icon mob screenshots.
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
    Button
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

registerBlockType('maysternya/image-icon', {
    title: __('Image + Icon', 'maysternya'),
    description: __('Image with icon overlay', 'maysternya'),
    icon: 'format-image',
    category: 'maysternya',
    keywords: [__('image', 'maysternya'), __('icon', 'maysternya'), __('logo', 'maysternya')],
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
        icon: {
            type: 'string',
            default: ''
        },
        iconId: {
            type: 'number'
        },
        iconPosition: {
            type: 'string',
            default: 'bottom-right'
        }
    },
    
    edit: function({ attributes, setAttributes }) {
        const blockProps = useBlockProps({
            className: 'wp-block-maysternya-image-icon'
        });
        
        const { image, icon, iconPosition } = attributes;
        
        return (
            <>
                <InspectorControls>
                    <PanelBody title={__('Main Image', 'maysternya')} initialOpen={true}>
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
                    
                    <PanelBody title={__('Icon', 'maysternya')} initialOpen={true}>
                        <MediaUploadCheck>
                            <MediaUpload
                                onSelect={(media) => setAttributes({ icon: media.url, iconId: media.id })}
                                allowedTypes={['image']}
                                value={attributes.iconId}
                                render={({ open }) => (
                                    <div>
                                        <Button onClick={open} variant="secondary" style={{ marginBottom: '10px', width: '100%' }}>
                                            {icon ? __('Replace Icon', 'maysternya') : __('Select Icon', 'maysternya')}
                                        </Button>
                                        {icon && (
                                            <Button onClick={() => setAttributes({ icon: '', iconId: null })} variant="link" isDestructive>
                                                {__('Remove Icon', 'maysternya')}
                                            </Button>
                                        )}
                                    </div>
                                )}
                            />
                        </MediaUploadCheck>
                        <SelectControl
                            label={__('Icon Position', 'maysternya')}
                            value={iconPosition}
                            options={[
                                { label: __('Bottom Right', 'maysternya'), value: 'bottom-right' },
                                { label: __('Bottom Left', 'maysternya'), value: 'bottom-left' },
                                { label: __('Top Right', 'maysternya'), value: 'top-right' },
                                { label: __('Top Left', 'maysternya'), value: 'top-left' },
                                { label: __('Center', 'maysternya'), value: 'center' }
                            ]}
                            onChange={(value) => setAttributes({ iconPosition: value })}
                        />
                    </PanelBody>
                </InspectorControls>
                
                <div {...blockProps}>
                    <div className="wp-block-maysternya-image-icon__image">
                        {image ? (
                            <img src={image} alt="" />
                        ) : (
                            <div className="maysternya-placeholder-image" style={{ aspectRatio: '16/9', width: '100%' }}>
                                {__('Select an image', 'maysternya')}
                            </div>
                        )}
                    </div>
                    {icon && (
                        <div className={`wp-block-maysternya-image-icon__icon wp-block-maysternya-image-icon__icon--${iconPosition}`}>
                            <img src={icon} alt="" />
                        </div>
                    )}
                </div>
            </>
        );
    },
    
    save: function({ attributes }) {
        const blockProps = useBlockProps.save({
            className: 'wp-block-maysternya-image-icon'
        });
        
        const { image, icon, iconPosition } = attributes;
        
        return (
            <div {...blockProps}>
                <div className="wp-block-maysternya-image-icon__image">
                    {image ? (
                        <img src={image} alt="" />
                    ) : (
                        <div className="maysternya-placeholder-image">Placeholder</div>
                    )}
                </div>
                {icon && (
                    <div className={`wp-block-maysternya-image-icon__icon wp-block-maysternya-image-icon__icon--${iconPosition}`}>
                        <img src={icon} alt="" />
                    </div>
                )}
            </div>
        );
    }
});
