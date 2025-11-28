/**
 * Text + Image Block
 * 
 * Two-column layout with text and image side by side.
 * Based on Text+Image 1, Text+Image 2, Text+Image mob screenshots.
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
    ToggleControl,
    TextControl,
    RangeControl
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

registerBlockType('maysternya/text-image', {
    title: __('Text + Image', 'maysternya'),
    description: __('Two-column layout with text and image', 'maysternya'),
    icon: 'align-right',
    category: 'maysternya',
    keywords: [__('text', 'maysternya'), __('image', 'maysternya'), __('columns', 'maysternya')],
    supports: {
        align: ['full', 'wide'],
        html: false
    },
    attributes: {
        text: {
            type: 'string',
            default: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
        },
        image: {
            type: 'string',
            default: ''
        },
        imageId: {
            type: 'number'
        },
        imageFirst: {
            type: 'boolean',
            default: false
        },
        showCta: {
            type: 'boolean',
            default: false
        },
        ctaText: {
            type: 'string',
            default: 'LEARN MORE'
        },
        ctaUrl: {
            type: 'string',
            default: '#'
        },
        paddingTop: {
            type: 'number',
            default: 80
        },
        paddingBottom: {
            type: 'number',
            default: 80
        }
    },
    
    edit: function({ attributes, setAttributes }) {
        const blockProps = useBlockProps({
            className: `wp-block-maysternya-text-image ${attributes.imageFirst ? 'wp-block-maysternya-text-image--image-first' : ''}`
        });
        
        const { text, image, imageFirst, showCta, ctaText, ctaUrl, paddingTop, paddingBottom } = attributes;
        
        return (
            <>
                <InspectorControls>
                    <PanelBody title={__('Layout', 'maysternya')} initialOpen={true}>
                        <ToggleControl
                            label={__('Image First', 'maysternya')}
                            help={__('Show image on the left side', 'maysternya')}
                            checked={imageFirst}
                            onChange={(value) => setAttributes({ imageFirst: value })}
                        />
                    </PanelBody>
                    
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
                    
                    <PanelBody title={__('Spacing', 'maysternya')} initialOpen={false}>
                        <RangeControl
                            label={__('Padding Top (px)', 'maysternya')}
                            value={paddingTop}
                            onChange={(value) => setAttributes({ paddingTop: value })}
                            min={0}
                            max={200}
                        />
                        <RangeControl
                            label={__('Padding Bottom (px)', 'maysternya')}
                            value={paddingBottom}
                            onChange={(value) => setAttributes({ paddingBottom: value })}
                            min={0}
                            max={200}
                        />
                    </PanelBody>
                </InspectorControls>
                
                <div {...blockProps}>
                    <div className="wp-block-maysternya-text-image__inner" style={{ paddingTop: `${paddingTop}px`, paddingBottom: `${paddingBottom}px` }}>
                        <div className="wp-block-maysternya-text-image__text">
                            <RichText
                                tagName="div"
                                value={text}
                                onChange={(value) => setAttributes({ text: value })}
                                placeholder={__('Enter your text...', 'maysternya')}
                                multiline="p"
                            />
                            {showCta && (
                                <div className="maysternya-cta-button" style={{ marginTop: '24px' }}>
                                    {ctaText || __('Button Text', 'maysternya')}
                                </div>
                            )}
                        </div>
                        
                        <div className="wp-block-maysternya-text-image__image">
                            {image ? (
                                <img src={image} alt="" />
                            ) : (
                                <div className="maysternya-placeholder-image" style={{ aspectRatio: '4/3', width: '100%' }}>
                                    {__('Select an image', 'maysternya')}
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
            className: `wp-block-maysternya-text-image ${attributes.imageFirst ? 'wp-block-maysternya-text-image--image-first' : ''}`
        });
        
        const { text, image, showCta, ctaText, ctaUrl, paddingTop, paddingBottom } = attributes;
        
        return (
            <div {...blockProps}>
                <div className="wp-block-maysternya-text-image__inner" style={{ paddingTop: `${paddingTop}px`, paddingBottom: `${paddingBottom}px` }}>
                    <div className="wp-block-maysternya-text-image__text">
                        <RichText.Content
                            tagName="div"
                            value={text}
                        />
                        {showCta && ctaText && (
                            <a href={ctaUrl} className="maysternya-cta-button" style={{ marginTop: '24px' }}>
                                {ctaText}
                            </a>
                        )}
                    </div>
                    
                    <div className="wp-block-maysternya-text-image__image">
                        {image ? (
                            <img src={image} alt="" />
                        ) : (
                            <div className="maysternya-placeholder-image">Placeholder</div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
});
