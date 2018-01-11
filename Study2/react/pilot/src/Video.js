import React, { Component } from 'react';
import { Player, ControlBar, PlayToggle } from 'video-react';
import "../node_modules/video-react/dist/video-react.css";
import './App.css';

class Video extends Component {
    render() {
        return (
            <div className="video-player-wrapper">  
                {/*<Player
                    playsInline
                    autoPlay
                    poster="/assets/poster.png"
                    //src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
                    src="https://drive.google.com/file/d/1KG3BteC6WIjy86EW8ENG-yTJ5ZmVtj6S/preview"
                >
                    <ControlBar className="hide-css">
                        <PlayToggle className="hide-css" />
                    </ControlBar>
                </Player>*/}
                <iframe src="https://drive.google.com/file/d/1KG3BteC6WIjy86EW8ENG-yTJ5ZmVtj6S/preview" width="640" height="480"></iframe>
            </div>
        );
    }
}

export default Video;
