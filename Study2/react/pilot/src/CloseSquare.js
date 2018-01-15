import React, { Component } from "react";

class CloseSquare extends Component {
    
    render() {
        const {
            width = "71px",
            height = "71px",
            left,
            top,
        } = this.props;

        const style = { width, height, left, top, backgroundColor: "black" };
        return (
            <div className="close-square" style={style}>
                <div className="ar-text" style={{opacity: 100, color: "white", size: "7px", textAlign: "center"}}>
                    範例文字1 <br/>
                    範例文字2 <br/>
                    範例文字3 <br/> 
                </div>
            </div>
        );
    }
}

export default CloseSquare;
