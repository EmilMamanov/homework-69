import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchShows, setSelectedShow } from '../app/slices/searchSlice';
import { RootState } from '../app/store';
import { AppDispatch } from '../app/store';
import { Link, useNavigate } from 'react-router-dom';

const SearchResults: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const searchResults = useSelector((state: RootState) => state.search.searchResults);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(searchShows(''));
    }, [dispatch]);

    const handleShowClick = (showId: number) => {
        dispatch(setSelectedShow(null));

        const clickedShow = searchResults.find(result => result.show.id === showId);
        console.log('Clicked Show:', clickedShow);

        navigate(`/shows/${showId}`);
    };

    return (
        <div>
            <h2>Search Results</h2>
            {searchResults.length > 0 ? (
                <ul>
                    {searchResults.map((result, index) => (
                        <li key={index} onClick={() => handleShowClick(result.show.id)}>
                            <Link to={`/shows/${result.show.id}`}>
                                {result.show.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No results found.</p>
            )}
        </div>
    );
};

export default SearchResults;