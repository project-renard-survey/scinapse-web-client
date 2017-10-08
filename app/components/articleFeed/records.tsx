import { TypedRecord, makeTypedFactory } from "typed-immutable-record";

export enum FEED_SORTING_OPTIONS {
  SCORE,
  LATEST,
}

export enum FEED_CATEGORIES {
  ALL,
  POST_PAPER,
  PRE_PAPER,
  TECH_WHITE_PAPER,
  TECH_BLOG,
}

export interface IArticleFeedState {
  isLoading: boolean;
  hasError: boolean;
  sortingOption: FEED_SORTING_OPTIONS;
  isCategoryPopOverOpen: boolean;
  category: FEED_CATEGORIES;
  categoryPopoverAnchorElement: React.ReactInstance | null;
}

export interface IArticleFeedStateRecord extends TypedRecord<IArticleFeedStateRecord>, IArticleFeedState {}

const initialArticleFeedState: IArticleFeedState = {
  isLoading: false,
  hasError: false,
  sortingOption: FEED_SORTING_OPTIONS.SCORE,
  isCategoryPopOverOpen: false,
  category: FEED_CATEGORIES.ALL,
  categoryPopoverAnchorElement: null,
};

export const ArticleFeedStateFactory = makeTypedFactory<IArticleFeedState, IArticleFeedStateRecord>(
  initialArticleFeedState,
);

export const ARTICLE_FEED_INITIAL_STATE = ArticleFeedStateFactory();