/**
 * Section Separator Block
 * 
 * Section divider with headline and full-width line separator.
 * Based on Section separator screenshots.
 */

import { registerBlockType } from '@wordpress/blocks';
import { 
    InspectorControls, 
    RichText,
    useBlockProps 
} from '@wordpress/block-editor';
import { 
    PanelBody, 
    TextControl, 
    SelectControl, 
    ToggleControl,
    RangeControl
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

registerBlockType('maysternya/section-separator', {
    title: __('Section Separator', 'maysternya'),
    description: __('Section divider with headline and horizontal line', 'maysternya'),
    icon: 'minus',
    category: 'maysternya',
    keywords: [__('divider', 'maysternya'), __('separator', 'maysternya'), __('section', 'maysternya')],
    supports: {
        align: ['full', 'wide'],
        html: false
    },
    attributes: {
        title: {
            type: 'string',
            default: 'EVENTS'
        },
        titleTag: {
            type: 'string',
            default: 'h2'
        },
        titleSize: {
            type: 'number',
            default: 48
        },
        showSubtitle: {
            type: 'boolean',
            default: false
        },
        subtitle: {
            type: 'string',
            default: 'MAYSTERNYA 55'
        },
        subtitlePosition: {
            type: 'string',
            default: 'right'
        },
        showLine: {
            type: 'boolean',
            default: true
        },
        linePosition: {
            type: 'string',
            default: 'below'
        },
        paddingTop: {
            type: 'number',
            default: 60
        },
        paddingBottom: {
            type: 'number',
            default: 30
        }
    },
    
    edit: function({ attributes, setAttributes }) {
        const blockProps = useBlockProps({
            className: `wp-block-maysternya-section-separator ${attributes.showSubtitle ? 'wp-block-maysternya-section-separator--with-subtitle' : ''}`
        });
        
        const {
            title,
            titleTag,
            titleSize,
            showSubtitle,
            subtitle,
            subtitlePosition,
            showLine,
            linePosition,
            paddingTop,
            paddingBottom
        } = attributes;
        
        const TitleTag = titleTag;
        
        return (
            <>
                <InspectorControls>
                    <PanelBody title={__('Title Settings', 'maysternya')} initialOpen={true}>
                        <SelectControl
                            label={__('Title Tag', 'maysternya')}
                            value={titleTag}
                            options={[
                                { label: 'H1', value: 'h1' },
                                { label: 'H2', value: 'h2' },
                                { label: 'H3', value: 'h3' },
                                { label: 'H4', value: 'h4' }
                            ]}
                            onChange={(value) => setAttributes({ titleTag: value })}
                        />
                        <RangeControl
                            label={__('Title Font Size (px)', 'maysternya')}
                            value={titleSize}
                            onChange={(value) => setAttributes({ titleSize: value })}
                            min={24}
                            max={96}
                        />
                    </PanelBody>
                    
                    <PanelBody title={__('Subtitle Settings', 'maysternya')} initialOpen={false}>
                        <ToggleControl
                            label={__('Show Subtitle', 'maysternya')}
                            checked={showSubtitle}
                            onChange={(value) => setAttributes({ showSubtitle: value })}
                        />
                        {showSubtitle && (
                            <SelectControl
                                label={__('Subtitle Position', 'maysternya')}
                                value={subtitlePosition}
                                options={[
                                    { label: __('Right', 'maysternya'), value: 'right' },
                                    { label: __('Left', 'maysternya'), value: 'left' },
                                    { label: __('Below', 'maysternya'), value: 'below' }
                                ]}
                                onChange={(value) => setAttributes({ subtitlePosition: value })}
                            />
                        )}
                    </PanelBody>
                    
                    <PanelBody title={__('Line Settings', 'maysternya')} initialOpen={false}>
                        <ToggleControl
                            label={__('Show Line', 'maysternya')}
                            checked={showLine}
                            onChange={(value) => setAttributes({ showLine: value })}
                        />
                        {showLine && (
                            <SelectControl
                                label={__('Line Position', 'maysternya')}
                                value={linePosition}
                                options={[
                                    { label: __('Below Title', 'maysternya'), value: 'below' },
                                    { label: __('Above Title', 'maysternya'), value: 'above' }
                                ]}
                                onChange={(value) => setAttributes({ linePosition: value })}
                            />
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
                
                <div {...blockProps} style={{ paddingTop: `${paddingTop}px`, paddingBottom: `${paddingBottom}px` }}>
                    <div className="wp-block-maysternya-section-separator__inner">
                        {showLine && linePosition === 'above' && (
                            <div className="wp-block-maysternya-section-separator__line" />
                        )}
                        
                        {showSubtitle ? (
                            <div className="wp-block-maysternya-section-separator__header">
                                <RichText
                                    tagName={TitleTag}
                                    className="wp-block-maysternya-section-separator__title"
                                    value={title}
                                    onChange={(value) => setAttributes({ title: value })}
                                    placeholder={__('Section Title...', 'maysternya')}
                                    style={{ fontSize: `${titleSize}px` }}
                                />
                                <RichText
                                    tagName="span"
                                    className="wp-block-maysternya-section-separator__subtitle"
                                    value={subtitle}
                                    onChange={(value) => setAttributes({ subtitle: value })}
                                    placeholder={__('Subtitle...', 'maysternya')}
                                />
                            </div>
                        ) : (
                            <RichText
                                tagName={TitleTag}
                                className="wp-block-maysternya-section-separator__title"
                                value={title}
                                onChange={(value) => setAttributes({ title: value })}
                                placeholder={__('Section Title...', 'maysternya')}
                                style={{ fontSize: `${titleSize}px` }}
                            />
                        )}
                        
                        {showLine && linePosition === 'below' && (
                            <div className="wp-block-maysternya-section-separator__line" />
                        )}
                    </div>
                </div>
            </>
        );
    },
    
    save: function({ attributes }) {
        const blockProps = useBlockProps.save({
            className: `wp-block-maysternya-section-separator ${attributes.showSubtitle ? 'wp-block-maysternya-section-separator--with-subtitle' : ''}`
        });
        
        const {
            title,
            titleTag,
            titleSize,
            showSubtitle,
            subtitle,
            showLine,
            linePosition,
            paddingTop,
            paddingBottom
        } = attributes;
        
        const TitleTag = titleTag;
        
        return (
            <div {...blockProps} style={{ paddingTop: `${paddingTop}px`, paddingBottom: `${paddingBottom}px` }}>
                <div className="wp-block-maysternya-section-separator__inner">
                    {showLine && linePosition === 'above' && (
                        <div className="wp-block-maysternya-section-separator__line" />
                    )}
                    
                    {showSubtitle ? (
                        <div className="wp-block-maysternya-section-separator__header">
                            <RichText.Content
                                tagName={TitleTag}
                                className="wp-block-maysternya-section-separator__title"
                                value={title}
                                style={{ fontSize: `${titleSize}px` }}
                            />
                            <RichText.Content
                                tagName="span"
                                className="wp-block-maysternya-section-separator__subtitle"
                                value={subtitle}
                            />
                        </div>
                    ) : (
                        <RichText.Content
                            tagName={TitleTag}
                            className="wp-block-maysternya-section-separator__title"
                            value={title}
                            style={{ fontSize: `${titleSize}px` }}
                        />
                    )}
                    
                    {showLine && linePosition === 'below' && (
                        <div className="wp-block-maysternya-section-separator__line" />
                    )}
                </div>
            </div>
        );
    }
});
