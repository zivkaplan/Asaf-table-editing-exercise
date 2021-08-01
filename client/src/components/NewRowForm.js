import React from 'react';

export default class NewRowForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { name: '', capital: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const country = {
            name: this.state.name,
            capital: this.state.capital,
        };
        this.props.addNew(country);
        this.setState({ name: '', capital: '' });
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    render() {
        return (
            <form className="row newForm" onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    value={this.state.name}
                    onChange={this.handleChange}
                    name="name"
                    placeholder="Country Name"
                />
                <input
                    type="text"
                    value={this.state.capital}
                    onChange={this.handleChange}
                    name="capital"
                    placeholder="Capital"
                />
                <button className="btn addBtn">Add</button>
            </form>
        );
    }
}
