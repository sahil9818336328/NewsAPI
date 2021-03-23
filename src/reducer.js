const reducer = (state, action) => {
  switch (action.type) {
    // LOADING
    case "LOADING":
      return { ...state, isLoading: true };
    // ACTUAL DATA
    case "SET_DATA":
      return {
        ...state,
        data: action.payload.hits,
        nbPages: action.payload.nbPages,
        isLoading: false,
      };
    // SEARCHING
    case "SEARCH_QUERY":
      return { ...state, query: action.payload };
    // NEXT AND PREV BUTTONS
    case "HANDLE_PAGE":
      if (action.payload === "inc") {
        let nextPage = state.page + 1;
        if (nextPage > state.nbPages - 1) {
          nextPage = 0;
        }
        return { ...state, page: nextPage };
      }
      if (action.payload === "dec") {
        let prevPage = state.page - 1;
        if (prevPage < 0) {
          prevPage = state.nbPages - 1;
        }
        return { ...state, page: prevPage };
      }
      break;
    // DELETING NEWS
    case "REMOVE_NEWS":
      return {
        ...state,
        data: state.data.filter((news) => news.objectID !== action.payload),
      };
    // THROW ERROR IF ACTION TYPE NOT FOUND
    default:
      throw new Error(`no matching "${action.type}" action type`);
  }
};

export default reducer;
