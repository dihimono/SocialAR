import React, { Component } from "react";
import "../node_modules/video-react/dist/video-react.css";
import "./App.css";
import CloseSquare from "./CloseSquare.js";
import FarSquare from "./FarSquare.js";
import videoList from "./configs/videos.js";
import closeList from "./configs/closeList.js";
import farList from "./configs/farList.js";

class Video extends Component {
    render() {
        const {
            page,
            posList
        } = this.props;
        
        let square = null;
        let posId = null;
        let vidId = null;
        
        if ( page !== 1 & page !== 23 && page !== 45 ) {
            if ( page <= 22 ) {
                vidId = this.props.page - 2;    
                
                posId = posList[this.props.page - 2] - 1;
                if ( this.props.closeFirst === 1) {
                    square = <CloseSquare left={closeList[posId]["left"]} top={closeList[posId]["right"]} />;
                }
                if ( this.props.closeFirst === 0) {
                    square = <FarSquare left={farList[posId]["left"]} top={farList[posId]["right"]} />;                        
                }
            } else {
                vidId = this.props.page - 3;
                
                posId = posList[this.props.page - 24] - 1;
                if ( this.props.closeFirst === 0) {
                    square = <CloseSquare left={closeList[posId]["left"]} top={closeList[posId]["right"]} />;
                } else {
                    square = <FarSquare left={farList[posId]["left"]} top={farList[posId]["right"]} />;                        
                }
            }
        }
        
        return (
            <div className="video-player-wrapper">  
                <iframe src={videoList[vidId]} width="840" height="480" className="video-player"></iframe>
                {square}
            </div>
        );
    }
}

export default Video;
