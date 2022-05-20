const movieCardTemplate = document.querySelector("[data-movie-template]")
const movieCardContainer = document.querySelector("[data-movie-cards-container]")
const searchInput = document.querySelector("[data-search]")

let movies = []

searchInput.addEventListener("input", e => {
    const value = e.target.value.lowerCase()
    movies.forEach(movie => {
        const isVisible = movie.name.toLowerCase().includes(value) || movie.genre.toLowerCase().includes(value)
        movie.element.classList.toggle("hide", !isVisible)
    })
})

fetch("http://127.0.0.1:3000/movie")
    .then(res => res.json())
    .then(data => {
    movie = data.map(movie => {
        const card = movieCardTemplate.content.cloneNode(true).children[0]
        const header = card.querySelector("[data-header]")
        const body = card.querySelector("[data-body]")
        header.textContent = movie.name
        body.textContent = movie.genre
        movieCardContainer.append(card)
        return {name: movie.name, genre: movie.genre, element: card}
    })
})