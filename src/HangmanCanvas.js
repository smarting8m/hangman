import React, { Component } from 'react';
import './Hangman.css';

class HangmanCanvas extends Component {

    /**
     * Once the component is mounted, initialized the canvas
     */
    componentDidMount() {
      this.drawHangman();
    }
  
    /**
     * If the component updates, refresh the canvas
     */
    componentDidUpdate() {
      this.drawHangman();
    }
  
    drawHangman() {
        const numberTry = this.props.tryNumber;
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext("2d");

        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 2;
        ctx.beginPath();

        // Draw a chair at the initialization
        if(numberTry>= 0 && numberTry <= 5) {
            if(numberTry === 0) {
                ctx.moveTo(400, 425)
                ctx.lineTo(400, 375)
        
                ctx.moveTo(325, 425)
                ctx.lineTo(325, 375)
        
                // Assise
                ctx.lineTo(400, 375)
        
                // Dossier
                ctx.lineTo(400, 325)
            }
        
            // Draw the guy
            if(numberTry === 1) {
                // Right Leg
                ctx.moveTo(340, 375)
                ctx.lineTo(360, 300)
                // Left leg
                ctx.moveTo(380, 375)
                ctx.lineTo(360, 300)
        
                // Body
                ctx.lineTo(360, 200)
        
                // Head
                ctx.moveTo(380, 180)
                ctx.arc(360, 180, 20, 0, 2 * Math.PI, true);
        
                // Arm
                ctx.moveTo(360, 220)
                ctx.lineTo(340, 270)
        
                ctx.moveTo(360, 220)
                ctx.lineTo(380, 270)
            }
        
            if(numberTry === 2) {
                // Pied
                ctx.moveTo(180, 425)
                ctx.lineTo(300, 425);
            }
                
            // Potence
            if(numberTry === 3) {
                ctx.moveTo(220, 425);
                ctx.lineTo(220, 80);
        
                ctx.lineTo(360, 80);
            }
        
        
            if(numberTry === 4) {
                // Equerre
                ctx.moveTo(220, 170);
                ctx.lineTo(320, 80);
            }
        
            if(numberTry === 5) {
                // Corde
                ctx.moveTo(360, 80);
                ctx.lineTo(360, 160);
            }
        } else {
            // LOSE
            this.youLose();
        }

        ctx.stroke();
    }
  
    youLose() {
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext("2d");

        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 2;
        ctx.beginPath();

        // Clear the canvas
        ctx.clearRect(0, 0, 640, 425);

        // Draw the guy
        // Right Leg
        ctx.moveTo(340, 375)
        ctx.lineTo(360, 300)
        // Left leg
        ctx.moveTo(380, 375)
        ctx.lineTo(360, 300)

        // Body
        ctx.lineTo(360, 200)

        // Head
        ctx.moveTo(380, 180)
        ctx.arc(360, 180, 20, 0, 2 * Math.PI, true);

        // Arm
        ctx.moveTo(360, 220)
        ctx.lineTo(340, 270)

        ctx.moveTo(360, 220)
        ctx.lineTo(380, 270)

        // Pied
        ctx.moveTo(180, 425)
        ctx.lineTo(300, 425);
        ctx.moveTo(220, 425);
        ctx.lineTo(220, 80);
        ctx.lineTo(360, 80);

        // Equerre
        ctx.moveTo(220, 170);
        ctx.lineTo(320, 80);
        
        // Corde
        ctx.moveTo(360, 80);
        ctx.lineTo(360, 160);

        // Corde
        ctx.moveTo(360, 80);
        ctx.lineTo(360, 160);

        ctx.stroke();

        ctx.fillStyle = "red";
        ctx.textAlign = "center";
        ctx.font = "80px Courier"
        ctx.fillText("Dead man", canvas.width/2, canvas.height/2);
    }
  
    render() {
      return(    
        <div> 
            <canvas ref="canvas" width={640} height={425} />
        </div>
      )
    }
      
  }

  export default HangmanCanvas;