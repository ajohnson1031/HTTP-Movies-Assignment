import React, { useState, useEffect } from "react";
import axios from "axios";

const MovieAddForm = props => {
  const [movieState, setMovieState] = useState({
    title: "",
    director: "",
    metascore: "",
    stars: ""
  });
  const [messages, setMessages] = useState({ message: null, errors: null });

  const handleChange = e => {
    e.target.name === "stars"
      ? setMovieState({ ...movieState, stars: e.target.value.split(",") })
      : setMovieState({ ...movieState, [e.target.name]: e.target.value });
    setMessages({ ...messages, message: null, errors: null });
  };

  const handleSubmit = e => {
    e.preventDefault();

    movieState.title === "" ||
    movieState.director === "" ||
    movieState.metascore === "" ||
    movieState.stars === ""
      ? setMessages({ ...messages, errors: "Please complete all fields..." })
      : axios
          .post(`http://localhost:5000/api/movies/`, {
            id: new Date().getTime(),
            title: movieState.title,
            director: movieState.director,
            metascore: movieState.metascore,
            stars: movieState.stars
          })
          .then(res => {
            setMovieState({
              title: "",
              director: "",
              metascore: "",
              stars: ""
            });
            props.history.push("/");
          })
          .catch(err => {
            setMessages({ ...messages, errors: err });
          });
  };

  return (
    <form action="">
      <h4>Add Movie:</h4>
      <input
        type="text"
        name="title"
        value={movieState.title}
        placeholder="Enter title..."
        onChange={handleChange}
      />
      <input
        type="text"
        name="director"
        value={movieState.director}
        placeholder="Enter director..."
        onChange={handleChange}
      />
      <input
        type="text"
        name="metascore"
        value={movieState.metascore}
        placeholder="Enter metascore..."
        onChange={handleChange}
      />
      <input
        type="text"
        name="stars"
        value={movieState.stars}
        placeholder="Enter stars (comma separated)..."
        onChange={handleChange}
      />
      <button onClick={handleSubmit}>Add Movie +</button>
      {messages.message && (
        <div className="message stat">{messages.message}</div>
      )}
      {messages.errors && <div className="errors stat">{messages.errors}</div>}
    </form>
  );
};

export default MovieAddForm;
