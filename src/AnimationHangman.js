import React, { Component } from "react";
import HangmanCanvas from "./HangmanCanvas";

class AnimationHangman extends Component {
    constructor(props) {
        super(props);
        this.state = { angle: 0 };
        this.updateAnimationState = this.updateAnimationState.bind(this);
        this.angleToAdd = 0.15;
    }
    
    componentDidMount() {
        this.rAF = requestAnimationFrame(this.updateAnimationState);
    }
    
    updateAnimationState() {
        if(Math.abs(this.state.angle) > 5) {
            this.angleToAdd = -this.angleToAdd;
        }
        this.setState(prevState => ({angle: prevState.angle + this.angleToAdd}));
        
        this.rAF = requestAnimationFrame(this.updateAnimationState);
    }

    componentWillUnmount() {
        cancelAnimationFrame(this.rAF);
    }

    render() {
        return <HangmanCanvas angle={this.state.angle} totalFail={this.props.totalFail} totalChances={this.props.totalChances}/>;
    }
}


export default AnimationHangman;