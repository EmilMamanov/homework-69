import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import type { Draft } from 'immer'

interface Schedule {
    time: string;
    days: string[];
}

interface Rating {
    average: number;
}

interface Network {
    id: number;
    name: string;
    country: {
        name: string;
        code: string;
        timezone: string;
    };
    officialSite: string;
}

interface Image {
    medium: string;
    original: string;
}

interface External {
    tvrage: number | null;
    thetvdb: number;
    imdb: string;
}

interface Links {
    self: { href: string };
    previousepisode: { href: string };
    nextepisode: { href: string };
}

export interface Show {
    id: number;
    url: string;
    name: string;
    type: string;
    language: string;
    genres: string[];
    status: string;
    runtime: number;
    averageRuntime: number;
    premiered: string;
    ended: string | null;
    officialSite: string | null;
    schedule: Schedule;
    rating: Rating;
    weight: number;
    network: Network;
    webChannel: string | null;
    dvdCountry: string | null;
    externals: External;
    image: Image;
    summary: string;
    updated: number;
    _links: Links;
    show: string;
}

interface SearchState {
    query: string;
    searchResults: { score: number; show: Show }[];
    selectedShow: Show | null;
}

const initialState: SearchState = {
    query: '',
    searchResults: [],
    selectedShow: null,
};

export const searchShows = createAsyncThunk('search/searchShows', async (query: string) => {
    try {
        const response = await axios.get<Show[]>(`http://api.tvmaze.com/search/shows?q=${query}`);
        console.log('API Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
});

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setQuery: (state, action: PayloadAction<string>) => {
            state.query = action.payload;
        },
        setSelectedShow: (state, action: PayloadAction<Show | null>) => {
            state.selectedShow = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(searchShows.fulfilled, (state, action) => {
            state.searchResults = action.payload.map((show) => ({
                score: 0,
                show: {
                    ...show,
                    name: show.show && typeof show.show.name === 'string' ? show.show.name : 'Unknown Name',
                }
            })) as Draft<{ score: number; show: Show }[]>;
        });
    },
});

export const { setQuery, setSelectedShow  } = searchSlice.actions;

export default searchSlice.reducer;
