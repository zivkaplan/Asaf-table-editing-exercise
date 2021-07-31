import React from 'react';
import './Row.css';
import Cell from './Cell';

export default class Row extends React.Component {
    constructor(props) {
        super(props);
        this.state = { ...this.props.movie, isEditing: false };
        this.toggleEdit = this.toggleEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleMove = this.handleMove.bind(this);
    }

    toggleEdit(idx) {
        this.setState({ ...this.props.movie, isEditing: true });
    }

    handleSubmit(e) {
        e.preventDefault();
        const movie = {
            title: this.state.title,
            year: this.state.year,
        };
        this.props.save(this.props.idx, movie);
        this.setState({ isEditing: false });
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    handleDelete(e) {
        this.props.delete(this.props.idx);
    }

    handleMove(e) {
        this.props.move(this.props.idx, e.target.value);
        this.setState({ ...this.props.movie, isEditing: false });
    }

    render() {
        let renderedCell;
        if (this.state.isEditing) {
            renderedCell = (
                <form class="editForm" onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        value={this.state.title}
                        onChange={this.handleChange}
                        name="title"
                    />
                    <input
                        type="text"
                        value={this.state.year}
                        onChange={this.handleChange}
                        name="year"
                    />
                    <button className="btn">Save</button>
                </form>
            );
        } else {
            renderedCell = (
                <div className="cell">
                    <Cell
                        title={this.props.movie.title}
                        year={this.props.movie.year}
                    />
                    <div className="btnDiv">
                        <button
                            className="arrow"
                            value="up"
                            onClick={this.handleMove}
                        >
                            Move up
                        </button>
                        <button
                            className="arrow"
                            value="down"
                            onClick={this.handleMove}
                        >
                            Move down
                        </button>
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
