import React, { Component } from 'react';
import "../node_modules/video-react/dist/video-react.css";
import './App.css';
import Square from './Square.js';

class Video extends Component {
    render() {
        
        return (
            <div className="video-player-wrapper">  
                <iframe src="https://www.youtube.com/embed/DnYLVZGbuCg" width="840" height="480" className="video-player"></iframe>
                <Square width="71px" height="71px" left="261px" top="341px" />
            </div>
        );
    }
}

export default Video;
