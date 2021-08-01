import React from 'react';
import './Table.css';

import Row from './Row';
import NewRowForm from './NewRowForm';
import axios from 'axios';

export default class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: [] };
        this.delete = this.delete.bind(this);
        this.save = this.save.bind(this);
        this.move = this.move.bind(this);
        this.addNew = this.addNew.bind(this);
    }

    componentDidMount() {
        axios
            .get('/api/countries')
            .then((response) => {
                this.setState({ data: response.data });
            })
            .catch((error) => {
                // handle error
                console.log(error);
            });
    }
    save(idx, movie) {
        console.log(movie);
        this.setState((st) => ({
            data: [
                ...st.data.slice(0, idx),
                (st.data[idx] = { ...movie }),
                ...st.data.slice(idx + 1),
            ],
        }));
    }

    delete(id) {
        axios
            .delete(`api/countries/${id}`)
            .then((response) => {
                this.setState({
                    data: this.state.data.filter((c) => c._id !== id),
                });
            })
            .catch((error) => {
                // handle error
                console.log(error);
            });
    }

    move(idx, direction) {
        if (
            (idx === 0 && direction === 'up') ||
            (idx === this.state.data.length - 1 && direction === 'down')
        )
            return;
        if (direction === 'up') {
            this.setState((st) => ({
                data: [
                    ...st.data.slice(0, idx - 1),
                    st.data[idx],
                    st.data[idx - 1],
                    ...st.data.slice(idx + 1),
                ],
            }));
        } else {
            this.setState((st) => ({
                data: [
                    ...st.data.slice(0, idx),
                    st.data[idx + 1],
                    st.data[idx],
                    ...st.data.slice(idx + 2),
                ],
            }));
        }
    }
    addNew(country) {
        axios
            .post('api/countries', country)
            .then((response) => {
                this.setState({ ...this.state.data.push(response.data) });
            })
            .catch((error) => {
                // handle error
                console.log(error);
            });
    }

    render() {
        const rows = this.state.data.map((country) => {
            return (
                <Row
                    save={this.save}
                    delete={this.delete}
                    move={this.move}
                    country={country}
                    id={country._id}
                />
            );
        });
        return (
            <div className="flexTable">
                {rows}
                <NewRowForm addNew={this.addNew} />
            </div>
        );
    }
}
