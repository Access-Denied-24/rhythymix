// import axios from 'axios';
// import React, { createContext, useContext, useState, useEffect } from 'react';

// const SearchedContext = createContext();

// export const useSearched = () => {
//   return useContext(SearchedContext);
// };

// export const searchProvider = ({ children }) => {
  
//   const [ isSearched, setIsSearched ] = useState(false);

//   return (
//     <SearchedContext.Provider value={{ isSearched, setIsSearched }}>
//       {children}
//     </SearchedContext.Provider>
//   );
// };

import { createContext, useContext, useState } from 'react';

const SearchedContext = createContext();

export const useSearched = () => useContext(SearchedContext);

export const SearchProvider = ({ children }) => {
  const [isSearched, setIsSearched] = useState(false);

  return (
    <SearchedContext.Provider value={{ isSearched, setIsSearched }}>
      {children}
    </SearchedContext.Provider>
  );
};
