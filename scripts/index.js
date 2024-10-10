fetch('https://api.themoviedb.org/3/movie/tt12801262?language=pt-br&api_key=a2c2c30ca5fea3351982ff0d4436a2c6')
.then( response => response.json())
.then( data => {
    console.log(data)
    const app = document.getElementById('app')

    const title = document.querySelector('.movie h1')
    const description = document.querySelector('.movie p')
    const info = document.querySelector('.movie span')
    const rating = document.querySelector('.rating strong')

    const yearRelease = data.release_date.split('-')[0]

    title.innerHTML = data.title
    description.innerHTML = data.overview
    rating.innerHTML = data.vote_average
    info.innerHTML = yearRelease + ' - ' + data.genres[0].name + ' - Movie'

    const image = `https://image.tmdb.org/t/p/original${data.backdrop_path}`
    app.style.backgroundImage = `linear-gradient(90.18deg, rgba(13, 22, 46, 0.7) 23.21%, rgba(13, 22, 46, 0.0001) 96.69%), url('${image}')`
})
