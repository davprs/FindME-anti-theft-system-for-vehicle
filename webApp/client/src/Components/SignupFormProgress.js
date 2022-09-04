import React from "react";
import { ProgressBar, Step } from "react-step-progress-bar";
import "react-step-progress-bar/styles.css";

class SignupFormProgress extends React.Component {
    constructor(props) {
        super(props);
        this.state = {progress: 0};
        this.getPercent = this.props.getPercent;
        this.steps = Array.from({length: props.nSteps}, (_, index) => {
            return (
                <Step transition="scale"
                      index={index}
                      key={index.toString()}>
                    {({accomplished}) => (
                        <span className="dot" style={{filter: `saturate(${accomplished ? 100 : 0}%)`}}></span>
                    )}
                </Step>
            )
        });
    }


    updatePercent(){
        this.setState({progress: this.props.getPercent()});
    }
    componentDidMount() {
        this.setState({progress: this.getPercent()});
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <div className={"signupProgressBar"}>
            <ProgressBar
                height={5}
                percent={this.state.progress}
                filledBackground="linear-gradient(to right, #E23237, #B32D30)" className={"signupProgressBar"}>

                {this.steps}
            </ProgressBar>
            </div>
        );
    }
}
export default SignupFormProgress;