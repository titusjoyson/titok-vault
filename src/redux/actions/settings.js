import { DELETE_CONFIRMATION } from "../constants/settingsConst";

export function setDeleteConfirmation(confirmation) {
	return {
		type: DELETE_CONFIRMATION,
		payload: confirmation,
	};
}
