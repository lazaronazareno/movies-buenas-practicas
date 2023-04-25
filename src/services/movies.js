const API_KEY = '32182978fce0e42fb9959f133881340e'

export const searchMovies = async ({ search }) => {
  if (search === '') return null

  try {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${search}`)
    const json = await response.json()
    const movies = json.results

    return movies?.map(movie => ({
      id: movie.id,
      title: movie.title,
      year: movie.release_date,
      image: movie.poster_path
    }))
  } catch (e) {
    throw new Error('Error searching movies')
  }
}
