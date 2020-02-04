import React, { Component } from 'react';
import './Hangman.css';

class HangmanCanvas extends Component {

    /**
     * Once the component is mounted, initialized the canvas
     */
    componentDidMount() {
      this.updateHangman();
    }
  
    /**
     * If the component updates, refresh the canvas
     */
    componentDidUpdate() {
      this.updateHangman();
    }

    updateHangman() {
        const totalFail = this.props.totalFail;

        // Draw the guy
        if(totalFail === 1) {
            this.drawGuy(false);
        }

        if(totalFail >= this.props.totalChances) {
            this.drawGuy(true);
        }
    }

    drawGuy(rotate) {
        const canvas = this.refs.hangman;
        const ctx = canvas.getContext("2d");

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.save();

        if(rotate) {
            ctx.fillStyle = "red";
            ctx.textAlign = "center";
            ctx.font = "80px Courier"
            ctx.fillText("YOU L SE", canvas.width/2 - 10, canvas.height/2 + 5);
            ctx.translate(380, 200);
            ctx.rotate(this.props.angle*Math.PI/180);
            ctx.translate(-380,-200);
        }

        // Draw the guy
        // Right Leg
        ctx.moveTo(340, 375)
        ctx.lineTo(360, 300)
        // Left leg
        ctx.moveTo(380, 375)
        ctx.lineTo(360, 300)

        // Body
        ctx.moveTo(360, 300)
        ctx.lineTo(360, 200)

        // Head
        if(rotate) {
            ctx.moveTo(400, 200)
            ctx.strokeStyle = 'red';
            ctx.arc(380, 200, 20, 0, 2 * Math.PI, true);
            ctx.fill();
            ctx.strokeStyle = '#FFFFFF';
        } else {
            ctx.moveTo(360, 180)
            ctx.arc(360, 190, 20, 0, 2 * Math.PI, true);
            ctx.fillStyle = "white";
            ctx.fill();
        }
        

        // Arm
        ctx.moveTo(360, 220)
        ctx.lineTo(340, 270)

        ctx.moveTo(360, 220)
        ctx.lineTo(380, 270)

        ctx.stroke();
        ctx.restore();
    }
  
    render() {
        return(    
            <canvas className="hangman" ref="hangman" width={640} height={425} />
        )
    }
      
  }

  export default HangmanCanvas;