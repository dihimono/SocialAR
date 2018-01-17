import React, { Component } from "react";

class FarSquare extends Component {
    
    render() {
        const {
            width = "99px",
            height = "99px",
            left,
            top
        } = this.props;

        const style = { width, height, left, top, backgroundColor: "black" };

        return (
            <div className="far-square" style={style}>
                <div className="ar-text" style = {{opacity: 100, color: "white", size: "10px", textAlign: "center"}}>
                    範例文字1 <br/>
                    範例文字2 <br/>
                    範例文字3 <br/>
                    範例文字4 <br/>
                    範例文字5 <br/>
                </div>
            </div>
        );
    }
}

export default FarSquare;
