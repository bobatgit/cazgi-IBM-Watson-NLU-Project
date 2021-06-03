import './bootstrap.min.css';
// eslint-disable-next-line
import './App.css';
import EmotionTable from './EmotionTable.js';
import React from 'react';
import axios from 'axios';

class App extends React.Component {
  state = {innercomp:<textarea rows="4" cols="50" id="textinput"/>,
            mode: "text",
          sentimentOutput:[],
          sentiment:true
        }
  
  renderTextArea = ()=>{
    document.getElementById("textinput").value = "";
    if(this.state.mode === "url") {
      this.setState({innercomp:<textarea rows="4" cols="50" id="textinput"/>,
      mode: "text",
      sentimentOutput:[],
      sentiment:true
    })
    } 
  }

  renderTextBox = ()=>{
    document.getElementById("textinput").value = "";
    if(this.state.mode === "text") {
      this.setState({innercomp:<textarea rows="1" cols="50" id="textinput"/>,
      mode: "url",
      sentimentOutput:[],
      sentiment:true
    })
    }
  }

  sendForSentimentAnalysis = () => {
    this.setState({sentiment:true});
    let ret = "";
    let url = ".";

    if(this.state.mode === "url") {
      url = url+"/url/sentiment?url="+document.getElementById("textinput").value;
    } else {
      url = url+"/text/sentiment?text="+document.getElementById("textinput").value;
    }
    ret = axios.get(url);
    ret.then((response)=>{
      console.log(response);  
      //Include code here to check the sentiment and fomrat the data accordingly
      if (response.statusText === "OK") {
          let output = "";
          // Clear last 
          this.setState({sentimentOutput: output});
            if(response.data.label === "positive") {
                output = <div style={{color:"green",fontSize:20}}>Positive with score: {response.data.score}</div>
            } else if (response.data.label === "negative"){
                output = <div style={{color:"red",fontSize:20}}>Negative with score: {response.data.score}</div>
            } else {
                output = <div style={{color:"orange",fontSize:20}}>Neutral with score: {response.data.score}</div>
            }
            this.setState({sentimentOutput:output});
    }}).catch(err => {
        console.log(err);
        console.log(err.response);
        let output = err.response.data.Error;
        this.setState({sentimentOutput:output});
    });
  }

  sendForEmotionAnalysis = () => {
    this.setState({sentiment:false});
    let ret = "";
    let url = ".";
    if(this.state.mode === "url") {
      url = url+"/url/emotion?url="+document.getElementById("textinput").value;
    } else {
      url = url+"/text/emotion/?text="+document.getElementById("textinput").value;
    }
    ret = axios.get(url);

    // // Test only. Should render a table.
    // let response = {'data':{'sad':-0.3, 'happy': 0.25, 'eNgry': 0.89}};
    // this.setState({sentimentOutput:<EmotionTable emotions={response.data}/>});

    ret.then((response)=>{
      this.setState({sentimentOutput:<EmotionTable emotions={response.data}/>});
  }).catch(err => {
        console.log(err);
        console.log(err.response);
        let output = err.response.data.Error;
        this.setState({sentimentOutput:output});
  });
  }
  

  render() {
    return (  
      <div className="App">
      <button className="btn btn-info" onClick={this.renderTextArea}>Text</button>
        <button className="btn btn-dark"  onClick={this.renderTextBox}>URL</button>
        <br/><br/>
        {this.state.innercomp}
        <br/>
        <button className="btn-primary" onClick={this.sendForSentimentAnalysis}>Analyze Sentiment</button>
        <button className="btn-primary" onClick={this.sendForEmotionAnalysis}>Analyze Emotion</button>
        <br/>
            {this.state.sentimentOutput}
      </div>
    );
    }
}

export default App;
