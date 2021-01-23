import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH,
} from './actions';

const reducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, isLoading: true };
    case SET_STORIES:
      return {
        ...state,
        isLoading: false,
        hits: action.payload.hits,
        nbPages: action.payload.nbPages,
      };

    case REMOVE_STORY:
      const newHits = state.hits.filter(
        (story) => story.objectID !== action.payload
      );
      return {
        ...state,
        hits: newHits,
      };

    case HANDLE_SEARCH:
      return {
        ...state,
        query: action.payload,
        page: 0,
      };

    case HANDLE_PAGE:
      const page =
        action.payload === 'dec'
          ? Math.max(0, state.page - 1)
          : Math.min(state.nbPages - 1, state.page + 1);
      return {
        ...state,
        page,
      };
    default:
      throw new Error(`no matching "${action.type}" action type`);
  }
};
export default reducer;
