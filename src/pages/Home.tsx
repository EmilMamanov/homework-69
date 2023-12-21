import React from 'react';
import SearchInput from '../components/SearchInput';
import SearchResults from '../components/SearchResults';

const Home: React.FC = () => {
    return (
        <div>
            <h1>TV Show Search App</h1>
            <SearchInput />
            <SearchResults />
        </div>
    );
};

export default Home;