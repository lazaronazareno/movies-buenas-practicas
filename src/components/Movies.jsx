function ListOfMovies ({ movies }) {
  return (
    <ul className='movies'>
      {
        movies.map(movie => (
          <li className='movie card text-center justify-content-between' key={movie.id}>
            <h3>{movie.title}</h3>
            <p>{movie.year}</p>
            <img className='img-thumbnail' src={`https://image.tmdb.org/t/p/w500${movie.image}`} alt={movie.Title} />
          </li>
        ))
      }
    </ul>
  )
}

function NoMoviesResults () {
  return (
    <p>No se encontraron peliculas para esta búsqueda</p>
  )
}

export function Movies ({ movies }) {
  const hasMovies = movies?.length > 0

  return (
    hasMovies
      ? <ListOfMovies movies={movies} />
      : <NoMoviesResults />
  )
}
