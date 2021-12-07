// Import API and Base URL 


const api_url = 'https://api.themoviedb.org/3/search/movie/?'
const image_url = 'https://image.tmdb.org/t/p/w500'

let results = document.getElementById("results")
let poster = document.getElementById("result-header")
let form = document.querySelector('#search-form')

// API and URL variables 
// const base_url = config.api_url;
// const api_key = config.api_key;


let movieList = '' 



form.addEventListener('submit', function (event) {
    event.preventDefault()
    let userSearch = document.querySelector('#search').value;
    let resultHeader =document.querySelector("#result-header")
    //format the string from user to use in URL
    let searchQuerry = userSearch.replace(/\s+/g, ' ').toLowerCase();

    axios.get(api_url + api_key + `&query=${searchQuerry}`)
        .then((response) => {
          
            if (response.data.results.length > 0) {
                //search querry and title are a match
               
                resultHeader.textContent = `Top Results for: '${searchQuerry}'`;
               
                renderMovies(response.data.results)
            } else {
                // no title matches that matches 
                resultHeader.textContent = `No Results for :'${searchQuerry}'`;
                results.innerHTML = '';
            }
        })
        .catch((error) => {
            console.log(error)
        })
});

function renderMovies(movies){
    movieList = '';

    //loops through up to 4 items
    for(let i = 0; i < 4 && movies[i] != undefined; i++){
        const movie = movies[i];
        console.log(movie[i])

        //variables for data
        const title = movie.title;
        const releaseDate = new Date(movie.release_date)
        const releaseYear =  releaseDate.getFullYear();
        const poster = movie.poster_path;

        //create URL for poster image or use placeholder
        let posterURL = '';
        if(poster){
            posterURL = `${image_url}${poster}`;
        } else {
            posterURL = "https://critics.io/img/movies/poster-placeholder.png";
        }

        //movie component
        movieList += `
            <li class="movie">
                <img src=${posterURL} alt="Movie poster" />
                <div class="movie-details">
                    <p>${releaseYear}</p>
                    <h3>${title}</h3>
                </div>
            </li>
        `;
    }

    //inject components into DOM
    results.innerHTML = movieList;
    //reset form
    form.search.value = '';
}

