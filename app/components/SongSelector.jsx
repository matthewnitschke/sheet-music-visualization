import React, { Component } from 'react';

import Mousetrap from 'mousetrap';

export default class SongSelector extends Component {

    constructor(props){
        super(props)

        this.state = {
            collapsed: false
        }
    }

    componentDidMount() {
        Mousetrap.bind(['down', 'space'], () => {
            if (this.props.selectedSongIndex != null){
                let nextIndex = (this.props.selectedSongIndex + 1) % this.props.songs.length
                this.props.onSongIndexChange(nextIndex)
            }
        })

        Mousetrap.bind('up', () => {
            if (this.props.selectedSongIndex != null){
                let nextIndex = (this.props.selectedSongIndex - 1) % this.props.songs.length
                if (nextIndex < 0) {
                    nextIndex = this.props.songs.length - 1
                }
                this.props.onSongIndexChange(nextIndex)
            }
        })

        Mousetrap.bind('left', () => {
            this.setState({
                collapsed: true
            })
        })

        Mousetrap.bind('right', () => {
            this.setState({
                collapsed: false
            })
        })
    }

    render() {
        let songNamesDom = this.props.songs.map((song, i) => {
            return <div 
                key={i}
                className={`song-name-select ${this.props.selectedSongIndex == i ? 'selected' : ''}`}
                onClick={() => {this.props.onSongIndexChange(i)}}
            >
                {song.name}
            </div>
        })
        return (
            <div>                
                {
                    !this.state.collapsed && 
                    <div className="sidebar">
                        <div className="song-selector-header">
                            Songs
                        </div>
                        {songNamesDom}
                    </div>
                }
            </div>
        );
    }
}