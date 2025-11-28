/**
 * Image Grid Block (2 images)
 * 
 * Grid layout for displaying 2 images side by side.
 * Based on Image grid (2 images) screenshot.
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

registerBlockType('maysternya/image-grid', {
    title: __('Image Grid (2 Images)', 'maysternya'),
    description: __('Grid layout for displaying 2 images side by side', 'maysternya'),
    icon: 'grid-view',
    category: 'maysternya',
    keywords: [__('image', 'maysternya'), __('grid', 'maysternya'), __('gallery', 'maysternya')],
    supports: {
        align: ['full', 'wide'],
        html: false
    },
    attributes: {
        image1: {
            type: 'string',
            default: ''
        },
        image1Id: {
            type: 'number'
        },
        caption1Title: {
            type: 'string',
            default: 'IMAGE TITLE'
        },
        caption1Text: {
            type: 'string',
            default: 'Lorem ipsum dolor'
        },
        showCaption1: {
            type: 'boolean',
            default: true
        },
        image2: {
            type: 'string',
            default: ''
        },
        image2Id: {
            type: 'number'
        },
        caption2Title: {
            type: 'string',
            default: 'IMAGE TITLE'
        },
        caption2Text: {
            type: 'string',
            default: 'Lorem ipsum dolor'
        },
        showCaption2: {
            type: 'boolean',
            default: true
        },
        link1: {
            type: 'string',
            default: ''
        },
        link2: {
            type: 'string',
            default: ''
        }
    },
    
    edit: function({ attributes, setAttributes }) {
        const blockProps = useBlockProps({
            className: 'wp-block-maysternya-image-grid'
        });
        
        const {
            image1, caption1Title, caption1Text, showCaption1, link1,
            image2, caption2Title, caption2Text, showCaption2, link2
        } = attributes;
        
        return (
            <>
                <InspectorControls>
                    <PanelBody title={__('Image 1', 'maysternya')} initialOpen={true}>
                        <MediaUploadCheck>
                            <MediaUpload
                                onSelect={(media) => setAttributes({ image1: media.url, image1Id: media.id })}
                                allowedTypes={['image']}
                                value={attributes.image1Id}
                                render={({ open }) => (
                                    <Button onClick={open} variant="secondary" style={{ marginBottom: '10px', width: '100%' }}>
                                        {image1 ? __('Replace Image', 'maysternya') : __('Select Image', 'maysternya')}
                                    </Button>
                                )}
                            />
                        </MediaUploadCheck>
                        <ToggleControl
                            label={__('Show Caption', 'maysternya')}
                            checked={showCaption1}
                            onChange={(value) => setAttributes({ showCaption1: value })}
                        />
                        <TextControl
                            label={__('Link URL', 'maysternya')}
                            value={link1}
                            onChange={(value) => setAttributes({ link1: value })}
                        />
                    </PanelBody>
                    
                    <PanelBody title={__('Image 2', 'maysternya')} initialOpen={false}>
                        <MediaUploadCheck>
                            <MediaUpload
                                onSelect={(media) => setAttributes({ image2: media.url, image2Id: media.id })}
                                allowedTypes={['image']}
                                value={attributes.image2Id}
                                render={({ open }) => (
                                    <Button onClick={open} variant="secondary" style={{ marginBottom: '10px', width: '100%' }}>
                                        {image2 ? __('Replace Image', 'maysternya') : __('Select Image', 'maysternya')}
                                    </Button>
                                )}
                            />
                        </MediaUploadCheck>
                        <ToggleControl
                            label={__('Show Caption', 'maysternya')}
                            checked={showCaption2}
                            onChange={(value) => setAttributes({ showCaption2: value })}
                        />
                        <TextControl
                            label={__('Link URL', 'maysternya')}
                            value={link2}
                            onChange={(value) => setAttributes({ link2: value })}
                        />
                    </PanelBody>
                </InspectorControls>
                
                <div {...blockProps}>
                    <div className="wp-block-maysternya-image-grid__inner">
                        <div className="wp-block-maysternya-image-grid__item">
                            {image1 ? (
                                <img src={image1} alt="" />
                            ) : (
                                <div className="maysternya-placeholder-image" style={{ aspectRatio: '4/3', width: '100%' }}>
                                    {__('Select Image 1', 'maysternya')}
                                </div>
                            )}
                            {showCaption1 && (
                                <div className="wp-block-maysternya-image-grid__caption">
                                    <RichText
                                        tagName="h3"
                                        value={caption1Title}
                                        onChange={(value) => setAttributes({ caption1Title: value })}
                                        placeholder={__('Title', 'maysternya')}
                                    />
                                    <RichText
                                        tagName="p"
                                        value={caption1Text}
                                        onChange={(value) => setAttributes({ caption1Text: value })}
                                        placeholder={__('Caption text', 'maysternya')}
                                    />
                                </div>
                            )}
                        </div>
                        
                        <div className="wp-block-maysternya-image-grid__item">
                            {image2 ? (
                                <img src={image2} alt="" />
                            ) : (
                                <div className="maysternya-placeholder-image" style={{ aspectRatio: '4/3', width: '100%' }}>
                                    {__('Select Image 2', 'maysternya')}
                                </div>
                            )}
                            {showCaption2 && (
                                <div className="wp-block-maysternya-image-grid__caption">
                                    <RichText
                                        tagName="h3"
                                        value={caption2Title}
                                        onChange={(value) => setAttributes({ caption2Title: value })}
                                        placeholder={__('Title', 'maysternya')}
                                    />
                                    <RichText
                                        tagName="p"
                                        value={caption2Text}
                                        onChange={(value) => setAttributes({ caption2Text: value })}
                                        placeholder={__('Caption text', 'maysternya')}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </>
        );
    },
    
    save: function({ attributes }) {
        const blockProps = useBlockProps.save({
            className: 'wp-block-maysternya-image-grid'
        });
        
        const {
            image1, caption1Title, caption1Text, showCaption1, link1,
            image2, caption2Title, caption2Text, showCaption2, link2
        } = attributes;
        
        const renderItem = (image, captionTitle, captionText, showCaption, link, index) => {
            const content = (
                <>
                    {image ? (
                        <img src={image} alt="" />
                    ) : (
                        <div className="maysternya-placeholder-image">Placeholder</div>
                    )}
                    {showCaption && (
                        <div className="wp-block-maysternya-image-grid__caption">
                            <RichText.Content tagName="h3" value={captionTitle} />
                            <RichText.Content tagName="p" value={captionText} />
                        </div>
                    )}
                </>
            );
            
            return link ? (
                <a href={link} className="wp-block-maysternya-image-grid__item" key={index}>{content}</a>
            ) : (
                <div className="wp-block-maysternya-image-grid__item" key={index}>{content}</div>
            );
        };
        
        return (
            <div {...blockProps}>
                <div className="wp-block-maysternya-image-grid__inner">
                    {renderItem(image1, caption1Title, caption1Text, showCaption1, link1, 1)}
                    {renderItem(image2, caption2Title, caption2Text, showCaption2, link2, 2)}
                </div>
            </div>
        );
    }
});
