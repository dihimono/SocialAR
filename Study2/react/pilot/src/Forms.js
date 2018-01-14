import React, { Component } from 'react';
import { Radio, Button, Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

class Forms extends Component {
    handleClick(e) {
        e.preventDefault();
        console.log('Radio was clicked.');
    }
    handleOptionChange(changeEvent) {
        this.setState({
            selectedOption: changeEvent.target.value
        });
    }
    // componentDidMount() {
    //     this.inputNode.value;
    // }
    
    // handleSubmit(e) {
    //     e.preventDefault()
    //     var form = e.target
    //     var myTextInput = form.elements.myTextInput.value
    //     var myRadioInput = form.elements.myRadioInput.value
    //     // ...
    // }

    render() {
        const {
            myclickNext,
            myclickBack,
            myclickRadio,
            page
        } = this.props;

        return (
            <div className="form">
                {(() => {
                    switch (page) {
                        case 1:
                            return (
                                <div> 
                                    你好，我們是台大資工所行動與人機互動實驗室(NTU mobile HCI lab)。這份問卷主要是為了調查大家對於對話情境中 AR 文字擺放位置的偏好。整份問卷填寫時間大約 10 分鐘。
                                    接下來，你將會看到很多段的影片。每段影片中，請評估自己若與影片中的人對話時，對於影片中文字方塊出現的位置的喜好度，以 1 ~ 5 分來評分。
                                </div>
                            )
                            break;
                        case 23:
                            return (
                                <div>
                                    恭喜你已經完成本問卷的一半。你可以稍作休息，再按下 Submit 以後我們將進行第二部分的評分。
                                </div>
                            )
                        case 45:
                            return (
                                <div>
                                    <div>
                                        恭喜你已完成全部的問卷內容。為了實驗統計目的以及抽獎的需求，請幫我們填寫以下的一些基本資料。這些資料並不會使用在除抽獎以及實驗外的其他目的。非常感謝你的協助。
                                    </div>
                                    <Form>
                                        <FormGroup controlId="formInlineName">
                                            <ControlLabel>姓名</ControlLabel>{' '}
                                            <FormControl type="text" placeholder="陳政亮" />
                                        </FormGroup>{' '}
                                        <FormGroup controlId="formInlineName">
                                            <ControlLabel>年齡</ControlLabel>{' '}
                                            <FormControl type="text" placeholder="18" />
                                        </FormGroup>{' '}
                                        <FormGroup controlId="formInlineName">
                                            <ControlLabel>性別</ControlLabel>{' '}
                                            <FormControl type="text" placeholder="男" />
                                        </FormGroup>{' '}
                                    </Form>
                                </div>
                            )
                        default :
                            return (
                                <div>
                                    <div>
                                        請依照自己在這個方框內閱讀文字的意願喜好程度來進行評分，一分為最不願意，五分為最願意    
                                    </div>   
                                    <Radio name="groupOptions" onClick={() => this.handleClick}> 5</Radio>
                                    <Radio name="groupOptions" onClick={() => myclickRadio(4)}> 4</Radio>
                                    <Radio name="groupOptions" onClick={() => myclickRadio(3)}> 3</Radio>
                                    <Radio name="groupOptions" onClick={() => myclickRadio(2)}> 2</Radio>
                                    <Radio name="groupOptions" onChange={() => this.handleClick}> 1</Radio>
                                </div>
                            )
                            null
                    }
                })()}
                <div className="button-group">
                    <Button bsClass="submit-button" onClick={myclickNext} active> Submit</Button>
                    <Button bsClass="submit-button" onClick={myclickBack}> Back</Button>
                </div>
            </div>
        );
    }

}

export default Forms;
