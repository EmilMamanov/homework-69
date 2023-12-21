import React from 'react';

interface AutocompleteProps {
    options: string[];
    onOptionClick: (option: string) => void;
}

const Autocomplete: React.FC<AutocompleteProps> = ({ options, onOptionClick }) => {
    return (
        <div>
            {options.length > 0 && (
                <ul>
                    {options.map((option, index) => (
                        <li key={index} onClick={() => onOptionClick(option)}>
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Autocomplete;