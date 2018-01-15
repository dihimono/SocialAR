import React, { Component } from "react";
import { Radio, Button, Form, FormGroup, ControlLabel, FormControl } from "react-bootstrap";

class Forms extends Component {
    constructor() {
        super();
        this.state = {
            radio: 0,
            address: "",
            age: "",
            sex: ""
        };
        this.addrChange = this.addrChange.bind(this); 
        this.ageChange = this.ageChange.bind(this); 
        this.sexChange = this.sexChange.bind(this); 
    }
    
    myclickRadio(no) {
        this.setState({
            radio: no
        });
        
    }

    addrChange(e) {
        this.setState({
            address: e.target.value
        });
        this.props.myWriteAddress(e.target.value);
    }

    ageChange(e) {
        this.setState({
            age: e.target.value
        });
        this.props.myWriteAge(e.target.value);
    }

    sexChange(e) {
        this.setState({
            sex: e.target.value
        });
        this.props.myWriteSex(e.target.value);
    }
   
    render() {
        const {
            myclickNext,
            myclickBack,
            page,
            myWriteAddress,
            myWriteAge,
            myWriteSex
        } = this.props;

        //let forms =  document.querySelectorAll("addr");
        //var nameValue = .value;
        console.log("====nameValue ", this.state.radio);
        return (
            <div className="form">
                {(() => {
                    switch (page) {
                    case 1:
                        return (
                            <div> 
                                    你好，我們是台大資工所行動與人機互動實驗室(NTU mobile HCI lab)。這份問卷主要是為了調查大家對於對話情境中 AR 文字擺放位置的偏好。整份問卷填寫時間大約 20 分鐘。
                                    接下來，你將會看到很多段的影片。每段影片上會有一個色塊，請評估自己若與影片中的人對話時，對於在色塊中擺放文字並閱讀的喜好程度，以 1 ~ 5 分來評分。
                            </div>
                        );
                    case 23:
                        return (
                            <div>
                                    恭喜你已經完成本問卷的一半。你可以稍作休息，再按下 Submit 以後我們將進行第二部分的評分。
                            </div>
                        );
                    case 45:
                        return (
                            <div>
                                <div>
                                        恭喜你已完成全部的問卷內容。為了實驗統計目的以及抽獎的需求，請幫我們填寫以下的一些基本資料。這些資料並不會使用在除抽獎以及實驗外的其他目的。非常感謝你的協助。
                                </div>
                                <Form>
                                    <FormGroup controlId="formInlineName" >
                                        <ControlLabel>電子信箱</ControlLabel>{" "}
                                        <FormControl type="text" className="addr" value={this.state.address} placeholder="example@gmail.com" onChange={this.addrChange} />
                                    </FormGroup>{" "}
                                    <FormGroup controlId="formInlineName">
                                        <ControlLabel>年齡</ControlLabel>{" "}
                                        <FormControl type="text" placeholder="18" value={this.state.age} onChange={this.ageChange}/>
                                    </FormGroup>{" "}
                                    <FormGroup controlId="formInlineName">
                                        <ControlLabel>性別</ControlLabel>{" "}
                                        <FormControl type="text" placeholder="男" value={this.state.sex} onChange={this.sexChange}/>
                                    </FormGroup>{" "}
                                </Form>
                            </div>
                        );
                    default :
                        return (
                            <div>
                                <div>
                                        請依照自己在這個色塊內閱讀文字的意願喜好程度來進行評分，一分為最不願意，五分為最願意    
                                </div>   
                                <input type="radio" className="_radio" name="groupOptions" onClick={() => this.myclickRadio(5)}/> 5
                                <input type="radio" className="_radio" name="groupOptions" onClick={() => this.myclickRadio(4)}/> 4
                                <input type="radio" className="_radio" name="groupOptions" onClick={() => this.myclickRadio(3)}/> 3
                                <input type="radio" className="_radio" name="groupOptions" onClick={() => this.myclickRadio(2)}/> 2
                                <input type="radio" className="_radio" name="groupOptions" onClick={() => this.myclickRadio(1)}/> 1
                            </div>
                        );
                            
                    }
                })()}
                <div className="button-group">
                    <Button bsClass="submit-button" onClick={() => {
                        myclickNext((page == 1 || page ==23 || page == 45) ? 6 : this.state.radio);
                        this.setState({
                            radio: 0
                        });
                    }}> Submit</Button>
                    <Button bsClass="submit-button" onClick={myclickBack}> Back</Button>
                </div>
            </div>
        );
    }

}

export default Forms;
