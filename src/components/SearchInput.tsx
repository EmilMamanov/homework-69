import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setQuery, searchShows } from '../app/slices/searchSlice';
import { RootState } from '../app/store';
import { AppDispatch } from '../app/store';

const SearchInput: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const query = useSelector((state: RootState) => state.search.query);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuery = e.target.value;
        dispatch(setQuery(newQuery));
        dispatch(searchShows(newQuery));
    };

    return (
        <div>
            <label htmlFor="searchInput">Search for TV show</label>
            <input
                type="text"
                id="searchInput"
                value={query}
                onChange={handleInputChange}
                placeholder="Enter TV show name"
            />
        </div>
    );
};

export default SearchInput;