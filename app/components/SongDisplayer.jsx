import React, { Component } from 'react';

export default class SongDisplayer extends Component {
    render() {
        let songSectionsDom = Object.keys(this.props.song).map((sectionName, i) => {
            let sectionDom = this.props.song[sectionName].map((sectionLine, j) => {
                return <div key={j}>{sectionLine}</div>
            })
            return <div key={i} className="section">
                <div className="section-name">{sectionName}</div>
                <div className="section-body">
                    {sectionDom}
                </div>
            </div>
        })
        return (
            <div className="dfc">{songSectionsDom}</div>
        );
    }
}