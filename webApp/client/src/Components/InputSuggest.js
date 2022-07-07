import Autosuggest from 'react-autosuggest';
import React from 'react';

function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(hints, value) {
    const escapedValue = escapeRegexCharacters(value.trim());

    if (escapedValue === '') {
        return [];
    }

    const regex = new RegExp('^' + escapedValue, 'i');

    return hints.filter(hint => regex.test(hint));
}

function getSuggestionValue(suggestion) {
    return suggestion;
}

function renderSuggestion(suggestion) {
    return (
        <span>{suggestion}</span>
    );
}

class InputSuggest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            placeholder: props.placeholder,
            suggestions: []
        };
    }

    onChangeSuggestion = (event, {newValue}) => {
        this.props.onChange(event,newValue, this.state.id);
    };

    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: getSuggestions(this.props.hints, value)
        });
    };

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    render() {
        const { suggestions } = this.state;
        const inputProps = {
            id: this.state.id,
            placeholder: this.state.placeholder,
            value: this.props.value,
            onChange: this.onChangeSuggestion
        };

        return (
            <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps} />
        );
    }
}

export default InputSuggest;

