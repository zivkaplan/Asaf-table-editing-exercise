import React from 'react';

export default class Cell extends React.Component {
    render() {
        return (
            <div className="data">
                <div className="name">{this.props.name}</div>
                <div className="capital">{this.props.capital}</div>
            </div>
        );
    }
}
