import React, { Component } from "react";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./MainEditor.style.css";

class ConvertToRawDraftContent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			editorState: EditorState.createEmpty(),
		};
		this.onEditorStateChange = this.onEditorStateChange.bind(this);
	}

	componentDidMount() {
		const html = this.getHardcodedHtml();
		const contentBlock = html;
		// if (contentBlock) {
		// 	const contentState = ContentState.createFromBlockArray(
		// 		contentBlock.contentBlocks
		// 	);
		// 	const editorState = EditorState.createWithContent(contentState);
		// 	this.setState({ editorState });
		// }
	}

	getHardcodedHtml() {
		const html = `<p></p>
        <img src="https://www.dotemu.com/wp-content/uploads/2018/08/thumbsite1.png" alt="undefined" style="height: auto;width: auto"/>
        <p></p>`;
		return html;
	}

	onEditorStateChange(editorState) {
		this.setState({ editorState });
	}

	render() {
		const { editorState } = this.state;
		return (
			<div className="editor-root">
				<Editor
					editorState={editorState}
					toolbar={{
						options: ["inline", "blockType", "list", "link"],
						inline: {
							inDropdown: false,
							className: undefined,
							component: undefined,
							dropdownClassName: undefined,
							options: ["bold", "italic", "underline"],
						},
						blockType: {
							inDropdown: false,
							options: ["H1", "H2", "Code"],
							className: undefined,
							component: undefined,
							dropdownClassName: undefined,
							title: undefined,
						},
						list: {
							inDropdown: false,
							className: undefined,
							component: undefined,
							dropdownClassName: undefined,
							options: ["unordered", "ordered"],
							title: undefined,
						},
						link: {
							inDropdown: false,
							className: undefined,
							component: undefined,
							popupClassName: undefined,
							dropdownClassName: undefined,
							showOpenOptionOnHover: true,
							defaultTargetOption: "_self",
							options: ["link", "unlink"],
							linkCallback: undefined,
						},
					}}
					toolbarClassName="editor-toolbar"
					wrapperClassName="editor-wrapper"
					editorClassName="editor-editor"
					placeholder="Type or paste your text here!"
					onEditorStateChange={this.onEditorStateChange}
				/>
			</div>
		);
	}
}

export default ConvertToRawDraftContent;
