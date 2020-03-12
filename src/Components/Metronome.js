import React, { Component } from "react";
import "./metronome.css";
import click1 from "./click1.wav";
import click2 from "./click2.wav";

class Metronome extends Component {
    constructor(props) {
        super(props);

        this.state = {
            bpm: 100,
            playing: false,
            count: 0,
            beatsPerMeasure: 4
        };

        this.click1 = new Audio(click1);
        this.click2 = new Audio(click2);
    }

    startStop = () => {
        if (this.state.playing) {
            clearInterval(this.timer);
            this.setState({
                playing: false
            });
        } else {
            this.timer = setInterval(
                this.playClick,
                (60 / this.state.bpm) * 1000
            );

            this.setState(
                {
                    count: 0,
                    playing: true
                },
                this.playClick
            );
            this.click1.play();
        }
    };

    handleBpmChange = event => {
        const bpm = event.target.value;

        if (this.state.playing) {
            clearInterval(this.timer);
            this.timer = setInterval(this.playClick, (60 / bpm) * 1000);

            this.setState({
                count: 0,
                bpm
            });
        } else {
            this.setState({ bpm });
        }
    };

    playClick = () => {
        const { count, beatsPerMeasure } = this.state;
        if (count % beatsPerMeasure === 0) {
            this.click2.play();
        } else {
            this.click1.play();
        }

        this.setState(state => ({
            count: (state.count + 1) % state.beatsPerMeasure
        }));
    };

    render() {
        const { bpm, playing } = this.state;

        return (
            <div className="metronome container ">
                <div className="row">
                    <div className="col"></div>
                    <div className="col-12 border border-warning background mt-5 p-5 rounded">
                        <h2 className="m-2"> Simple Metronome App</h2>

                        <div className="bpm-slider mt-5">
                            <div>{bpm} BPM</div>
                            <input
                                type="range"
                                min="60"
                                max="300"
                                value={bpm}
                                onChange={this.handleBpmChange}
                            />
                        </div>

                        <button
                            className="button mt-5"
                            onClick={this.startStop}
                        >
                            {playing ? "Stop" : "Start"}
                        </button>
                    </div>
                    <div className="col"></div>
                </div>
            </div>
        );
    }
}

export default Metronome;
