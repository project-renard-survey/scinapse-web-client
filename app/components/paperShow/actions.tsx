import { Dispatch } from "redux";
import { ACTION_TYPES } from "../../actions/actionTypes";
import CommentAPI from "../../api/comment";
import PaperAPI, { GetPaperParams } from "../../api/paper";
import { GetCommentsParams } from "../../api/types/comment";

export function getPaper(params: GetPaperParams) {
  return async (dispatch: Dispatch<any>) => {
    try {
      dispatch({
        type: ACTION_TYPES.PAPER_SHOW_START_TO_GET_PAPER,
      });

      const paper = await PaperAPI.getPaper(params);

      dispatch({
        type: ACTION_TYPES.PAPER_SHOW_SUCCEEDED_TO_GET_PAPER,
        payload: {
          paper,
        },
      });
    } catch (err) {
      dispatch({
        type: ACTION_TYPES.PAPER_SHOW_FAILED_TO_GET_PAPER,
      });
    }
  };
}

export function getComments(params: GetCommentsParams) {
  return async (dispatch: Dispatch<any>) => {
    dispatch({
      type: ACTION_TYPES.PAPER_SHOW_START_TO_GET_COMMENTS,
    });

    try {
      const commentsResponse = await CommentAPI.getComments(params);

      dispatch({
        type: ACTION_TYPES.PAPER_SHOW_SUCCEEDED_TO_GET_COMMENTS,
        payload: {
          commentsResponse,
        },
      });
    } catch (err) {
      dispatch({
        type: ACTION_TYPES.PAPER_SHOW_FAILED_TO_GET_COMMENTS,
      });
    }
  };
}

export function clearPaperShowState() {
  return {
    type: ACTION_TYPES.PAPER_SHOW_CLEAR_PAPER_SHOW_STATE,
  };
}