import React, { Component } from "react";
import Video from "./Video.js";
import Forms from "./Forms.js";
import counterbalanceList from "./configs/counterbalanceList";

class App extends Component {
    constructor() {
        super();
        this.clickNext = this.clickNext.bind(this);
        this.clickBack = this.clickBack.bind(this);
        this.state = {
            page: 1,
            myList: [],
            posList: counterbalanceList[Math.floor(Math.random() * 21)]
        };  
        this.closeFirst = Math.floor(Math.random() * 2);
    }

    clearRadioBtn() {
        let radios = document.querySelectorAll("._radio");
        radios.forEach(el => {
            el.checked = false;
        });
    }

    clickNext(radio) {
        //if ( radio > 0 || 1 = 1) {
        if ( 1 == 1 ) {  
            this.setState({
                page: this.state.page + 1,
            });
            if ( radio < 6 ) {
                this.setState({
                    myList: this.state.myList.concat([radio])
                });
                this.clearRadioBtn();
            }
        } else {
            alert("Please choose one preference");
        }
    }

    clickBack() {
        this.setState({
            page: this.state.page == 1 ? 1 : this.state.page - 1
        });
        this.clearRadioBtn();
    }

    upload() {
        //var linkPrefix = "https://docs.google.com/forms/d/e/1FAIpQLScnuHpPHp8qHAMd2L47XApTKX4TS7m7gPZY-G49EUR4NH9FCQ/formResponse?";
    }
    
    render() {
        
        let content = null;
        if ( this.state.page == 46) {
            this.upload();
            content = 
                <div className="final">
                    感謝你參與本次的問卷調查，我們將會於(1/25)抽出抽獎的獎品。屆時將會再以 e-mail 通知中獎人，謝謝。
                </div>;
        } else {
            content = 
                <div className="parent">  
                    <Video page={this.state.page} posList={this.state.posList} closeFirst={this.closeFirst} />
                    <Forms myclickNext={this.clickNext} myclickBack={this.clickBack} page={this.state.page} />    
                </div>; 
        }


        return (
            <div className="App">
                <p className="App-intro">
                    台大資工所行動與人機互動實驗室(NTU mobile HCI lab) 對話情境中 AR 文字擺放位置偏好調查
                </p>
                {content}
                
            </div>
        );
    }
}

export default App;

