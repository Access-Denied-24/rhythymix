import { createContext, useContext, useState } from 'react';

const SearchedContext = createContext();

export const useSearched = () => useContext(SearchedContext);

export const SearchProvider = ({ children }) => {
  const [tracks, setTracks] = useState({
    songs: [],
    albums: [],
    playlists: [],
    artists: [],
  });

  const [isSearched, setIsSearched] = useState(false);


  return (
    <SearchedContext.Provider value={{ isSearched, setIsSearched, tracks, setTracks }}>
      {children}
    </SearchedContext.Provider>
  );
};
