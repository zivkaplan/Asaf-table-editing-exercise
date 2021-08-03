import React from 'react';

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

    save(id, updatedCountry) {
        axios
            .put(`api/countries/edit/${id}`, updatedCountry)
            .then((response) => {
                this.setState((st) => ({
                    data: st.data.map((country) => {
                        if (country._id === id) {
                            country.name = updatedCountry.name;
                            country.capital = updatedCountry.capital;
                        }
                        return country;
                    }),
                }));
            })
            .catch((error) => {
                // handle error
                console.log(error);
            });
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

    move(id, index, direction) {
        if (
            (index <= 0 && direction === 'up') ||
            (index >= this.state.data.length - 1 && direction === 'down')
        )
            return;
        const directionNum = direction === 'up' ? -1 : 1;

        const mainCountry = this.state.data[index];
        const neighborCountry = this.state.data[index + directionNum];

        mainCountry.index = neighborCountry.index;
        neighborCountry.index = index;

        axios
            .put('api/countries/reorder', { mainCountry, neighborCountry })
            .then((response) => {
                // after server comformation - change the position on client side in state
                if (direction === 'up') {
                    this.setState((st) => ({
                        data: [
                            ...st.data.slice(0, index - 1),
                            mainCountry,
                            neighborCountry,
                            ...st.data.slice(index + 1),
                        ],
                    }));
                } else {
                    this.setState((st) => ({
                        data: [
                            ...st.data.slice(0, index),
                            neighborCountry,
                            mainCountry,
                            ...st.data.slice(index + 2),
                        ],
                    }));
                }
            })
            .catch((e) => console.log(e));
    }

    addNew(country) {
        country.index = this.state.data[this.state.data.length - 1].index + 1;
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
        const rows = this.state.data.map((country, idx) => {
            return (
                <Row
                    save={this.save}
                    delete={this.delete}
                    move={this.move}
                    country={country}
                    id={country._id}
                    index={idx}
                    key={country._id}
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
