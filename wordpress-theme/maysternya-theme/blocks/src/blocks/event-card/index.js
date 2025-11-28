/**
 * Event Card Block
 * 
 * Card for displaying event information with date, title, and details.
 * Based on Event card, Event card mob screenshots.
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

registerBlockType('maysternya/event-card', {
    title: __('Event Card', 'maysternya'),
    description: __('Card for displaying event information', 'maysternya'),
    icon: 'calendar-alt',
    category: 'maysternya',
    keywords: [__('event', 'maysternya'), __('card', 'maysternya'), __('calendar', 'maysternya')],
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
        date: {
            type: 'string',
            default: '15.12.2024'
        },
        time: {
            type: 'string',
            default: '19:00'
        },
        title: {
            type: 'string',
            default: 'THREE SISTERS'
        },
        description: {
            type: 'string',
            default: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        location: {
            type: 'string',
            default: 'Kharkiv, Ukraine'
        },
        showCta: {
            type: 'boolean',
            default: true
        },
        ctaText: {
            type: 'string',
            default: 'GET TICKETS'
        },
        ctaUrl: {
            type: 'string',
            default: '#'
        }
    },
    
    edit: function({ attributes, setAttributes }) {
        const blockProps = useBlockProps({
            className: 'wp-block-maysternya-event-card'
        });
        
        const {
            image,
            showImage,
            date,
            time,
            title,
            description,
            location,
            showCta,
            ctaText,
            ctaUrl
        } = attributes;
        
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
                        )}
                    </PanelBody>
                    
                    <PanelBody title={__('Date & Time', 'maysternya')} initialOpen={false}>
                        <TextControl
                            label={__('Date', 'maysternya')}
                            value={date}
                            onChange={(value) => setAttributes({ date: value })}
                        />
                        <TextControl
                            label={__('Time', 'maysternya')}
                            value={time}
                            onChange={(value) => setAttributes({ time: value })}
                        />
                    </PanelBody>
                    
                    <PanelBody title={__('Details', 'maysternya')} initialOpen={false}>
                        <TextControl
                            label={__('Location', 'maysternya')}
                            value={location}
                            onChange={(value) => setAttributes({ location: value })}
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
                    <div className="wp-block-maysternya-event-card__inner">
                        {showImage && (
                            <div className="wp-block-maysternya-event-card__image">
                                {image ? (
                                    <img src={image} alt="" />
                                ) : (
                                    <div className="maysternya-placeholder-image" style={{ aspectRatio: '1', width: '100%' }}>
                                        {__('Select an image', 'maysternya')}
                                    </div>
                                )}
                            </div>
                        )}
                        
                        <div className="wp-block-maysternya-event-card__content">
                            <div className="wp-block-maysternya-event-card__date">
                                {date && <span>{date}</span>}
                                {time && <span>{time}</span>}
                            </div>
                            
                            <RichText
                                tagName="h3"
                                className="wp-block-maysternya-event-card__title"
                                value={title}
                                onChange={(value) => setAttributes({ title: value })}
                                placeholder={__('Event Title', 'maysternya')}
                            />
                            
                            <RichText
                                tagName="p"
                                className="wp-block-maysternya-event-card__description"
                                value={description}
                                onChange={(value) => setAttributes({ description: value })}
                                placeholder={__('Event description...', 'maysternya')}
                            />
                            
                            <div className="wp-block-maysternya-event-card__footer">
                                {location && (
                                    <span className="wp-block-maysternya-event-card__location">{location}</span>
                                )}
                                {showCta && (
                                    <div className="maysternya-cta-button">
                                        {ctaText || __('Button Text', 'maysternya')}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    },
    
    save: function({ attributes }) {
        const blockProps = useBlockProps.save({
            className: 'wp-block-maysternya-event-card'
        });
        
        const {
            image,
            showImage,
            date,
            time,
            title,
            description,
            location,
            showCta,
            ctaText,
            ctaUrl
        } = attributes;
        
        return (
            <article {...blockProps}>
                <div className="wp-block-maysternya-event-card__inner">
                    {showImage && (
                        <div className="wp-block-maysternya-event-card__image">
                            {image ? (
                                <img src={image} alt="" />
                            ) : (
                                <div className="maysternya-placeholder-image">
                                    Placeholder Image
                                </div>
                            )}
                        </div>
                    )}
                    
                    <div className="wp-block-maysternya-event-card__content">
                        <div className="wp-block-maysternya-event-card__date">
                            {date && <span>{date}</span>}
                            {time && <span>{time}</span>}
                        </div>
                        
                        <RichText.Content
                            tagName="h3"
                            className="wp-block-maysternya-event-card__title"
                            value={title}
                        />
                        
                        {description && (
                            <RichText.Content
                                tagName="p"
                                className="wp-block-maysternya-event-card__description"
                                value={description}
                            />
                        )}
                        
                        <div className="wp-block-maysternya-event-card__footer">
                            {location && (
                                <span className="wp-block-maysternya-event-card__location">{location}</span>
                            )}
                            {showCta && ctaText && (
                                <a href={ctaUrl} className="maysternya-cta-button">
                                    {ctaText}
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </article>
        );
    }
});
