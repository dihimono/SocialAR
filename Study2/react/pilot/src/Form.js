import React, { Component } from 'react';
import { Radio, Button} from 'react-bootstrap';

class Form extends Component {
    handleClick(e) {
        e.preventDefault();
        console.log('The link was clicked.');
    }

    render() {
        const {
            myclickNext
        } = this.props;

        return (
            <div className="form">
                <div name="explanation">
                    [Explanation Text:]    
                </div>    
                <Radio name="groupOptions"> 1</Radio>
                <Radio name="groupOptions"> 2</Radio>
                <Radio name="groupOptions"> 3</Radio>
                <Radio name="groupOptions"> 4</Radio>
                <Radio name="groupOptions"> 5</Radio>
                <Button bsClass="submit-button" onClick={myclickNext}> Submit</Button>
                <Button bsClass="submit-button" > Back</Button>
            </div>
        );
    }

}

export default Form;