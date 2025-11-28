/**
 * Text Block
 * 
 * Configurable text content block with various layout options.
 * Based on Text block 1, 2, 3, mob screenshots.
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

registerBlockType('maysternya/text-block', {
    title: __('Text Block', 'maysternya'),
    description: __('Configurable text content block', 'maysternya'),
    icon: 'editor-paragraph',
    category: 'maysternya',
    keywords: [__('text', 'maysternya'), __('paragraph', 'maysternya'), __('content', 'maysternya')],
    supports: {
        align: ['full', 'wide'],
        html: false
    },
    attributes: {
        content: {
            type: 'string',
            default: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        },
        fontSize: {
            type: 'number',
            default: 18
        },
        lineHeight: {
            type: 'number',
            default: 1.8
        },
        columns: {
            type: 'number',
            default: 1
        },
        narrowWidth: {
            type: 'boolean',
            default: false
        },
        alignment: {
            type: 'string',
            default: 'left'
        },
        paddingTop: {
            type: 'number',
            default: 60
        },
        paddingBottom: {
            type: 'number',
            default: 60
        }
    },
    
    edit: function({ attributes, setAttributes }) {
        const columnsClass = attributes.columns > 1 ? `wp-block-maysternya-text-block--columns-${attributes.columns}` : '';
        const narrowClass = attributes.narrowWidth ? 'wp-block-maysternya-text-block--narrow' : '';
        
        const blockProps = useBlockProps({
            className: `wp-block-maysternya-text-block ${columnsClass} ${narrowClass}`
        });
        
        const {
            content,
            fontSize,
            lineHeight,
            columns,
            narrowWidth,
            alignment,
            paddingTop,
            paddingBottom
        } = attributes;
        
        return (
            <>
                <InspectorControls>
                    <PanelBody title={__('Typography', 'maysternya')} initialOpen={true}>
                        <RangeControl
                            label={__('Font Size (px)', 'maysternya')}
                            value={fontSize}
                            onChange={(value) => setAttributes({ fontSize: value })}
                            min={12}
                            max={32}
                        />
                        <RangeControl
                            label={__('Line Height', 'maysternya')}
                            value={lineHeight}
                            onChange={(value) => setAttributes({ lineHeight: value })}
                            min={1}
                            max={3}
                            step={0.1}
                        />
                        <SelectControl
                            label={__('Text Alignment', 'maysternya')}
                            value={alignment}
                            options={[
                                { label: __('Left', 'maysternya'), value: 'left' },
                                { label: __('Center', 'maysternya'), value: 'center' },
                                { label: __('Right', 'maysternya'), value: 'right' },
                                { label: __('Justify', 'maysternya'), value: 'justify' }
                            ]}
                            onChange={(value) => setAttributes({ alignment: value })}
                        />
                    </PanelBody>
                    
                    <PanelBody title={__('Layout', 'maysternya')} initialOpen={false}>
                        <SelectControl
                            label={__('Columns', 'maysternya')}
                            value={columns}
                            options={[
                                { label: __('1 Column', 'maysternya'), value: 1 },
                                { label: __('2 Columns', 'maysternya'), value: 2 },
                                { label: __('3 Columns', 'maysternya'), value: 3 }
                            ]}
                            onChange={(value) => setAttributes({ columns: parseInt(value) })}
                        />
                        <ToggleControl
                            label={__('Narrow Width', 'maysternya')}
                            help={__('Limit the maximum width for better readability', 'maysternya')}
                            checked={narrowWidth}
                            onChange={(value) => setAttributes({ narrowWidth: value })}
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
                    <div className="wp-block-maysternya-text-block__inner">
                        <RichText
                            tagName="div"
                            className="wp-block-maysternya-text-block__content"
                            value={content}
                            onChange={(value) => setAttributes({ content: value })}
                            placeholder={__('Enter your text content...', 'maysternya')}
                            style={{ 
                                fontSize: `${fontSize}px`, 
                                lineHeight: lineHeight,
                                textAlign: alignment
                            }}
                            multiline="p"
                        />
                    </div>
                </div>
            </>
        );
    },
    
    save: function({ attributes }) {
        const columnsClass = attributes.columns > 1 ? `wp-block-maysternya-text-block--columns-${attributes.columns}` : '';
        const narrowClass = attributes.narrowWidth ? 'wp-block-maysternya-text-block--narrow' : '';
        
        const blockProps = useBlockProps.save({
            className: `wp-block-maysternya-text-block ${columnsClass} ${narrowClass}`
        });
        
        const {
            content,
            fontSize,
            lineHeight,
            alignment,
            paddingTop,
            paddingBottom
        } = attributes;
        
        return (
            <div {...blockProps} style={{ padding: `${paddingTop}px 0 ${paddingBottom}px` }}>
                <div className="wp-block-maysternya-text-block__inner">
                    <RichText.Content
                        tagName="div"
                        className="wp-block-maysternya-text-block__content"
                        value={content}
                        style={{ 
                            fontSize: `${fontSize}px`, 
                            lineHeight: lineHeight,
                            textAlign: alignment
                        }}
                    />
                </div>
            </div>
        );
    }
});
