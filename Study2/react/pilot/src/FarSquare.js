import React, { Component } from 'react';

class FarSquare extends Component {
    
    render() {
        const {
            width = '99px',
            height = '99px',
            left,
            top
        } = this.props;

        const style = { width, height, left, top };

        return (
            <div className="far-square" style={style} />
        );
    }
}

export default FarSquare;