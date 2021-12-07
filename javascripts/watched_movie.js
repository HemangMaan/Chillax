const API_KEY = 'api_key=7f5719644de5f05dfc066ec0484d202c';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';


const main = document.getElementById('watched');

var findQuery = [
    [
        {"prop":"watchlist", "op":"=", "val":true}
    ],
    [
        {"prop":"watched", "op":"=", "val":true}
    ]
];

find(findQuery[1]);

function getMovies(url) {
  lastUrl = url;
    fetch(url).then(res => res.json()).then(data => {
        console.log(data)
        showMovies(data);
    })

}

function showMovies(data) {
        const {title, poster_path, vote_average, overview, id} = data;
        // printLog(title + " " + poster_path + " " + vote_average + " " + overview );
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
             <img src="${poster_path? IMG_URL+poster_path: "http://via.placeholder.com/1080x1580" }" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getColor(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
                <br/> 
                <button class="know-more" id="${id}">Remove from Watched</button>
            </div>
        
        `
        main.appendChild(movieEl);

        document.getElementById(id).addEventListener('click', () => {
          console.log(id);
          del(id);
          main.innerHTML = '';
          find(findQuery[1]);
        })
}

function getColor(vote) {
    if(vote>= 8){
        return 'green'
    }else if(vote >= 5){
        return "orange"
    }else{
        return 'red'
    }
}