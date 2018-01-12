import React, { Component } from 'react';

class Square extends Component {
    
    render() {
        const {
            width = '71px',
            height = '71px',
            left = '20px',
            top = '50px'
        } = this.props;

        const style = { width, height, left, top };

        return (
            <div className="square" style={style} />
        );
    }
}

export default Square;