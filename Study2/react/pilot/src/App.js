import React, { Component } from "react";
import Video from "./Video.js";
import Forms from "./Forms.js";
import counterbalanceList from "./configs/counterbalanceList";
import entryList from "./configs/entry.js";

class App extends Component {
    constructor() {
        super();
        this.clickNext = this.clickNext.bind(this);
        this.clickBack = this.clickBack.bind(this);
        this.writeAddress = this.writeAddress.bind(this);
        this.writeAge = this.writeAge.bind(this);
        this.writeSex = this.writeSex.bind(this);
        this.state = {
            page: 1,
            myList: [],
            posList: counterbalanceList[Math.floor(Math.random() * 21)],
            address: "none",
            name: "",
            sex: ""
        };  
        this.closeFirst = Math.floor(Math.random() * 2);
        this.closeAnsList = [];
        this.farAnsList = [];
    }

    writeAddress(myAddress) {
        console.log("====myAddress,", myAddress);
        this.setState({
            address: myAddress
        });
    }

    writeAge(myAge) {
        console.log("====myAge,", myAge);
        this.setState({
            age: myAge
        });
    }

    writeSex(mySex) {
        console.log("====mySex,", mySex);
        this.setState({
            sex: mySex
        });
    }

    clearRadioBtn() {
        let radios = document.querySelectorAll("._radio");
        radios.forEach(el => {
            el.checked = false;
        });
    }

    clickNext(radio) {
        if(this.state.page == 46) {
            if(this.state.age != "" && this.state.sex != "") {
                this.setState({
                    page: this.state.page + 1
                });
                upload();
            }
            else alert("Please fill in your age and sex");
        } else {
            if (radio > 0) {
                this.setState({
                    page: this.state.page + 1
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
    }

    clickBack() {
        this.setState({
            page: this.state.page == 1 ? 1 : this.state.page - 1
        });
        this.clearRadioBtn();
    }

    upload() {
        var link = "https://docs.google.com/forms/d/e/1FAIpQLScnuHpPHp8qHAMd2L47XApTKX4TS7m7gPZY-G49EUR4NH9FCQ/formResponse?";
        let firstAnsList = [];
        let secondAnsList = [];
        var arrayLength = this.state.posList.length;
        for(var i = 0; i < arrayLength; i++) {
            firstAnsList.push(0);
            secondAnsList.push(0);
        }

        for (var i = 0; i < arrayLength; i++) {
            firstAnsList[this.state.posList[i] - 1] = this.state.myList[i];
            secondAnsList[this.state.posList[i] - 1] = this.state.myList[i + 21];
        }
        
        let closeAnsList = this.closeFirst ? firstAnsList : secondAnsList;
        let farAnsList = this.closeFirst ? secondAnsList : firstAnsList;

        for (var i = 0; i < arrayLength; i++) {
            var closeResponse = entryList[i] + "=" + closeAnsList[i] + "&";
            var farResponse = entryList[i + 21] + "=" + farAnsList[i]+ "&";
            link = link.concat(closeResponse);
            link = link.concat(farResponse);
        }
        var addrResponse = entryList[42] + "=" + this.state.address + "&";
        var ageResponse = entryList[43] + "=" + this.state.age + "&";
        var sexResponse = entryList[44] + "=" + this.state.sex;
        link = link.concat(addrResponse + ageResponse + sexResponse);
        console.log("===== link: " + link); 
        window.open(link);
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
                    <Forms myclickNext={this.clickNext} myclickBack={this.clickBack} page={this.state.page} myWriteAddress={this.writeAddress} myWriteAge={this.writeAge} myWriteSex={this.writeSex} />    
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

