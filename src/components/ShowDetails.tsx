import React from 'react';
import { useSelector, } from 'react-redux';
import {useParams} from "react-router-dom";
import { RootState } from '../app/store';
import { Show } from '../app/slices/searchSlice';

const ShowDetails: React.FC = () => {
    const { id } = useParams();
    const selectedShow = useSelector<RootState, Show | undefined>(
        (state) => {
            const showResult = state.search.searchResults.find(result => result.show.id.toString() === id);
            return showResult ? showResult.show : undefined;
        }
    );

    if (!selectedShow) {
        return <div>Loading...</div>;
    }

    const { name, image, summary } = selectedShow;

    return (
        <div>
            <h2>Show Details</h2>
            <h3>{name}</h3>
            <img src={image.original} alt={name} />
            <p dangerouslySetInnerHTML={{ __html: summary }} />
        </div>
    );
};

export default ShowDetails;
