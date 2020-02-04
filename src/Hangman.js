import React, { Component } from 'react';
import HangmanCanvas from './HangmanCanvas';
import './Hangman.css';

const RANDOMWORDS = ['word', 'hangman', 'loser', 'winner', 'chicken', 'dinner', 'another', 'react', 'learn', 'act'];
const MASK = '_';

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


class TriedLetter extends Component {

  render() {
    return <div></div>;
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
    };
  }


  componentDidMount() {
    
  }

  chooseRandomWord() {
    return RANDOMWORDS[Math.floor(Math.random() * RANDOMWORDS.length)];
  }

  onEnter(e) {
    if(e.keyCode === 13) {
      let userLetter = e.target.value;
      if(userLetter.length === 1) {
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
        }
      } else {
        console.log("Only one letter is allowed");
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
            <HangmanCanvas tryNumber={this.state.fail}/>
            <div>
              <div>Total of try: {this.state.total}</div>
              <div>Tried Letters: {this.state.triedLetters}</div>
              <div>Fail: {this.state.fail}</div>
            </div>  
          </div>
        </header>
      </div>
    );
  }
}

export default Hangman;
