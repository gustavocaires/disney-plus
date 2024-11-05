const API_KEY = 'a2c2c30ca5fea3351982ff0d4436a2c6'
const API_LANGUAGE = 'pt-br'
const BASE_URL_IMAGE = {
    original: 'https://image.tmdb.org/t/p/original',
    small: 'https://image.tmdb.org/t/p/w500'
}
const movies = []
let movieActive = 'tt12801262'
const moviesElement = document.getElementById('movies')

function getUrlMovie(movieId) {
    return `https://api.themoviedb.org/3/movie/${movieId}?language=${API_LANGUAGE}&api_key=${API_KEY}`
}

function changeButtonMenu() {
    const button = document.querySelector('.button-menu')
    const navigation = document.querySelector('.navigation')

    button.classList.toggle('active')
    navigation.classList.toggle('active')
}

function setMainMovie(movie) {

    const appImage = document.querySelector('.app_image img')
    const title = document.querySelector('.feature_movie h1')
    const description = document.querySelector('.feature_movie p')
    const info = document.querySelector('.feature_movie span')
    const rating = document.querySelector('.rating strong')


    title.innerHTML = movie.title
    description.innerHTML = movie.overview
    rating.innerHTML = movie.vote_average
    info.innerHTML = movie.release + ' - ' + movie.genre + ' - Movie'

    appImage.setAttribute('src', movie.image.original)

}

function changeMovieActiveInList(newMovieActive) {
    const movieActiveCurrent = document.getElementById(movieActive)
    movieActiveCurrent.classList.remove('active-movie')

    const movieActiveNew = document.getElementById(newMovieActive)
    movieActiveNew.classList.add('active-movie')

    movieActive = newMovieActive
}

function changeMainMovie(movieId){
    changeMovieActiveInList(movieId)

    const movie = movies.find(movie => movie.id == movieId)

    setMainMovie(movie)
    // changeButtonMenu()
}

function createButtonMovie(movieId) {
    const button = document.createElement('button')
    button.setAttribute('onclick', `changeMainMovie('${movieId}')`)
    button.innerHTML = '<img src="/assets/icon-play-button.png" alt="Icon play" />'
    return button
}

function createImageMovie(movieImage, movieTitle) {
    const divImageMovie = document.createElement('div')
    divImageMovie.classList.add('movie_image')
    const image = document.createElement('img')


    image.setAttribute('src', movieImage)
    image.setAttribute('alt', `Imagem do filme ${movieTitle}`)
    image.setAttribute('loading', 'lazy')

    divImageMovie.appendChild(image)
    return divImageMovie
}

function addMovieInList(movie) {
    const movieElement = document.createElement('li')
    movieElement.classList.add('movie')

    movieElement.setAttribute('id', movie.id)

    const genre = `<span>${movie.genres}</span>`
    const title = `<strong>${movie.title}</strong>`

    movieElement.innerHTML = genre + title
    movieElement.appendChild(createButtonMovie(movie.id))
    movieElement.appendChild(createImageMovie(movie.image.small, movie.title))

    moviesElement.appendChild(movieElement)
}

function loadMovies() {
    const LIST_MOVIES = ['tt12801262', 'tt4823776']
    LIST_MOVIES.map((movie, index) => {
        fetch(getUrlMovie(movie)).then(response => response.json()).then(data => {

            const movieData = {
                id: movie,
                title: data.title,
                overview: data.overview,
                vote_average: data.vote_average,
                genre: data.genres[0].name,
                release: data.release_date.split('-')[0],
                image: {
                    original: BASE_URL_IMAGE.original.concat(data.backdrop_path),
                    small: BASE_URL_IMAGE.small.concat(data.backdrop_path),
                }
            }

            movies.push(movieData)

            addMovieInList(movieData)

            if (index == 0) {
                setMainMovie(movieData)
                movieActive = movieData.id

                const movieActiveNew = document.getElementById(movieActive)
                movieActiveNew.classList.add('active-movie')
            
                
            }

        })
    })
}


loadMovies()