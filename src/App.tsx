import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import Home from './pages/Home';
import ShowDetails from './components/ShowDetails';
import './App.css';

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/shows/:id" element={<ShowDetails />} />
                </Routes>
            </Router>
        </Provider>
    );
};

export default App;