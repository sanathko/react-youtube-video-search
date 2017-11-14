import React, { Component} from 'react';

class SearchBar extends Component {

    constructor(props) {
        super(props);
        //create initial state
        this.state = { term: ''};
    }

    //set state
    render() {
        return (
            <div className="search-bar">
                <input 
                    value={this.state.term}
                    onChange={event => this.onInputChange(event.target.value)} />
            </div>
        );
    }

    onInputChange(term) {
        this.setState({term});
        this.props.onSearchTermChange(term);
    }
}

export default SearchBar;