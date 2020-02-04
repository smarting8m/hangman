import React, { Component } from 'react';
import AnimationHangman from './AnimationHangman';
import BracketCanvas from './BracketCanvas';
import ChairCanvas from './ChairCanvas';
import './Hangman.css';

const RANDOMWORDS = ['javascript', 'java', 'spring', 'maven', 'python', 'php', 'jenkins', 'react', 'angular', 'mongoDB', 'postgreSQL'];
const MASK = '_';
const TOTAL_CHANCES = 7;

class WordToGuess extends Component {

  render() {
    const word = this.props.word;
    let maskedWord = "";
    word.split("").forEach((letter, idx) => {
      if(this.props.foundLetters.includes(letter)) {
        if(idx === 0) {
          letter = letter.toUpperCase();
        }
        maskedWord += letter;
      } else {
        maskedWord += MASK;
      }
      if(idx !== word.length-1) {
        maskedWord += " ";
      }
    });

  return <div className="wordToGuess">{maskedWord}</div>;
  }
}

class Hangman extends Component {

  constructor() {
    super();
    this.state = {
      word: this.chooseRandomWord(),
      foundLetters: [],
      triedLetters: [],
      total: 0,
      fail:0,
      info: null,
    };
  }

  chooseRandomWord() {
    return RANDOMWORDS[Math.floor(Math.random() * RANDOMWORDS.length)];
  }

  onEnter(e) {
    if(e.keyCode === 13) {
      let userLetter = e.target.value;
      
      if(userLetter.length === 1) {
        if(TOTAL_CHANCES === this.state.fail) {
          this.setState({info: "Sadly (for some people), you can not breathe in anymore"});
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
              let foundLetter = this.state.foundLetters.slice();
              foundLetter.push(userLetter);
              this.setState({foundLetters: foundLetter,});
            } else {
              this.setState({fail: this.state.fail+1})
              if(this.state.fail+1 === TOTAL_CHANCES) {
                this.setState({info: "Sadly (for some people), you can not breathe in anymore"});
              }
            }
          }
        }
      } else {
        this.setState({info: "Only one alphanumeric letter is allowed"});
      }
    }
  }

  render() {
    return (
      <div className="Hangman">
        <header className="header"> 
          <div>Hello world, the purpose of this game is to guess the following word ! <span className="minorInfo">(but be careful, if you fail too much, you will be hanged up. Mouahahahaha)</span></div>
          
          <input className="userTry" onKeyDown={event => this.onEnter(event)} ></input>
          
          <div className="container">
            <WordToGuess word={this.state.word} foundLetters={this.state.foundLetters} />
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
        </header>
      </div>
    );
  }
}

export default Hangman;
