import { useCallback, useState } from 'react'
import './App.css'
import { Movies } from './components/movies'
import { useMovies } from './hooks/useMovies'
import { useSearch } from './hooks/useSearch'
import debounce from 'just-debounce-it'

function App () {
  const [sort, setSort] = useState(false)
  const { search, updateSearch, error } = useSearch()
  const { movies, loading, getMovies } = useMovies({ search, sort })

  // "Debounce" : tiempo entre que el usuario termina de escribir y realiza el fetch en el onchange
  const debouncedGetMovies = useCallback(debounce(search => {
    getMovies({ search })
  }, 400)
  , [getMovies])

  const handleChange = (event) => {
    const newSearch = event.target.value
    updateSearch(newSearch)
    debouncedGetMovies(newSearch)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    // Para obtener muchos input de un form a la vez (Forma no controlada)
    // const fields = Object.fromEntries(new window.FormData(event.target))
    /* const { query } = Object.fromEntries(
      new window.FormData(event.target)
    ) */
    getMovies({ search })
  }

  const handleSort = () => {
    setSort(!sort)
  }

  return (
    <div className='App'>

      <header className='w-100 d-flex flex-column justify-content-center align-items-center'>
        <h1>Movies App</h1>
        <form onSubmit={handleSubmit} className='w-100 d-flex gap-2 justify-content-center align-items-center'>
          <input
            value={search}
            onChange={handleChange}
            className='form-control'
            type='text'
            name='search'
            placeholder='Avengers, Batman, Star-Wars...'
          />
          <label htmlFor='title'>Ordenar Alfabeticamente</label>
          <input id='title' title='title' type='checkbox' onChange={handleSort} checked={sort} />
          <button type='submit' className='btn btn-danger'>Search</button>
        </form>
        {error && <p className='text-danger'>{error}</p>}
      </header>

      <main>
        {
          loading ? <p>Cargando...</p> : <Movies movies={movies} />
        }
      </main>
    </div>
  )
}

export default App
