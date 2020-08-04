import React from 'react'
import './styles.scss'
import CKEditor from 'ckeditor4-react'
CKEditor.editorUrl = 'https://cdn.ckeditor.com/4.13.1/full/ckeditor.js'
var view = function () {
	const { value } = this.state

	return (
		<CKEditor
			onBeforeLoad={(CKEDITOR) => (CKEDITOR.disableAutoInline = true)}
			data={value}
			config={[
				{
					name: 'document',
					items: [
						'Source',
						'-',
						'Save',
						'NewPage',
						'Preview',
						'Print',
						'-',
						'Templates',
					],
				},
				{
					name: 'clipboard',
					items: [
						'Cut',
						'Copy',
						'Paste',
						'PasteText',
						'PasteFromWord',
						'-',
						'Undo',
						'Redo',
					],
				},
				{
					name: 'editing',
					items: ['Find', 'Replace', '-', 'SelectAll', '-', 'Scayt'],
				},
				{
					name: 'forms',
					items: [
						'Form',
						'Checkbox',
						'Radio',
						'TextField',
						'Textarea',
						'Select',
						'Button',
						'ImageButton',
						'HiddenField',
					],
				},
				'/',
				{
					name: 'basicstyles',
					items: [
						'Bold',
						'Italic',
						'Underline',
						'Strike',
						'Subscript',
						'Superscript',
						'-',
						'CopyFormatting',
						'RemoveFormat',
					],
				},
				{
					name: 'paragraph',
					items: [
						'NumberedList',
						'BulletedList',
						'-',
						'Outdent',
						'Indent',
						'-',
						'Blockquote',
						'CreateDiv',
						'-',
						'JustifyLeft',
						'JustifyCenter',
						'JustifyRight',
						'JustifyBlock',
						'-',
						'BidiLtr',
						'BidiRtl',
						'Language',
					],
				},
				{ name: 'links', items: ['Link', 'Unlink', 'Anchor'] },
				{
					name: 'insert',
					items: [
						'Image',
						'Flash',
						'Table',
						'HorizontalRule',
						'Smiley',
						'SpecialChar',
						'PageBreak',
						'Iframe',
					],
				},
				'/',
				{ name: 'styles', items: ['Styles', 'Format', 'Font', 'FontSize'] },
				{ name: 'colors', items: ['TextColor', 'BGColor'] },
				{ name: 'tools', items: ['Maximize', 'ShowBlocks'] },
				{ name: 'about', items: ['About'] },
			]}
			onChange={this.onChange}
		/>
	)
}
export default view
