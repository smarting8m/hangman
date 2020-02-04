import React, { Component } from "react";

class ChairCanvas extends Component {

    componentDidMount() {
        this.initializeChair();
    }

    componentDidUpdate() {
        if(this.props.totalFail === 6) {
            this.removeChair();
        }
    }

    initializeChair() {
        this.drawChair();
    }

    removeChair() {
        const canvas = this.refs.chair;
        const ctx = canvas.getContext("2d");

        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    drawChair() {
        const canvas = this.refs.chair;
        const ctx = canvas.getContext("2d");
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 2;

        ctx.moveTo(400, 425);
        ctx.lineTo(400, 375);

        ctx.moveTo(325, 425);
        ctx.lineTo(325, 375);

        // Assise
        ctx.lineTo(400, 375);

        // Dossier
        ctx.lineTo(400, 325);

        ctx.stroke();
    }

    render() {
        return(    
            <canvas className="chair" ref="chair" width={640} height={425} />
        )
    }

}

export default ChairCanvas;