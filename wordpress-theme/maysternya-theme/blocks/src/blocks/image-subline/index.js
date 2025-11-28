/**
 * Image + Subline Block
 * 
 * Image with subline text below.
 * Based on Image+subline 1, Image+subline 2 screenshots.
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
    SelectControl, 
    Button,
    TextControl
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

registerBlockType('maysternya/image-subline', {
    title: __('Image + Subline', 'maysternya'),
    description: __('Image with subline text below', 'maysternya'),
    icon: 'format-image',
    category: 'maysternya',
    keywords: [__('image', 'maysternya'), __('caption', 'maysternya'), __('subline', 'maysternya')],
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
        subline: {
            type: 'string',
            default: 'Lorem ipsum dolor sit amet'
        },
        sublineAlignment: {
            type: 'string',
            default: 'right'
        },
        link: {
            type: 'string',
            default: ''
        }
    },
    
    edit: function({ attributes, setAttributes }) {
        const blockProps = useBlockProps({
            className: 'wp-block-maysternya-image-subline'
        });
        
        const { image, subline, sublineAlignment, link } = attributes;
        
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
                    
                    <PanelBody title={__('Subline', 'maysternya')} initialOpen={true}>
                        <SelectControl
                            label={__('Alignment', 'maysternya')}
                            value={sublineAlignment}
                            options={[
                                { label: __('Left', 'maysternya'), value: 'left' },
                                { label: __('Center', 'maysternya'), value: 'center' },
                                { label: __('Right', 'maysternya'), value: 'right' }
                            ]}
                            onChange={(value) => setAttributes({ sublineAlignment: value })}
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
                    <div className="wp-block-maysternya-image-subline__image">
                        {image ? (
                            <img src={image} alt="" />
                        ) : (
                            <div className="maysternya-placeholder-image" style={{ aspectRatio: '16/9', width: '100%' }}>
                                {__('Select an image', 'maysternya')}
                            </div>
                        )}
                    </div>
                    <RichText
                        tagName="p"
                        className="wp-block-maysternya-image-subline__subline"
                        value={subline}
                        onChange={(value) => setAttributes({ subline: value })}
                        placeholder={__('Enter subline text...', 'maysternya')}
                        style={{ textAlign: sublineAlignment }}
                    />
                </div>
            </>
        );
    },
    
    save: function({ attributes }) {
        const blockProps = useBlockProps.save({
            className: 'wp-block-maysternya-image-subline'
        });
        
        const { image, subline, sublineAlignment, link } = attributes;
        
        const content = (
            <>
                <div className="wp-block-maysternya-image-subline__image">
                    {image ? (
                        <img src={image} alt="" />
                    ) : (
                        <div className="maysternya-placeholder-image">Placeholder</div>
                    )}
                </div>
                {subline && (
                    <RichText.Content
                        tagName="p"
                        className="wp-block-maysternya-image-subline__subline"
                        value={subline}
                        style={{ textAlign: sublineAlignment }}
                    />
                )}
            </>
        );
        
        return link ? (
            <a {...blockProps} href={link}>
                {content}
            </a>
        ) : (
            <div {...blockProps}>
                {content}
            </div>
        );
    }
});
