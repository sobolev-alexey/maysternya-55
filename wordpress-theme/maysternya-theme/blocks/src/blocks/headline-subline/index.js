/**
 * Headline + Subline Block
 * 
 * Large headline with optional subline text.
 * Based on Headline+Subline 1, 2, mob screenshots.
 */

import { registerBlockType } from '@wordpress/blocks';
import { 
    InspectorControls, 
    RichText,
    useBlockProps 
} from '@wordpress/block-editor';
import { 
    PanelBody, 
    SelectControl, 
    RangeControl,
    ToggleControl
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

registerBlockType('maysternya/headline-subline', {
    title: __('Headline + Subline', 'maysternya'),
    description: __('Large headline with optional subline text', 'maysternya'),
    icon: 'heading',
    category: 'maysternya',
    keywords: [__('headline', 'maysternya'), __('title', 'maysternya'), __('header', 'maysternya')],
    supports: {
        align: ['full', 'wide'],
        html: false
    },
    attributes: {
        headline: {
            type: 'string',
            default: 'MAYSTERNYA\n55 KHARKIV\nTHEATRE'
        },
        headlineTag: {
            type: 'string',
            default: 'h1'
        },
        headlineSize: {
            type: 'number',
            default: 96
        },
        headlineSizeMobile: {
            type: 'number',
            default: 48
        },
        showSubline: {
            type: 'boolean',
            default: true
        },
        subline: {
            type: 'string',
            default: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        alignment: {
            type: 'string',
            default: 'left'
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
            className: `wp-block-maysternya-headline-subline wp-block-maysternya-headline-subline--align-${attributes.alignment}`
        });
        
        const {
            headline,
            headlineTag,
            headlineSize,
            showSubline,
            subline,
            alignment,
            paddingTop,
            paddingBottom
        } = attributes;
        
        const HeadlineTag = headlineTag;
        
        return (
            <>
                <InspectorControls>
                    <PanelBody title={__('Headline Settings', 'maysternya')} initialOpen={true}>
                        <SelectControl
                            label={__('Headline Tag', 'maysternya')}
                            value={headlineTag}
                            options={[
                                { label: 'H1', value: 'h1' },
                                { label: 'H2', value: 'h2' },
                                { label: 'H3', value: 'h3' },
                                { label: 'H4', value: 'h4' }
                            ]}
                            onChange={(value) => setAttributes({ headlineTag: value })}
                        />
                        <RangeControl
                            label={__('Headline Font Size - Desktop (px)', 'maysternya')}
                            value={headlineSize}
                            onChange={(value) => setAttributes({ headlineSize: value })}
                            min={36}
                            max={200}
                        />
                        <SelectControl
                            label={__('Alignment', 'maysternya')}
                            value={alignment}
                            options={[
                                { label: __('Left', 'maysternya'), value: 'left' },
                                { label: __('Center', 'maysternya'), value: 'center' },
                                { label: __('Right', 'maysternya'), value: 'right' }
                            ]}
                            onChange={(value) => setAttributes({ alignment: value })}
                        />
                    </PanelBody>
                    
                    <PanelBody title={__('Subline Settings', 'maysternya')} initialOpen={false}>
                        <ToggleControl
                            label={__('Show Subline', 'maysternya')}
                            checked={showSubline}
                            onChange={(value) => setAttributes({ showSubline: value })}
                        />
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
                
                <div {...blockProps} style={{ padding: `${paddingTop}px 0 ${paddingBottom}px` }}>
                    <div className="wp-block-maysternya-headline-subline__inner">
                        <RichText
                            tagName={HeadlineTag}
                            className="wp-block-maysternya-headline-subline__headline"
                            value={headline}
                            onChange={(value) => setAttributes({ headline: value })}
                            placeholder={__('Enter headline...', 'maysternya')}
                            style={{ fontSize: `${headlineSize}px` }}
                        />
                        
                        {showSubline && (
                            <RichText
                                tagName="p"
                                className="wp-block-maysternya-headline-subline__subline"
                                value={subline}
                                onChange={(value) => setAttributes({ subline: value })}
                                placeholder={__('Enter subline text...', 'maysternya')}
                            />
                        )}
                    </div>
                </div>
            </>
        );
    },
    
    save: function({ attributes }) {
        const blockProps = useBlockProps.save({
            className: `wp-block-maysternya-headline-subline wp-block-maysternya-headline-subline--align-${attributes.alignment}`
        });
        
        const {
            headline,
            headlineTag,
            headlineSize,
            showSubline,
            subline,
            paddingTop,
            paddingBottom
        } = attributes;
        
        const HeadlineTag = headlineTag;
        
        return (
            <div {...blockProps} style={{ padding: `${paddingTop}px 0 ${paddingBottom}px` }}>
                <div className="wp-block-maysternya-headline-subline__inner">
                    <RichText.Content
                        tagName={HeadlineTag}
                        className="wp-block-maysternya-headline-subline__headline"
                        value={headline}
                        style={{ fontSize: `${headlineSize}px` }}
                    />
                    
                    {showSubline && subline && (
                        <RichText.Content
                            tagName="p"
                            className="wp-block-maysternya-headline-subline__subline"
                            value={subline}
                        />
                    )}
                </div>
            </div>
        );
    }
});
