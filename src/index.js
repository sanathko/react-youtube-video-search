//imports react
import _ from 'lodash';
import React, { Component } from 'react';
import ReactDom from 'react-dom';
import YTSearch from 'youtube-api-search';
import VideoList from './components/video_list';
import VideoDetail from './components/video_details';

import SearchBar from './components/search_bar';

const API_KEY = 'KEY_TO_BE_OBTAINED';

//new component that renders HTML
class App extends Component {
    constructor(props) {
        super(props);
        //default state
        this.state = { 
            videos: [],
            selectedVideo: null 
        };
        this.videoSearch('surfboards');
    }

    videoSearch(term) {
        YTSearch({key: API_KEY, term: term}, (videos) => {
            this.setState({
                videos,
                selectedVideo: videos[0]
            });
        });
    }

    render() {
        const videoSearch = _.debounce((term) => {
            this.videoSearch(term);
        }, 300);
        return (
            <div>
                <SearchBar onSearchTermChange={videoSearch}/>
                <VideoDetail video={this.state.selectedVideo}/>
                <VideoList 
                    onVideoSelect={selectedVideo => this.setState({selectedVideo})} 
                    videos={this.state.videos}/>
            </div>
        );
    }
}

//gets the component's generated html and put it to the DOM
//wrap the component in a jsx tag, to create an instance
ReactDom.render(<App />, document.querySelector('.container'));