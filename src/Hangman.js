import React, { Component } from 'react';
import AnimationHangman from './AnimationHangman';
import BracketCanvas from './BracketCanvas';
import ChairCanvas from './ChairCanvas';
import './Hangman.css';

const RANDOMWORDS = ['javascript', 'java', 'spring', 'maven', 'python', 'php', 'jenkins', 'react', 'angular', 'mongoDB', 'postgreSQL'];
const MASK = '_';
const TOTAL_CHANCES = 7;


function computeDisplay(phrase, usedLetters) {  
  return phrase.replace(/\w/g, (letter) => (usedLetters.includes(letter) ? letter : '_'))
}


function returnGameOverMessage(word) {
  return <div>Sadly (at least for some people), you can not breathe anymore. If you want to rise from the dead, learn <span className="important">{word}</span> and refresh the page</div>
}

class Hangman extends Component {

  constructor() {
    super();
    this.state = {
      word: this.chooseRandomWord(),
      triedLetters: [],
      total: 0,
      fail:0,
      info: null,
      success : false,
      gameOver: false,
    };
    this.onEnter = this.onEnter.bind(this);
  }

  componentDidMount(){
    document.addEventListener("keydown", this.onEnter, false);
  }
  componentWillUnmount(){
    document.removeEventListener("keydown", this.onEnter, false);
  }

  chooseRandomWord() {
    return RANDOMWORDS[Math.floor(Math.random() * RANDOMWORDS.length)];
  }

  onEnter(e) {
    if((e.keyCode>47 && e.keyCode<58) || (e.keyCode>64 && e.keyCode<91) || (e.keyCode>96 && e.keyCode<123)) {
      let userLetter = e.key;
      if(TOTAL_CHANCES === this.state.fail) {
        this.setState({gameOver: true});
      } else {
        if(this.state.triedLetters.includes(userLetter)) {
          this.setState({info: "You already tried this letter: "+userLetter});
        } else {
          this.setState({info: null});
          this.setState({total: this.state.total+1})
          let lettersTry = this.state.triedLetters.slice();
          lettersTry.push(userLetter);
          this.setState({triedLetters: lettersTry,});
          if(this.state.word.includes(userLetter)) {
            // TODO PMA How to know the user won.

          } else {
            if(TOTAL_CHANCES === this.state.fail+1) {
              this.setState({info: "Sadly (at least for some people), you can not breathe anymore. If you want to rise from the dead, learn "+this.state.word+" and refresh the page"});
            }
            this.setState({fail: this.state.fail+1});
          }
        }
      }
    }
  }

  closePopup = () => {
    window.location.reload(false);
  }

  render() {
    return (
      <div className="Hangman">
        <header className="header"> 
          <div>Hello world, the purpose of this game is to guess the following word ! <span className="minorInfo">(but be careful, if you fail too much, you will be hanged up. Mouahahahaha)</span></div>
          <div className="container">
            <div>
              <div className="wordToGuess">{computeDisplay(this.state.word, this.state.triedLetters)}</div>
            </div>
            <div className="canvasContainer"> 
              <ChairCanvas totalFail={this.state.fail} totalChances={TOTAL_CHANCES}/>
              <BracketCanvas totalFail={this.state.fail} />
              <AnimationHangman totalFail={this.state.fail} totalChances={TOTAL_CHANCES}/>
            </div>
            <div className="board">
              <div>Tried Letters: {this.state.triedLetters}</div>
              <div>Chances left: {TOTAL_CHANCES-this.state.fail}</div>
              <div className="info">{this.state.info}</div>
            </div>  
          </div>
          {this.state.gameOver ?  
          <div>
            <button onClick={this.closePopup}>Refresh to another game</button>
          </div>  
          : 
          null}
        </header>
      </div>
    );
  }
}

export default Hangman;
