import React, { Component } from 'react';

import Mousetrap from 'mousetrap';

export default class SongSelector extends Component {

    componentDidMount() {
        Mousetrap.bind('down', () => {
            if (this.props.selectedSongName != null){
                let currentIndex = this.props.songNames.indexOf(this.props.selectedSongName)
                let nextIndex = (currentIndex + 1) % this.props.songNames.length
                this.props.onSongNameChange(this.props.songNames[nextIndex])
            }
        })

        Mousetrap.bind('up', () => {
            if (this.props.selectedSongName != null){
                let currentIndex = this.props.songNames.indexOf(this.props.selectedSongName)
                let nextIndex = (currentIndex - 1) % this.props.songNames.length
                if (nextIndex < 0) {
                    nextIndex = this.props.songNames.length -1
                }
                this.props.onSongNameChange(this.props.songNames[nextIndex])
            }
        })
    }

    render() {
        let songNamesDom = this.props.songNames.map((songName, i) => {
            return <div 
                key={i}
                className={`song-name-select ${this.props.selectedSongName == songName ? 'selected' : ''}`}
                onClick={() => {this.props.onSongNameChange(songName)}}
            >
                {songName}
            </div>
        })
        return (
            <div className="sidebar">
                {songNamesDom}
            </div>
        );
    }
}