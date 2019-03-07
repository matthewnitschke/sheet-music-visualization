import React, { Component } from 'react';

import SongSelector from './SongSelector.jsx'
import SongDisplayer from './SongDisplayer.jsx'

export default class App extends Component {

    constructor(props) {
        super(props)

        this.state = {
            selectedSongName: "",
            songs: {"This is a song name":{"Intro":["E F# E C"],"Verse":["Em F# C#m"],"Chorus":["E E F F","E F C# E"]},"This is another song name":{"Intro":["E E E E"],"Verse":["E F C D"],"Bridge":["A B C D E F#"]}}
        }
    }

    parseFile = (src) => {
        src = src.trim()
        let songs = src.split(/\[.*\]/).filter(song => !!song.trim())
        let songNames = src.match(/\[(.*)\]/gm).map(name => name.replace(/[\[\]]/gm, ""))

        let data = songs.reduce((accumulator, song, i) => {
            let songName = songNames[i]
            accumulator[songName] = this.parseSong(song)
            return accumulator
        }, {})

        this.setState({
            songs: data
        })
    }

    parseSong = (song) => {
        let sections = song.trim().split(/\n[\s]*\n/gm).filter(section => !!section.trim());

        return sections.reduce((accumulator, section) => {
            let sectionLines = section.split("\n")
            accumulator[sectionLines[0]] = sectionLines.slice(1)
            return accumulator
        }, {})
    } 

    readFile = (e) => {
        var file = e.target.files[0];
        if (!file) {
            return;
        }
        var reader = new FileReader();
        reader.onload = (e) => {
            var contents = e.target.result;
            this.parseFile(contents)
        };
        reader.readAsText(file);
    }

    render() {
        if (this.state.songs == null) {
            return <input type="file" onChange={this.readFile} />
        } else {
            return <div className="h100 df">
                <SongSelector
                    songNames={Object.keys(this.state.songs)} 
                    selectedSongName={this.state.selectedSongName}
                    onSongNameChange={(newSongName) => {
                        this.setState({
                            selectedSongName: newSongName
                        })
                    }}/>
                {
                    !!this.state.selectedSongName &&
                    <SongDisplayer song={this.state.songs[this.state.selectedSongName]}/>
                }
            </div>
        }
    }
}