import { IReduxAction } from "../../../typings/actionType";
import { IMyPageStateRecord, MY_PAGE_INITIAL_STATE } from "./records";
import { ACTION_TYPES } from "../../../actions/actionTypes";

export function reducer(state = MY_PAGE_INITIAL_STATE, action: IReduxAction<any>): IMyPageStateRecord {
  switch (action.type) {
    case ACTION_TYPES.MY_PAGE_CHANGE_PROFILE_IMAGE_INPUT: {
      return state.set("profileImageInput", action.payload.profileImage);
    }

    case ACTION_TYPES.MY_PAGE_CHANGE_INSTITUTION_INPUT: {
      return state.set("institutionInput", action.payload.institution);
    }

    case ACTION_TYPES.MY_PAGE_CHANGE_MAJOR_INPUT: {
      return state.set("majorInput", action.payload.major);
    }

    default:
      return state;
  }
}
