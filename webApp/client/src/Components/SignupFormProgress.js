import React from "react";
import { ProgressBar, Step } from "react-step-progress-bar";
import "react-step-progress-bar/styles.css";

class SignupFormProgress extends React.Component {
    constructor(props) {
        super(props);
        this.state = {progress: 0};
    }

    componentDidMount() {
        const nSteps = 3 ;
        setTimeout( ()=>this.setState({progress: 50}), 2000);
        setTimeout( ()=>this.setState({progress: 100}), 3000);
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <div className={"signupProgressBar"}>
            <ProgressBar
                height={5}
                percent={0}
                percent={this.state.progress}
                filledBackground="linear-gradient(to right, #E23237, #B32D30)" className={"signupProgressBar"}>
                <Step transition="scale"
                    index={1}>
                    {({ accomplished }) => (
                        <div className="dot" style={{ filter: `saturate(${accomplished ? 100 : 0}%)` }}></div>

                    )}
                </Step>
                <Step transition="scale"
                      position={90}
                      index={2}>
                    {({ accomplished }) => (
                        <div className="dot" style={{ filter: `saturate(${accomplished ? 100 : 0}%)` }}></div>

                    )}
                </Step>
                <Step transition="scale"
                    position={100}
                    index={3}>
                    {({ accomplished }) => (
                        <span className="dot" style={{ filter: `saturate(${accomplished ? 100 : 0}%)` }}></span>
                    )}
                </Step>
            </ProgressBar>
            </div>
        );
    }
}

export default SignupFormProgress;