const API_KEY = 'api_key=7f5719644de5f05dfc066ec0484d202c';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
var appId = "com.chillaxwebos.app";
var kindId = appId + ":1";

const main = document.getElementById('watchlist');

var findQuery = [
    [
        {"prop":"watchlist", "op":"=", "val":true}
    ],
    [
        {"prop":"watched", "op":"=", "val":true}
    ]
];

// getMovies('https://api.themoviedb.org/3/movie/580489?api_key=7f5719644de5f05dfc066ec0484d202c&language=en-US');
find(findQuery[0]);

function find(query) {
    webOS.service.request("luna://com.webos.service.db", {
        method: "find",
        parameters: { 
            "query": {
                "from": kindId,
                "where": query,
            }
        },
        onSuccess: function (res) {
            var result = res.results;
            for (var i in result) {
                getMovies('https://api.themoviedb.org/3/movie/'+ result[i].number +'?api_key=7f5719644de5f05dfc066ec0484d202c&language=en-US');
            }
            console.log("[find] onSuccess:", result);
        },
        onFailure: function (res) {
            return;
        }
    });
}


function getMovies(url) {
  lastUrl = url;
    fetch(url).then(res => res.json()).then(data => {
        console.log(data)
        showMovies(data);
    })

}

function showMovies(data) {
        const {title, poster_path, vote_average, overview, id} = data;
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
                <button class="know-more" >Watchlist</button>
                <button class="know-more" >Watched</button>
                <button class="know-more" id="${id}">Know More</button>
            </div>
        
        `
        main.appendChild(movieEl);

        document.getElementById(id).addEventListener('click', () => {
          console.log(id)
          openNav(movie)
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

document.addEventListener("keydown", function(inEvent){
    if (inEvent.keyCode == 40) { 
      window.scrollBy({ 
        top: 500, // negative value acceptable
        left: 0, 
        behavior: 'smooth' 
      });
    }
    if (inEvent.keyCode == 38) { 
      window.scrollBy({ 
        top: -300, // negative value acceptable
        left: 0, 
        behavior: 'smooth' 
      });
    }
  });