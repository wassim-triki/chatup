import React, { useEffect } from 'react';

import Spinner from './Spinner';
import SearchResultItem from './SearchResultItem';
const SearchResult = ({ results, loading }) => {
  useEffect(() => console.log(results), []);
  return (
    <div className="absolute top-[110%] left-0 w-full min-h-[80px] z-30 flex flex-col shadow-xl rounded-3xl p-2 bg-white overflow-x-hidden overflow-y-auto max-h-[calc(100vh-350%)] scrollbar font-fira">
      {loading ? (
        <Spinner size="3xl" fill="green-dark" center={true} />
      ) : results?.length ? (
        results?.map((item) => <SearchResultItem key={item._id} {...item} />)
      ) : (
        <p className="m-auto text-sm text-gray-default">No User Found.</p>
      )}
    </div>
  );
};

export default SearchResult;
