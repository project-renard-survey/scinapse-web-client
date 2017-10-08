import { IReduxAction } from "../../typings/actionType";
import {
  ARTICLE_SHOW_INITIAL_STATE,
  IArticleShowStateRecord,
  ARTICLE_EVALUATION_TAB,
  ARTICLE_EVALUATION_STEP,
} from "./records";
import { ACTION_TYPES } from "../../actions/actionTypes";

export function reducer(state = ARTICLE_SHOW_INITIAL_STATE, action: IReduxAction<any>): IArticleShowStateRecord {
  switch (action.type) {
    case ACTION_TYPES.ARTICLE_SHOW_CHANGE_EVALUATION_TAB: {
      if (state.evaluationTab === ARTICLE_EVALUATION_TAB.MY) {
        return state.set("evaluationTab", ARTICLE_EVALUATION_TAB.PEER);
      } else {
        return state.set("evaluationTab", ARTICLE_EVALUATION_TAB.MY);
      }
    }

    case ACTION_TYPES.ARTICLE_SHOW_TOGGLE_PEER_EVALUATION_COMPONENT: {
      let peerEvaluationId: string = null;
      if (state.peerEvaluationId !== action.payload.peerEvaluationId) {
        peerEvaluationId = action.payload.peerEvaluationId;
      }
      return state.set("peerEvaluationId", peerEvaluationId);
    }

    case ACTION_TYPES.ARTICLE_SHOW_CHANGE_EVALUATION_STEP: {
      return state.set("currentStep", action.payload.step);
    }

    case ACTION_TYPES.ARTICLE_SHOW_CHANGE_EVALUATION_SCORE: {
      switch (action.payload.step) {
        case ARTICLE_EVALUATION_STEP.FIRST: {
          return state.set("myOriginalityScore", action.payload.score);
        }

        case ARTICLE_EVALUATION_STEP.SECOND: {
          return state.set("myContributionScore", action.payload.score);
        }
        case ARTICLE_EVALUATION_STEP.THIRD: {
          return state.set("myAnalysisScore", action.payload.score);
        }
        case ARTICLE_EVALUATION_STEP.FOURTH: {
          return state.set("myExpressivenessScore", action.payload.score);
        }

        default:
          break;
      }
    }

    case ACTION_TYPES.ARTICLE_SHOW_CHANGE_EVALUATION_COMMENT: {
      switch (action.payload.step) {
        case ARTICLE_EVALUATION_STEP.FIRST: {
          return state.set("myOriginalityComment", action.payload.comment);
        }

        case ARTICLE_EVALUATION_STEP.SECOND: {
          return state.set("myContributionComment", action.payload.comment);
        }
        case ARTICLE_EVALUATION_STEP.THIRD: {
          return state.set("myAnalysisComment", action.payload.comment);
        }
        case ARTICLE_EVALUATION_STEP.FOURTH: {
          return state.set("myExpressivenessComment", action.payload.comment);
        }

        default:
          break;
      }
    }

    case ACTION_TYPES.ARTICLE_SHOW_START_TO_GET_ARTICLE: {
      return state.withMutations(currentState => {
        return currentState.set("isLoading", true).set("hasError", false);
      });
    }

    case ACTION_TYPES.ARTICLE_SHOW_FAILED_TO_GET_ARTICLE: {
      return state.withMutations(currentState => {
        return currentState.set("isLoading", false).set("hasError", true);
      });
    }

    case ACTION_TYPES.ARTICLE_SHOW_SUCCEEDED_TO_GET_ARTICLE: {
      return state.withMutations(currentState => {
        return currentState.set("isLoading", false).set("hasError", false);
      });
    }

    case ACTION_TYPES.ARTICLE_SHOW_START_TO_PEER_EVALUATION_COMMENT_SUBMIT: {
      return state.withMutations(currentState => {
        return currentState.set("evaluationCommentHasError", false).set("evaluationCommentIsLoading", true);
      });
    }

    case ACTION_TYPES.ARTICLE_SHOW_SUCCEEDED_TO_PEER_EVALUATION_COMMENT_SUBMIT: {
      return state.withMutations(currentState => {
        return currentState.set("evaluationCommentHasError", false).set("evaluationCommentIsLoading", false);
      });
    }

    case ACTION_TYPES.ARTICLE_SHOW_FAILED_TO_PEER_EVALUATION_COMMENT_SUBMIT: {
      return state.withMutations(currentState => {
        return currentState.set("evaluationCommentHasError", true).set("evaluationCommentIsLoading", false);
      });
    }

    case ACTION_TYPES.GLOBAL_LOCATION_CHANGE: {
      return ARTICLE_SHOW_INITIAL_STATE;
    }

    default:
      return state;
  }
}