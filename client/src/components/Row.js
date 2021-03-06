import React from 'react';

export default class Row extends React.Component {
    constructor(props) {
        super(props);
        this.state = { ...this.props.country, isEditing: false };
        this.toggleEdit = this.toggleEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleMove = this.handleMove.bind(this);
    }

    toggleEdit(e) {
        this.setState({ ...this.props.country, isEditing: true });
    }

    handleSubmit(e) {
        e.preventDefault();
        const country = {
            name: this.state.name,
            capital: this.state.capital,
        };
        this.props.save(this.props.id, country);
        this.setState({ isEditing: false });
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    handleDelete(e) {
        this.props.delete(this.props.id);
    }

    handleMove(e) {
        this.props.move(this.props.id, this.props.index, e.target.value);
        this.setState({ ...this.props.country, isEditing: false });
    }

    render() {
        let renderedCell;
        if (this.state.isEditing) {
            renderedCell = (
                <form className="row editForm" onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        value={this.state.name}
                        onChange={this.handleChange}
                        name="name"
                    />
                    <input
                        type="text"
                        value={this.state.capital}
                        onChange={this.handleChange}
                        name="capital"
                    />
                    <button className="btn">Save</button>
                </form>
            );
        } else {
            renderedCell = (
                <div className="row">
                    <div className="name">{this.props.country.name}</div>
                    <div className="capital">{this.props.country.capital}</div>
                    <div className="btnDiv">
                        <div>
                            <button
                                className="arrow"
                                value="up"
                                onClick={this.handleMove}
                            >
                                &uarr;
                            </button>
                            <button
                                className="arrow"
                                value="down"
                                onClick={this.handleMove}
                            >
                                &darr;
                            </button>
                        </div>
                        <button onClick={this.toggleEdit} className="btn">
                            Edit
                        </button>
                        <button onClick={this.handleDelete} className="btn">
                            Delete
                        </button>
                    </div>
                </div>
            );
        }
        return renderedCell;
    }
}
