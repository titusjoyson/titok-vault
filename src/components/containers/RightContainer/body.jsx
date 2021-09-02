import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Form } from "antd";

import TextInput from "../../DataForm/Input";

import {
	deleteSecret,
	changeViewMode,
	replaceSecret,
} from "../../../redux/actions/secrets";
import { ViewModes } from "../../../com/const";
import Secret, { SecretItem } from "../../../models/secret";

import "./styles.less";

const formItemLayout = {
	labelCol: {
		xs: { span: 2 },
		sm: { span: 2 },
	},
};

class RightContainerInner extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			...props.selectedData,
		};
	}
	formRef = React.createRef();

	static getDerivedStateFromProps(props, state) {
		if (props.selectedData) {
			if (!props.selectedData.id) {
				// clean right container state
				return Secret("");
			}
			if (state.id !== props.selectedData.id) {
				let newData = { ...props.selectedData };
				if (newData.items.length <= 0) {
					newData.items = [SecretItem()];
				}
				// replace current state
				return {
					...newData,
				};
			}
		}
		// Return null if the state hasn't changed
		return null;
	}

	onChange = (value, field, idx = null) => {
		let data = { ...this.props.selectedData };
		if (field === "title") {
			data.title = value;
		} else {
			data.items[idx][field] = value;
		}
		this.props.actions.replaceSecret(data);
	};

	render() {
		const { activeMode } = this.props;
		const { id, title, items } = this.state;
		if (!this.state.id) {
			return null;
		}
		const readOnly = activeMode === ViewModes.VIEW;
		let titleIC = "form-item-underline";
		return (
			<React.Fragment>
				<Form
					{...formItemLayout}
					ref={this.formRef}
					layout="vertical"
					name="cr"
					onFinish={() => {}}
				>
					<TextInput
						readOnly={readOnly}
						name={`${id}-title`}
						inputClassName={titleIC}
						className="form-item-underline-item"
						placeholder="Title"
						defaultValue={title}
						onChange={(value) => this.onChange(value, "title")}
					/>
				</Form>
			</React.Fragment>
		);
	}
}

RightContainerInner.defaultProps = {
	id: null,
	items: [],
};

const mapStateToProps = (state) => {
	const secretList = state.secrets.data;
	const selectedSecretId = state.secrets.active;
	let selectedData = {};
	if (selectedSecretId) {
		const selItemIdx = secretList.findIndex(
			(i) => i.id === selectedSecretId
		);
		if (selItemIdx || selItemIdx === 0) {
			selectedData = secretList[selItemIdx];
		}
	}
	return {
		activeMode: state.secrets.activeMode,
		selectedData: selectedData,
	};
};

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(
		{
			deleteSecret,
			changeViewMode,
			replaceSecret,
		},
		dispatch
	),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(RightContainerInner);
