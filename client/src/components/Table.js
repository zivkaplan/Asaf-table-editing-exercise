import React from "react";
import "./Table.css";

import Row from "./Row";
import NewRowForm from "./NewRowForm";
import axios from "axios";

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
    const url =
      "https://raw.githubusercontent.com/prust/wikipedia-movie-data/master/movies.json";
    axios
      .get(url)
      .then((response) => {
        this.setState({ data: response.data.slice(0, 100) });
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
        ...st.data.slice(idx + 1)
      ]
    }));
  }

  delete(idx) {
    this.setState((st) => ({
      data: [...st.data.slice(0, idx), ...st.data.slice(idx + 1)]
    }));
  }
  move(idx, direction) {
    if (
      (idx === 0 && direction === "up") ||
      (idx === this.state.data.length - 1 && direction === "down")
    )
      return;
    if (direction === "up") {
      this.setState((st) => ({
        data: [
          ...st.data.slice(0, idx - 1),
          st.data[idx],
          st.data[idx - 1],
          ...st.data.slice(idx + 1)
        ]
      }));
    } else {
      this.setState((st) => ({
        data: [
          ...st.data.slice(0, idx),
          st.data[idx + 1],
          st.data[idx],
          ...st.data.slice(idx + 2)
        ]
      }));
    }
  }
  addNew(movie) {
    this.setState({ ...this.state.data.push(movie) });
  }

  render() {
    const rows = this.state.data.map((movie, idx) => {
      return (
        <Row
          save={this.save}
          delete={this.delete}
          move={this.move}
          movie={movie}
          idx={idx}
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
