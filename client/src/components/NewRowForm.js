import React from 'react';

export default class NewRowForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { title: '', year: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const movie = {
            title: this.state.title,
            year: this.state.year,
        };
        this.props.addNew(movie);
        this.setState({ title: '', year: '' });
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    render() {
        return (
            <form class="newForm" onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    value={this.state.title}
                    onChange={this.handleChange}
                    name="title"
                    placeholder="Title"
                />
                <input
                    type="text"
                    value={this.state.year}
                    onChange={this.handleChange}
                    name="year"
                    placeholder="Year"
                />
                <button className="btn">Add</button>
            </form>
        );
    }
}
