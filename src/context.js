import React, { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "./reducer";

const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?";
const globalContext = createContext("PROVIDER NOT FOUND");

const initialValue = {
  isLoading: true,
  data: [],
  query: "react",
  page: 0,
  nbPages: 0,
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialValue); //initial Value === object
  const Provider = globalContext.Provider;

  const fetchNews = async (url) => {
    dispatch({ type: "LOADING" }); // dispatching loading
    try {
      const response = await fetch(url);
      const finalResponse = await response.json();
      //finalResponse === object with hits as a property === array.
      dispatch({
        type: "SET_DATA",
        payload: { hits: finalResponse.hits, nbPages: finalResponse.nbPages },
      });
    } catch (error) {
      console.log(error);
    }
  };

  // HANDLE SEARCH
  const handleSearch = (query) => {
    dispatch({ type: "SEARCH_QUERY", payload: query });
  };
  // HANDLE BUTTON
  const handlePage = (value) => {
    dispatch({ type: "HANDLE_PAGE", payload: value });
  };
  // REMOVE NEWS
  const removeNews = (id) => {
    dispatch({ type: "REMOVE_NEWS", payload: id });
  };
  useEffect(() => {
    fetchNews(`${API_ENDPOINT}query=${state.query}&page=${state.page}`);
  }, [state.query, state.page]); // runs on every key stroke on the input and also when the page is incermented and decremented,

  return (
    <Provider value={{ ...state, handleSearch, handlePage, removeNews }}>
      {children}
    </Provider>
  );
};

//CUSTOM HOOK
const useGlobalContext = () => {
  return useContext(globalContext);
};

export { AppProvider, useGlobalContext };
