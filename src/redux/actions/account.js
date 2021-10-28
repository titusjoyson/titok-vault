import { SET_ACCOUNT, RESET_ACCOUNT } from "../constants/accountConst";

export function setAccount(user) {
    return {
        type: SET_ACCOUNT,
        payload: user,
    };
}

export function resetAccount() {
    return {
        type: RESET_ACCOUNT,
    };
}
