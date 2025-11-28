/**
 * Carousel Block
 * 
 * Image carousel/slider with navigation.
 * Based on Carousel, Carousel mob screenshots.
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
    RangeControl,
    ToggleControl
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

registerBlockType('maysternya/carousel', {
    title: __('Carousel', 'maysternya'),
    description: __('Image carousel/slider with navigation', 'maysternya'),
    icon: 'slides',
    category: 'maysternya',
    keywords: [__('carousel', 'maysternya'), __('slider', 'maysternya'), __('gallery', 'maysternya')],
    supports: {
        align: ['full', 'wide'],
        html: false
    },
    attributes: {
        slides: {
            type: 'array',
            default: []
        },
        slidesToShow: {
            type: 'number',
            default: 3
        },
        showDots: {
            type: 'boolean',
            default: true
        },
        showArrows: {
            type: 'boolean',
            default: true
        },
        autoplay: {
            type: 'boolean',
            default: false
        },
        autoplaySpeed: {
            type: 'number',
            default: 5000
        }
    },
    
    edit: function({ attributes, setAttributes }) {
        const blockProps = useBlockProps({
            className: 'wp-block-maysternya-carousel'
        });
        
        const { slides, slidesToShow, showDots, showArrows } = attributes;
        
        const addSlide = (media) => {
            const newSlides = [...slides, {
                id: media.id,
                url: media.url,
                title: '',
                subtitle: '',
                link: ''
            }];
            setAttributes({ slides: newSlides });
        };
        
        const removeSlide = (index) => {
            const newSlides = slides.filter((_, i) => i !== index);
            setAttributes({ slides: newSlides });
        };
        
        const updateSlide = (index, field, value) => {
            const newSlides = slides.map((slide, i) => {
                if (i === index) {
                    return { ...slide, [field]: value };
                }
                return slide;
            });
            setAttributes({ slides: newSlides });
        };
        
        return (
            <>
                <InspectorControls>
                    <PanelBody title={__('Carousel Settings', 'maysternya')} initialOpen={true}>
                        <RangeControl
                            label={__('Slides to Show (Desktop)', 'maysternya')}
                            value={slidesToShow}
                            onChange={(value) => setAttributes({ slidesToShow: value })}
                            min={1}
                            max={5}
                        />
                        <ToggleControl
                            label={__('Show Dots', 'maysternya')}
                            checked={showDots}
                            onChange={(value) => setAttributes({ showDots: value })}
                        />
                        <ToggleControl
                            label={__('Show Arrows', 'maysternya')}
                            checked={showArrows}
                            onChange={(value) => setAttributes({ showArrows: value })}
                        />
                    </PanelBody>
                    
                    <PanelBody title={__('Slides', 'maysternya')} initialOpen={true}>
                        <MediaUploadCheck>
                            <MediaUpload
                                onSelect={addSlide}
                                allowedTypes={['image']}
                                render={({ open }) => (
                                    <Button onClick={open} variant="primary" style={{ marginBottom: '16px', width: '100%' }}>
                                        {__('Add Slide', 'maysternya')}
                                    </Button>
                                )}
                            />
                        </MediaUploadCheck>
                        
                        {slides.map((slide, index) => (
                            <div key={index} style={{ marginBottom: '16px', padding: '12px', background: '#f0f0f0', borderRadius: '4px' }}>
                                <img src={slide.url} alt="" style={{ width: '100%', marginBottom: '8px' }} />
                                <TextControl
                                    label={__('Title', 'maysternya')}
                                    value={slide.title}
                                    onChange={(value) => updateSlide(index, 'title', value)}
                                />
                                <TextControl
                                    label={__('Subtitle', 'maysternya')}
                                    value={slide.subtitle}
                                    onChange={(value) => updateSlide(index, 'subtitle', value)}
                                />
                                <TextControl
                                    label={__('Link URL', 'maysternya')}
                                    value={slide.link}
                                    onChange={(value) => updateSlide(index, 'link', value)}
                                />
                                <Button onClick={() => removeSlide(index)} variant="link" isDestructive>
                                    {__('Remove', 'maysternya')}
                                </Button>
                            </div>
                        ))}
                    </PanelBody>
                </InspectorControls>
                
                <div {...blockProps}>
                    <div className="wp-block-maysternya-carousel__track">
                        {slides.length > 0 ? slides.map((slide, index) => (
                            <div key={index} className="wp-block-maysternya-carousel__slide" style={{ flex: `0 0 ${100/slidesToShow}%` }}>
                                <div className="wp-block-maysternya-carousel__image">
                                    <img src={slide.url} alt={slide.title || ''} />
                                </div>
                                {(slide.title || slide.subtitle) && (
                                    <div className="wp-block-maysternya-carousel__caption">
                                        {slide.title && <h4>{slide.title}</h4>}
                                        {slide.subtitle && <p>{slide.subtitle}</p>}
                                    </div>
                                )}
                            </div>
                        )) : (
                            <div className="maysternya-editor-placeholder" style={{ width: '100%' }}>
                                <span className="maysternya-editor-placeholder__text">
                                    {__('Add slides from the sidebar', 'maysternya')}
                                </span>
                            </div>
                        )}
                    </div>
                    
                    {showArrows && slides.length > slidesToShow && (
                        <>
                            <div className="wp-block-maysternya-carousel__nav wp-block-maysternya-carousel__nav--prev">
                                <button>←</button>
                            </div>
                            <div className="wp-block-maysternya-carousel__nav wp-block-maysternya-carousel__nav--next">
                                <button>→</button>
                            </div>
                        </>
                    )}
                    
                    {showDots && slides.length > slidesToShow && (
                        <div className="wp-block-maysternya-carousel__dots">
                            {Array.from({ length: Math.ceil(slides.length / slidesToShow) }).map((_, i) => (
                                <button key={i} className={`wp-block-maysternya-carousel__dot ${i === 0 ? 'wp-block-maysternya-carousel__dot--active' : ''}`} />
                            ))}
                        </div>
                    )}
                </div>
            </>
        );
    },
    
    save: function({ attributes }) {
        const blockProps = useBlockProps.save({
            className: 'wp-block-maysternya-carousel'
        });
        
        const { slides, slidesToShow, showDots, showArrows, autoplay, autoplaySpeed } = attributes;
        
        return (
            <div 
                {...blockProps}
                data-slides-to-show={slidesToShow}
                data-autoplay={autoplay}
                data-autoplay-speed={autoplaySpeed}
            >
                <div className="wp-block-maysternya-carousel__track">
                    {slides.map((slide, index) => {
                        const content = (
                            <>
                                <div className="wp-block-maysternya-carousel__image">
                                    <img src={slide.url} alt={slide.title || ''} />
                                </div>
                                {(slide.title || slide.subtitle) && (
                                    <div className="wp-block-maysternya-carousel__caption">
                                        {slide.title && <h4>{slide.title}</h4>}
                                        {slide.subtitle && <p>{slide.subtitle}</p>}
                                    </div>
                                )}
                            </>
                        );
                        
                        return slide.link ? (
                            <a key={index} href={slide.link} className="wp-block-maysternya-carousel__slide">
                                {content}
                            </a>
                        ) : (
                            <div key={index} className="wp-block-maysternya-carousel__slide">
                                {content}
                            </div>
                        );
                    })}
                </div>
                
                {showArrows && (
                    <>
                        <div className="wp-block-maysternya-carousel__nav wp-block-maysternya-carousel__nav--prev">
                            <button aria-label="Previous">←</button>
                        </div>
                        <div className="wp-block-maysternya-carousel__nav wp-block-maysternya-carousel__nav--next">
                            <button aria-label="Next">→</button>
                        </div>
                    </>
                )}
                
                {showDots && (
                    <div className="wp-block-maysternya-carousel__dots">
                        {Array.from({ length: Math.ceil(slides.length / slidesToShow) }).map((_, i) => (
                            <button key={i} className={`wp-block-maysternya-carousel__dot ${i === 0 ? 'wp-block-maysternya-carousel__dot--active' : ''}`} />
                        ))}
                    </div>
                )}
            </div>
        );
    }
});
