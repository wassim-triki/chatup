import React, { useCallback, useRef, useState } from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import SearchResult from './SearchResult';
import { useClickAway } from 'react-use';
import { debounce } from 'lodash';
import axios from '../api/axiosConfig';
import useDarkMode from '../context/DarkModeContext/DarkModeState';

const SearchInput = () => {
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleDebounceSearch = async (search) => {
    try {
      setLoading(true);
      const resp = await axios.get(`/users?search=${search}`);
      setResults(resp.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const debounceSearch = useCallback(debounce(handleDebounceSearch, 500), []);
  const { isDark } = useDarkMode();
  const ref = useRef(null);
  useClickAway(ref, () => {
    setShow(false);
  });

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    if (e.target.value.length > 0) {
      setShow(true);
      debounceSearch(e.target.value);
    } else {
      setShow(false);
    }
  };
  return (
    <div ref={ref} className="relative">
      <div
        className={`flex  ${
          isDark ? 'bg-dark-90' : 'bg-white'
        }  rounded-full items-center h-14 overflow-hidden font-poppins `}
      >
        <button
          className=" h-full w-14 flex justify-center items-center
      "
        >
          <IoSearchOutline className={isDark && 'text-white'} />
        </button>

        <input
          className={`outline-none h-full w-full  text-sm placeholder:text-gray-dark pr-7  ${
            isDark
              ? 'bg-dark-90 text-white placeholder:text-dark-70'
              : 'text-gray-dark'
          }`}
          type="text"
          placeholder="SEARCH"
          onChange={handleSearchChange}
          value={search}
        />
      </div>
      {show && <SearchResult results={results} loading={loading} />}
    </div>
  );
};

export default SearchInput;
