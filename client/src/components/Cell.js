import React from 'react';

export default class Cell extends React.Component {
    render() {
        return (
            <div className="data">
                <div className="title">{this.props.title}</div>
                <div className="year">{this.props.year}</div>
            </div>
        );
    }
}
