jest.unmock("../reducer");
jest.unmock("../records");

import { List } from "immutable";
import { reducer } from "../reducer";
import { PaperShowStateRecord, PaperShowStateFactory, PAPER_SHOW_INITIAL_STATE } from "../records";
import { IReduxAction } from "../../../typings/actionType";
import { ACTION_TYPES } from "../../../actions/actionTypes";
import { RECORD } from "../../../__mocks__";

describe("PaperShow reducer", () => {
  let mockAction: IReduxAction<any>;
  let mockState: PaperShowStateRecord;
  let state: PaperShowStateRecord;

  describe("when reducer get PAPER_SHOW_SUCCEEDED_TO_GET_PAPER action", () => {
    beforeEach(() => {
      mockAction = {
        type: ACTION_TYPES.PAPER_SHOW_SUCCEEDED_TO_GET_PAPER,
        payload: {
          paper: RECORD.PAPER,
        },
      };

      mockState = PaperShowStateFactory().withMutations(currentState => {
        return currentState
          .set("hasErrorOnFetchingPaper", true)
          .set("isLoadingPaper", true)
          .set("paper", null);
      });

      state = reducer(mockState, mockAction);
    });

    it("should set hasErrorOnFetchingPaper to false", () => {
      expect(state.hasErrorOnFetchingPaper).toBeFalsy();
    });

    it("should set isLoadingPaper to false", () => {
      expect(state.isLoadingPaper).toBeFalsy();
    });

    it("should set paper to payload's paper value", () => {
      expect(state.paper.toJS()).toEqual(RECORD.PAPER.toJS());
    });
  });

  describe("when reducer get PAPER_SHOW_START_TO_GET_PAPER action", () => {
    beforeEach(() => {
      mockAction = {
        type: ACTION_TYPES.PAPER_SHOW_START_TO_GET_PAPER,
      };

      mockState = PaperShowStateFactory().withMutations(currentState => {
        return currentState.set("hasErrorOnFetchingPaper", true).set("isLoadingPaper", false);
      });

      state = reducer(mockState, mockAction);
    });

    it("should set hasErrorOnFetchingPaper to false", () => {
      expect(state.hasErrorOnFetchingPaper).toBeFalsy();
    });

    it("should set isLoadingPaper to true", () => {
      expect(state.isLoadingPaper).toBeTruthy();
    });
  });

  describe("when reducer get PAPER_SHOW_FAILED_TO_GET_PAPER action", () => {
    beforeEach(() => {
      mockAction = {
        type: ACTION_TYPES.PAPER_SHOW_FAILED_TO_GET_PAPER,
      };

      mockState = PaperShowStateFactory().withMutations(currentState => {
        return currentState
          .set("hasErrorOnFetchingPaper", false)
          .set("isLoadingPaper", true)
          .set("paper", null);
      });

      state = reducer(mockState, mockAction);
    });

    it("should set hasErrorOnFetchingPaper to true", () => {
      expect(state.hasErrorOnFetchingPaper).toBeTruthy();
    });

    it("should set isLoadingPaper to false", () => {
      expect(state.isLoadingPaper).toBeFalsy();
    });

    it("should set paper to null value", () => {
      expect(state.paper).toBeNull();
    });
  });

  describe("when reducer get PAPER_SHOW_CLEAR_PAPER_SHOW_STATE action", () => {
    beforeEach(() => {
      mockAction = {
        type: ACTION_TYPES.PAPER_SHOW_CLEAR_PAPER_SHOW_STATE,
      };

      mockState = PaperShowStateFactory().withMutations(currentState => {
        return currentState
          .set("hasErrorOnFetchingPaper", true)
          .set("isLoadingPaper", true)
          .set("paper", RECORD.PAPER);
      });

      state = reducer(mockState, mockAction);
    });

    it("should return PAPER_SHOW_INITIAL_STATE", () => {
      expect(state).toEqual(PAPER_SHOW_INITIAL_STATE);
    });
  });

  describe("when reducer get PAPER_SHOW_START_TO_GET_COMMENTS action", () => {
    beforeEach(() => {
      mockAction = {
        type: ACTION_TYPES.PAPER_SHOW_START_TO_GET_COMMENTS,
      };

      mockState = PaperShowStateFactory().withMutations(currentState => {
        return currentState.set("hasErrorOnFetchingComments", true).set("isLoadingComments", false);
      });

      state = reducer(mockState, mockAction);
    });

    it("should set hasErrorOnFetchingComments to false", () => {
      expect(state.hasErrorOnFetchingComments).toBeFalsy();
    });

    it("should set isLoadingComments to true", () => {
      expect(state.isLoadingComments).toBeTruthy();
    });
  });

  describe("when reducer get PAPER_SHOW_START_TO_GET_COMMENTS action", () => {
    beforeEach(() => {
      mockAction = {
        type: ACTION_TYPES.PAPER_SHOW_START_TO_GET_COMMENTS,
      };

      mockState = PaperShowStateFactory().withMutations(currentState => {
        return currentState.set("hasErrorOnFetchingComments", true).set("isLoadingComments", false);
      });

      state = reducer(mockState, mockAction);
    });

    it("should set hasErrorOnFetchingComments to false", () => {
      expect(state.hasErrorOnFetchingComments).toBeFalsy();
    });

    it("should set isLoadingComments to true", () => {
      expect(state.isLoadingComments).toBeTruthy();
    });
  });

  describe("when reducer get PAPER_SHOW_FAILED_TO_GET_COMMENTS action", () => {
    beforeEach(() => {
      mockAction = {
        type: ACTION_TYPES.PAPER_SHOW_FAILED_TO_GET_COMMENTS,
      };

      mockState = PaperShowStateFactory().withMutations(currentState => {
        return currentState
          .set("hasErrorOnFetchingComments", false)
          .set("isLoadingComments", true)
          .set("comments", List([RECORD.COMMENT]));
      });

      state = reducer(mockState, mockAction);
    });

    it("should set hasErrorOnFetchingComments to true", () => {
      expect(state.hasErrorOnFetchingComments).toBeTruthy();
    });

    it("should set isLoadingComments to false", () => {
      expect(state.isLoadingComments).toBeFalsy();
    });

    it("should set comments to null", () => {
      expect(state.comments).toBeNull();
    });
  });

  describe("when reducer get PAPER_SHOW_SUCCEEDED_TO_GET_COMMENTS action", () => {
    beforeEach(() => {
      mockAction = {
        type: ACTION_TYPES.PAPER_SHOW_SUCCEEDED_TO_GET_COMMENTS,
        payload: {
          commentsResponse: RECORD.COMMENTS_RESPONSE,
        },
      };

      mockState = PaperShowStateFactory().withMutations(currentState => {
        return currentState
          .set("hasErrorOnFetchingComments", true)
          .set("isLoadingComments", true)
          .set("currentCommentPage", 5)
          .set("commentTotalPage", 10);
      });

      state = reducer(mockState, mockAction);
    });

    it("should set hasErrorOnFetchingComments to false", () => {
      expect(state.hasErrorOnFetchingComments).toBeFalsy();
    });

    it("should set isLoadingComments to false", () => {
      expect(state.isLoadingComments).toBeFalsy();
    });

    it("should set currentCommentPage to payload's value", () => {
      expect(state.currentCommentPage).toBe(0);
    });

    it("should set commentTotalPage to payload's value", () => {
      expect(state.commentTotalPage).toBe(4);
    });

    it("should set comments to payload's comments", () => {
      expect(state.comments.size).toBeGreaterThan(0);
    });
  });
});