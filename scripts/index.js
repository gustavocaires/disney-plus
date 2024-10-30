const API_KEY = 'a2c2c30ca5fea3351982ff0d4436a2c6'
const API_LANGUAGE = 'pt-br'
const BASE_URL_IMAGE = {
    original: 'https://image.tmdb.org/t/p/original',
    small: 'https://image.tmdb.org/t/p/w500'
}
const movies = []

const moviesList = document.getElementById('movies')

function getUrlMovie(movieId) {
    return `https://api.themoviedb.org/3/movie/${movieId}?language=${API_LANGUAGE}&api_key=${API_KEY}`
}

function changeButtonMenu() {
    const button = document.querySelector('.button-menu')
    const navigation = document.querySelector('.navigation')
    
    button.classList.toggle('active')
    navigation.classList.toggle('active')
}

function setMainMovie(movieId) {
    fetch(getUrlMovie(movieId)).then( response => response.json()).then( data => {
        const appImage = document.querySelector('.app_image img')
    
        const title = document.querySelector('.feature_movie h1')
        const description = document.querySelector('.feature_movie p')
        const info = document.querySelector('.feature_movie span')
        const rating = document.querySelector('.rating strong')
    
        const yearRelease = data.release_date.split('-')[0]
    
        title.innerHTML = data.title
        description.innerHTML = data.overview
        rating.innerHTML = data.vote_average
        info.innerHTML = yearRelease + ' - ' + data.genres[0].name + ' - Movie'
    
        const image = BASE_URL_IMAGE.original.concat(data.backdrop_path)
        appImage.setAttribute('src', image)

        changeButtonMenu()
    })
}

function createButtonMovie(movieId) {
    const button = document.createElement('button')
    button.setAttribute('onclick', `setMainMovie('${movieId}')`)
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

function createMovie(movieId) {
    fetch(getUrlMovie(movieId)).then( response => response.json()).then( data => {
        const movie = document.createElement('li')
        movie.classList.add('movie')
        
        const genre = `<span>${data.genres[0].name}</span>`
        const title = `<strong>${data.title}</strong>`
        const image = BASE_URL_IMAGE.small.concat(data.backdrop_path)

        movie.innerHTML = genre + title
        movie.appendChild(createButtonMovie(movieId))
        movie.appendChild(createImageMovie(image, data.title))

        moviesList.appendChild(movie)
    })
}

function loadListMovies() {
    LIST_MOVIES.map(createMovie)
}

loadListMovies()

setMainMovie(LIST_MOVIES[0])

function loadMovies() {
    const LIST_MOVIES = ['tt12801262', 'tt4823776' ,'tt2096673', 'tt5109280', 'tt7146812', 'tt2948372', 'tt2953050', 'tt3521164']
    LIST_MOVIES.map(movie => {
        fetch(getUrlMovie(movie)).then( response => response.json()).then( data => {
            
            const movieData = {
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
        })
    })
}