import React, { useState } from 'react';

const App = () => {
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);

  const submitHandler = (e) => {
    e.preventDefault();
    fetch(`http://www.omdbapi.com/?s=${search}&apikey=263d22d8`)
      .then((response) => response.json())
      .then((value) => setData(value.Search))
      .catch((error) => console.error('Error fetching data:', error));
  };

  const download = (posterUrl) => {
    const link = document.createElement('a');
    link.href = posterUrl;
    link.download = 'movie_poster.jpg';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderMovies = () => {
    // Set the number of columns per row
    const columnsPerRow = 3;

    // Create an array of arrays to represent rows and columns
    const rows = [];
    for (let i = 0; i < data.length; i += columnsPerRow) {
      const row = data.slice(i, i + columnsPerRow);
      rows.push(row);
    }

    // Map over the rows and render each row with columns
    return (
      <div>
        {rows.map((row, rowIndex) => (
          <div className="row" key={rowIndex}>
            {row.map((movie) => (
              <div className="col-sm-4 mb-4" key={movie.imdbID}>
                <div className="card" style={{ width: '18rem' }}>
                  <img src={movie.Poster} className="card-img-top" alt={movie.Title} />
                  <div className="card-body">
                    <h4 className="card-title">{movie.Title}</h4>
                    <a href={movie.Poster} className="btn btn-primary" onClick={() => download(movie.Poster)}>
                      Download Poster
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <center>
        <h1>Search your Favourite Movie</h1>
        <form onSubmit={submitHandler}>
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
          <br />
          <br />
          <input type="submit" value="Search" />
        </form>
        {data && data.length > 0 && renderMovies()}
      </center>
    </div>
  );
};

export default App;
