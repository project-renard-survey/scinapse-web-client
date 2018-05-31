jest.unmock("../reducer");
jest.unmock("../records");

import { reducer } from "../reducer";
import { ACTION_TYPES } from "../../../actions/actionTypes";
import { LayoutState, LAYOUT_INITIAL_STATE } from "../records";

function reduceState(action: any, state: LayoutState = LAYOUT_INITIAL_STATE) {
  return reducer(state, action);
}

describe("Layout reducer", () => {
  let mockAction: any;
  let mockState: LayoutState;
  let state: LayoutState;

  describe("when receive SET_DEVICE_TO_DESKTOP", () => {
    it("should set state to state", () => {
      mockState = { ...LAYOUT_INITIAL_STATE, isMobile: true };
      mockAction = {
        type: ACTION_TYPES.SET_DEVICE_TO_DESKTOP,
      };

      state = reduceState(mockAction, mockState);

      expect(state.isMobile).toBeFalsy();
    });
  });

  describe("when receive SET_DEVICE_TO_MOBILE", () => {
    it("should set state to state", () => {
      mockState = { ...LAYOUT_INITIAL_STATE, isMobile: false };
      mockAction = {
        type: ACTION_TYPES.SET_DEVICE_TO_MOBILE,
      };

      state = reduceState(mockAction, mockState);

      expect(state.isMobile).toBeTruthy();
    });
  });

  describe("when receive GLOBAL_START_TO_GET_BOOKMARK", () => {
    beforeEach(() => {
      mockState = { ...LAYOUT_INITIAL_STATE, hasErrorOnFetchingBookmark: true };
      mockAction = {
        type: ACTION_TYPES.GLOBAL_START_TO_GET_BOOKMARK,
      };

      state = reduceState(mockAction, mockState);
    });

    it("should set isBookmarkLoading state to true", () => {
      expect(state.isBookmarkLoading).toBeTruthy();
    });

    it("should set hasErrorOnFetchingBookmark state to false", () => {
      expect(state.hasErrorOnFetchingBookmark).toBeFalsy();
    });
  });

  describe("when receive GLOBAL_SUCCEEDED_TO_GET_BOOKMARK", () => {
    beforeEach(() => {
      mockState = { ...LAYOUT_INITIAL_STATE, isBookmarkLoading: true };
      mockAction = {
        type: ACTION_TYPES.GLOBAL_SUCCEEDED_TO_GET_BOOKMARK,
        payload: {
          bookmarkCount: 5,
        },
      };

      state = reduceState(mockAction, mockState);
    });

    it("should set isBookmarkLoading state to false", () => {
      expect(state.isBookmarkLoading).toBeFalsy();
    });
  });

  describe("when receive GLOBAL_FAILED_TO_GET_BOOKMARK", () => {
    beforeEach(() => {
      mockState = { ...LAYOUT_INITIAL_STATE, isBookmarkLoading: true };
      mockAction = {
        type: ACTION_TYPES.GLOBAL_FAILED_TO_GET_BOOKMARK,
      };

      state = reduceState(mockAction, mockState);
    });

    it("should set isBookmarkLoading state to false", () => {
      expect(state.isBookmarkLoading).toBeFalsy();
    });

    it("should set hasErrorOnFetchingBookmark state to true", () => {
      expect(state.hasErrorOnFetchingBookmark).toBeTruthy();
    });
  });
});
