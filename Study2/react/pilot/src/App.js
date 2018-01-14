import React, { Component } from 'react';
import Video from "./Video.js";
import Forms from "./Forms.js";

class App extends Component {
    constructor() {
        super();
        this.clickNext = this.clickNext.bind(this);
        this.clickBack = this.clickBack.bind(this);
        this.state = {
            page: 1,
            myList: []
        };  
        this.counterbalance = Math.floor(Math.random() * 21);
        this.closeFirst = Math.floor(Math.random() * 2);
    }

    clickNext(radio) {
        console.log('====== clickNext');
        if ( radio > 0) {
            this.setState({
                page: this.state.page + 1,
            })
            if ( this.state.page != 1 && this.state.page != 23 && this.state.page != 45)
            this.setState({
                myList: this.state.myList.concat([radio])
            })


            console.log('====== click ', radio)
        } else {
            alert("Please choose one preference")
        }
    }

    clickBack() {
        console.log('===== clickBack');
        this.setState({
            page: this.state.page == 1 ? 1 : this.state.page - 1
        })
    }

    
    render() {
        console.log('======== myList, ', this.state.myList)
        console.log('============= closeFirst', this.closeFirst)
        console.log('============= this.state.page', this.state.page);
        console.log('============= random', this.counterbalance)
        return (
            <div className="App">
                <p className="App-intro">
                    台大資工所行動與人機互動實驗室(NTU mobile HCI lab) 對話情境中 AR 文字擺放位置偏好調查
                </p>
                <div className="parent">  
                    <Video page={this.state.page} counterbalance={this.counterbalance} closeFirst={this.closeFirst}/>
                    <Forms myclickNext={this.clickNext} myclickBack={this.clickBack} page={this.state.page} />    
                </div>  
                
            </div>
        );
    }
}

export default App;
