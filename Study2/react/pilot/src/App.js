import React, { Component } from 'react';
import Video from "./Video.js";

class App extends Component {
    render() {
        return (
            <div className="App">
                <p className="App-intro">
                    This is a single page web for pilot study on users' preferences towards AR text display positions.
                </p>
                <Video />
            </div>
        );
    }
}

export default App;
