import React, { Component } from 'react';
import './Hangman.css';

class BracketCanvas extends Component {

    /**
     * Once the component is mounted, initialized the canvas
     */
    componentDidMount() {
      this.updateBracket();
    }
  
    /**
     * If the component updates, refresh the canvas
     */
    componentDidUpdate() {
      this.updateBracket();
    }
  
    updateBracket() {
        const totalFail = this.props.totalFail;
        const canvas = this.refs.bracket;
        const ctx = canvas.getContext("2d");

        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 2;
        ctx.beginPath();
    
        if(totalFail === 2) {
            // Pied
            ctx.moveTo(180, 425)
            ctx.lineTo(300, 425);
        }
            
        // Potence
        if(totalFail === 3) {
            ctx.moveTo(220, 425);
            ctx.lineTo(220, 80);
    
            ctx.lineTo(360, 80);
        }
    
        if(totalFail === 4) {
            // Equerre
            ctx.moveTo(220, 170);
            ctx.lineTo(320, 80);
        }
    
        if(totalFail === 5) {
            // Corde
            ctx.moveTo(360, 80);
            ctx.lineTo(360, 205);
        }

        ctx.stroke();
    }
  
    render() {
        return(    
            <canvas className="bracket" ref="bracket" width={640} height={425} />
        )
    }
      
  }

  export default BracketCanvas;