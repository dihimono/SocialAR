import React, { Component } from 'react';

class CloseSquare extends Component {
    
    render() {
        const {
            width = '71px',
            height = '71px',
            left,
            top
        } = this.props;

        const style = { width, height, left, top };

        return (
            <div className="close-square" style={style} />
        );
    }
}

export default CloseSquare;