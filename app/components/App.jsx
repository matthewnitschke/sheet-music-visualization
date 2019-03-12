import React, { Component } from 'react';

import SongSelector from './SongSelector.jsx'
import SongDisplayer from './SongDisplayer.jsx'

export default class App extends Component {

    constructor(props) {
        super(props)

        this.state = {
            selectedSongIndex: 0,
            // songs: [{
            //     name: "This is a song name",
            //     comments: [],
            //     sections: [{
            //         name: "Verse",
            //         comments: [],
            //         lines: ["E E E E"],
            //     }]
            // }]
            songs: null
        }
    }

    parseFile = (src) => {
        debugger
        src = src.trim()
        let songs = src.split(/\[.*\]/).filter(song => !!song.trim())
        let songNames = src.match(/\[(.*)\]/gm).map(name => name.replace(/[\[\]]/gm, ""))

        let data = songs.reduce((accumulator, song, i) => {
            let songName = songNames[i]
            accumulator.push(this.parseSong(song, songName))
            return accumulator
        }, [])

        this.setState({
            songs: data
        })
    }

    parseComment = (comment) => {
        return comment.trim().replace(/^\/\/(\s)*/, "")
    }

    parseSong = (song, songName) => {
        song = song.trim()

        let songCommentsRegex = /(\/\/(.*)\n)+[\s]*\n/gm
        let songComments = song.match(songCommentsRegex)
        if (songComments) {
            songComments = songComments.map(this.parseComment)
            song = song.replace(songCommentsRegex, "")
        } else {
            songComments = []
        }

        let sections = song.split(/\n[\s]*\n/gm)
            .filter(section => !!section.trim())
            .reduce((accumulator, section) => {
                let sectionLines = section.split("\n")
                let sectionName = sectionLines[0]
                sectionLines = sectionLines.slice(1)


                let sectionComments = sectionLines
                    .filter(sectionLine => sectionLine.substring(0, 2) == "//")
                    .map(this.parseComment)
                
                sectionLines = sectionLines
                    .filter(sectionLine => sectionLine.substring(0, 2) != "//")
                    .map(line => line.trim())

                
                accumulator.push({
                    name: sectionName,
                    comments: sectionComments,
                    lines: sectionLines
                })
                return accumulator
            }, [])
        
        return {
            name: songName,
            comments: songComments,
            sections: sections
        }
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
            return <div className="df jcc aic h100">
                <input id="songFileSelector" className="song-file-selector" type="file" onChange={this.readFile} />
                <label htmlFor="songFileSelector">Select a Song</label>
            </div>
        } else {
            return <div className="h100 df">
                <SongSelector
                    songs={this.state.songs} 
                    selectedSongIndex={this.state.selectedSongIndex}
                    onSongIndexChange={(newSongIndex) => {
                        this.setState({
                            selectedSongIndex: newSongIndex
                        })
                    }}/>
                {
                    this.state.selectedSongIndex != null  &&
                    <SongDisplayer song={this.state.songs[this.state.selectedSongIndex]}/>
                }
            </div>
        }
    }
}