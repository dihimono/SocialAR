import React, { Component } from 'react';
import "../node_modules/video-react/dist/video-react.css";
import './App.css';
import CloseSquare from './CloseSquare.js';
import FarSquare from './FarSquare.js';

class Video extends Component {
    render() {
        const {
            page,
            counterbalance,
            closeFirst
        } = this.props;

        const videoList = [
            "https://drive.google.com/file/d/1DhU1-4V2vPNGklI_ou63QRXEEAbznYUN/preview",
            "https://drive.google.com/file/d/1CYejpH10OXsbR4pAMaqw5a_joF7Ss3rh/preview",
            "https://drive.google.com/file/d/15KwHLTrCLKd7DpsDp6ofqC34svjuNtPp/preview",
            "https://drive.google.com/file/d/196ZGYX83_xcVgg-MG-ZK-VgviNVWGU2f/preview",
            "https://drive.google.com/file/d/1VfMwVGNUtMEjGtSwmM4qmhw0oBuRtZ8L/preview",
            "https://drive.google.com/file/d/1PXPufbaKXp8PaG6pQbr_aqWx0sV3iGnG/preview",
            "https://drive.google.com/file/d/1cCmyrxI2wjq1sY7zig9rHU4_QnzkfenM/preview",
            "https://drive.google.com/file/d/1wJZlCIU8B-7EmqqP0eyf5G-udF8-ovKs/preview",
            "https://drive.google.com/file/d/1a-BG69srW1BD-fuS_Po45tOkZDngfmKB/preview",
            "https://drive.google.com/file/d/1RYxlulYnHiqD9Y0a7bAkGtaYasX0IRwQ/preview",
            "https://drive.google.com/file/d/15EIylVCWzON5B_F6pXfy-mQ7jJzL7dw3/preview",
            "https://drive.google.com/file/d/14fSH-51V9F6Yrz4vgfqM3w8iX-gfBgiH/preview",
            "https://drive.google.com/file/d/15hBmdsR8Tkvsuh513xhQw-AB4Krmqg_B/preview",
            "https://drive.google.com/file/d/1EKwpCj3ARJ6AcPepQHL0LOadIWEv1gev/preview",
            "https://drive.google.com/file/d/1kefmmYJQc-7rjXdwRszkYo7N5D5DVWiV/preview",
            "https://drive.google.com/file/d/1Hn9PjnKWH4T_jIH2f2RTOq8UA_SsecAc/preview",
            "https://drive.google.com/file/d/10_QTECoVl522Nmi_qKz_hzSgd43Bv5Ny/preview",
            "https://drive.google.com/file/d/1YkiBgf2XIGw5FRR3t3SKIQqlXctNdNBL/preview",
            "https://drive.google.com/file/d/10supcoeElglMM6O8-VYrD4jMEyM-iLWJ/preview",
            "https://drive.google.com/file/d/1qb3_gXN7Rw0tacdR3dQ6rNQvREKYPCH5/preview",
            "https://drive.google.com/file/d/1f7oVikQJAbDapQRRzmWKnAa3qg_Hz4Ub/preview",
            "https://drive.google.com/file/d/1jDY-E8q-HG620nni-t5BTGCbvA7KQjBd/preview",
            "https://drive.google.com/file/d/1i3JsM6bOG2s4RyWYfwQ1r1bX_KSuN0-1/preview",
            "https://drive.google.com/file/d/1uG79BGXfUomMTydg2w-XNoq9CKgDIPZ0/preview",
            "https://drive.google.com/file/d/10wW3u0g2rucsMyrIbpZwFzWr-vCKEoZS/preview",
            "https://drive.google.com/file/d/1rsGifHXRvtIMgDi5lVe7P5FFoCEpP3Sz/preview",
            "https://drive.google.com/file/d/1apCYsiQ_oaqSCTEufpj1ETu93vkeGGRJ/preview",
            "https://drive.google.com/file/d/17nqzQU83rf3zRPO3gXroRC9xOmp_im5J/preview",
            "https://drive.google.com/file/d/1-dpHL6Plw8iSIR7hRfd9vVfKHqQuZ5-Y/preview",
            "https://drive.google.com/file/d/1xhI0YQd5FFn002daQnd-Ah-JeOsh046I/preview",
            "https://drive.google.com/file/d/11YVs00-eVAP54djOiTzsntpTQKALwDw6/preview",
            "https://drive.google.com/file/d/1rJKjI9iQOjq1USSje7zuhYR8TLkxXOpU/preview",
            "https://drive.google.com/file/d/1vTvptF_mTVxUoFHN-kSTMisN7gSiXW1I/preview",
            "https://drive.google.com/file/d/1Jo0CuDSdQiS_II8A6h476VN3nZlmQmpA/preview",
            "https://drive.google.com/file/d/1PnUdqJqDiznUyViwH9laTo8vk6mJLb_P/preview",
            "https://drive.google.com/file/d/1jTNI_2GbiV-oHIq0XBs8YNin6luc97UO/preview",
            "https://drive.google.com/file/d/1BdEoTSXCU30gPU-jf_-3MHtkbLPsIRNo/preview",
            "https://drive.google.com/file/d/1TIc31WPCDsfxcEFDk38Tu6Gpe2F_pixo/preview",
            "https://drive.google.com/file/d/129rJ6WHK_4BQy6UvXKoLZboOumIn-szX/preview",
            "https://drive.google.com/file/d/1SAjIBDtxyiHDMwMhL0mAH3kMYLAsX9B6/preview",
            "https://drive.google.com/file/d/1dG44DOE0QNq_XfRWC7eU2pPNWp-8ZX5C/preview",
            "https://drive.google.com/file/d/1AgDrjYUyriQai4MS8hw4ZIn3Y58iNs4Q/preview"
        ] 

        const closeList = [
            {left:332, right:-14},
            {left:403, right:-14},
            {left:474, right:-14},
            {left:261, right:57},
            {left:332, right:57},
            {left:403, right:57},
            {left:474, right:57},
            {left:545, right:57},
            {left:261, right:128},
            {left:332, right:128},
            {left:403, right:128},
            {left:474, right:128},
            {left:545, right:128},
            {left:261, right:199},
            {left:332, right:199},
            {left:403, right:199},
            {left:474, right:199},
            {left:545, right:199},
            {left:332, right:270},
            {left:403, right:270},
            {left:474, right:270}
        ]

        const farList = [
            {left: 192, right: 3},
            {left: 291, right: 3},
            {left: 489, right: 3},
            {left: 588, right: 3},
            {left: 192, right: 102},
            {left: 291, right: 102},
            {left: 390, right: 102},
            {left: 489, right: 102},
            {left: 588, right: 102},
            {left: 192, right: 201},
            {left: 291, right: 201},
            {left: 390, right: 201},
            {left: 489, right: 201},
            {left: 588, right: 201},
            {left: 192, right: 300},
            {left: 291, right: 300},
            {left: 390, right: 300},
            {left: 489, right: 300},
            {left: 588, right: 300},
            {left: 291, right: 399},
            {left: 390, right: 399}
        ]

        const counterbalanceList = [
            [1, 2, 21, 3, 20, 4, 19, 5, 18, 6, 17, 7, 16, 8, 15, 9, 14, 10, 13, 11, 12],
            [2, 3, 1, 4, 21, 5, 20, 6, 19, 7, 18, 8, 17, 9, 16, 10, 15, 11, 14, 12, 13],
            [3, 4, 2, 5, 1, 6, 21, 7, 20, 8, 19, 9, 18, 10, 17, 11, 16, 12, 15, 13, 14],
            [4, 5, 3, 6, 2, 7, 1, 8, 21, 9, 20, 10, 19, 11, 18, 12, 17, 13, 16, 14, 15],
            [5, 6, 4, 7, 3, 8, 2, 9, 1, 10, 21, 11, 20, 12, 19, 13, 18, 14, 17, 15, 16],
            [6, 7, 5, 8, 4, 9, 3, 10, 2, 11, 1, 12, 21, 13, 20, 14, 19, 15, 18, 16, 17],
            [7, 8, 6, 9, 5, 10, 4, 11, 3, 12, 2, 13, 1, 14, 21, 15, 20, 16, 19, 17, 18],
            [8, 9, 7, 10, 6, 11, 5, 12, 4, 13, 3, 14, 2, 15, 1, 16, 21, 17, 20, 18, 19],
            [9, 10, 8, 11, 7, 12, 6, 13, 5, 14, 4, 15, 3, 16, 2, 17, 1, 18, 21, 19, 20],
            [10, 11, 9, 12, 8, 13, 7, 14, 6, 15, 5, 16, 4, 17, 3, 18, 2, 19, 1, 20, 21],
            [11, 12, 10, 13, 9, 14, 8, 15, 7, 16, 6, 17, 5, 18, 4, 19, 3, 20, 2, 21, 1],
            [12, 13, 11, 14, 10, 15, 9, 16, 8, 17, 7, 18, 6, 19, 5, 20, 4, 21, 3, 1, 2],
            [13, 14, 12, 15, 11, 16, 10, 17, 9, 18, 8, 19, 7, 20, 6, 21, 5, 1, 4, 2, 3],
            [14, 15, 13, 16, 12, 17, 11, 18, 10, 19, 9, 20, 8, 21, 7, 1, 6, 2, 5, 3, 4],
            [15, 16, 14, 17, 13, 18, 12, 19, 11, 20, 10, 21, 9, 1, 8, 2, 7, 3, 6, 4, 5],
            [16, 17, 15, 18, 14, 19, 13, 20, 12, 21, 11, 1, 10, 2, 9, 3, 8, 4, 7, 5, 6],
            [17, 18, 16, 19, 15, 20, 14, 21, 13, 1, 12, 2, 11, 3, 10, 4, 9, 5, 8, 6, 7],
            [18, 19, 17, 20, 16, 21, 15, 1, 14, 2, 13, 3, 12, 4, 11, 5, 10, 6, 9, 7, 8],
            [19, 20, 18, 21, 17, 1, 16, 2, 15, 3, 14, 4, 13, 5, 12, 6, 11, 7, 10, 8, 9],
            [20, 21, 19, 1, 18, 2, 17, 3, 16, 4, 15, 5, 14, 6, 13, 7, 12, 8, 11, 9, 10],
            [21, 1, 20, 2, 19, 3, 18, 4, 17, 5, 16, 6, 15, 7, 14, 8, 13, 9, 12, 10, 11]
        ]
 
        var posList = counterbalanceList[this.props.counterbalance]
        console.log('============= this.counterbalance', this.props.counterbalance);
        console.log("pos: " + posList)
        console.log('============= this.closeFirst' + this.props.closeFirst )
        console.log('============= ', this.props.closeFirst == 1)
        
        let square = null;
        let posId = null;
        let video = null;
        let vidId = null;
        
        if ( page == 1 || page == 23 || page == 45 ) {
            
        } else if ( page <= 22 ) {
            vidId = this.props.page - 2    
            video = <iframe src={videoList[vidId]} width="840" height="480" className="video-player"></iframe>
            
            posId = posList[this.props.page - 2] - 1
            if ( this.props.closeFirst == 1) {
                console.log("====== 1")
                square = <CloseSquare left={closeList[posId]["left"]} top={closeList[posId]["right"]} />
            }
            if ( this.props.closeFirst == 0) {
                console.log("====== 2")
                square = <FarSquare left={farList[posId]["left"]} top={farList[posId]["right"]} />                        
            }
        } else {
            vidId = this.props.page - 24 
            video = <iframe src={videoList[vidId]} width="840" height="480" className="video-player"></iframe>
            
            posId = posList[this.props.page - 24] - 1
            if ( this.props.closeFirst == 0) {
                console.log("====== 3")
                square = <CloseSquare left={closeList[posId]["left"]} top={closeList[posId]["right"]} />
            } else {
                console.log("====== 4") 
                square = <FarSquare left={farList[posId]["left"]} top={farList[posId]["right"]} />                        
            }
        }
        console.log("====== pos", posId)
        console.log("====== vidId ", vidId)
        

        return (
            <div className="video-player-wrapper">  
                
                {video}
                {square}
            </div>
        );
    }
}

export default Video;
