import React, { Component } from 'react';

export default class SongDisplayer extends Component {
    render() {
        let songName = this.props.song.name
        let songComments = this.props.song.comments

        let songSectionsDom = this.props.song.sections.map((section, i) => {
            let sectionDom = section.lines.map((line, j) => {
                return <div key={j}>{line}</div>
            })

            let sectionCommentsDom = section.comments.map((comment, j) => {
                return <div key={j}>// {comment}</div>
            })

            return <div key={i} className="section">
                <div className="section-name">{section.name}</div>
                <div className="section-comments">{sectionCommentsDom}</div>
                <div className="section-body">
                    {sectionDom}
                </div>
            </div>
        })

        let songCommentsDom = songComments.map((comment, i) => {
            return <div key={i}>
                // {comment}
            </div>
        })

        return (
            <div className="h100 dfc">
                <div className="song-name">{songName}</div>
                <div className="song-comments">{songCommentsDom}</div>
                <div className="dfc h100" style={{ flexWrap: 'wrap' }}>
                    {songSectionsDom}
                </div>
            </div>
        );
    }
}