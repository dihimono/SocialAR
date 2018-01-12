import React, { Component } from 'react';
import "../node_modules/video-react/dist/video-react.css";
import './App.css';
import Square from './Square.js';

class Video extends Component {
    render() {
        
        return (
            <div className="video-player-wrapper">  
                <iframe src="https://drive.google.com/file/d/1KG3BteC6WIjy86EW8ENG-yTJ5ZmVtj6S/preview" width="840" height="480"></iframe>
                <Square width="100px" height="50px" left="300px" top="350px" />
            </div>
        );
    }
}

export default Video;
