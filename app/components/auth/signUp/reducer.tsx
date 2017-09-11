import { IReduxAction } from "../../../typings/actionType";
import { SIGN_UP_INITIAL_STATE, ISignUpStateRecord } from "./records";
import { ACTION_TYPES } from "../../../actions/actionTypes";

export function reducer(state = SIGN_UP_INITIAL_STATE, action: IReduxAction<any>): ISignUpStateRecord {
  switch (action.type) {
    case ACTION_TYPES.SIGN_UP_CHANGE_EMAIL_INPUT: {
      return state.set("email", action.payload.email);
    }

    case ACTION_TYPES.SIGN_UP_CHANGE_PASSWORD_INPUT: {
      return state.set("password", action.payload.password);
    }

    case ACTION_TYPES.SIGN_UP_CHANGE_REPEAT_PASSWORD_INPUT: {
      return state.set("repeatPassword", action.payload.password);
    }

    case ACTION_TYPES.SIGN_UP_CHANGE_FULL_NAME_INPUT: {
      return state.set("fullName", action.payload.fullName);
    }

    case ACTION_TYPES.SIGN_UP_START_TO_CREATE_ACCOUNT: {
      return state.withMutations(currentState => {
        return currentState.set("isLoading", true).set("hasError", false);
      });
    }

    case ACTION_TYPES.SIGN_UP_FAILED_TO_CREATE_ACCOUNT: {
      return state.withMutations(currentState => {
        return currentState.set("isLoading", false).set("hasError", true);
      });
    }

    case ACTION_TYPES.SIGN_UP_SUCCEEDED_TO_CREATE_ACCOUNT: {
      return state.withMutations(currentState => {
        return currentState.set("isLoading", false).set("hasError", false);
      });
    }

    default:
      return state;
  }
}