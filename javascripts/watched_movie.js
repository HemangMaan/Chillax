const API_KEY = 'api_key=7f5719644de5f05dfc066ec0484d202c';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
var appId = "com.chillaxwebos.app";
var kindId = appId + ":1";

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
            printLog("[find] onSuccess: found " + result.length + " object(s).");
            printLog("number / watched / watchlist / _id / _rev");
            for (var i in result) {
                printLog(result[i].number + " / " + result[i].watched + " / " + result[i].watchlist + " / " + result[i]._id + " / " + result[i]._rev);
                getMovies('https://api.themoviedb.org/3/movie/'+ result[i].number +'?api_key=7f5719644de5f05dfc066ec0484d202c&language=en-US');
            }
            console.log("[find] onSuccess:", result);
        },
        onFailure: function (res) {
            printLog("[find] onFailure");
            printLog("(" + res.errorCode + ") " + res.errorText);
            return;
        }
    });
}


function getMovies(url) {
  lastUrl = url;
    fetch(url).then(res => res.json()).then(data => {
        console.log(data)
        showMovies(data);
        // if(data.length !== 0){
        //     currentPage = 1;
        //     nextPage = currentPage + 1;
        //     prevPage = currentPage - 1;
        //     totalPages = data.total_pages;

        //     current.innerText = currentPage;

        //     if(currentPage <= 1){
        //       prev.classList.add('disabled');
        //       next.classList.remove('disabled')
        //     }else if(currentPage>= totalPages){
        //       prev.classList.remove('disabled');
        //       next.classList.add('disabled')
        //     }else{
        //       prev.classList.remove('disabled');
        //       next.classList.remove('disabled')
        //     }
        //     // tagsEl.scrollIntoView({behavior : 'smooth'})

        // }else{
        //     main.innerHTML= `<h1 class="no-results">No Results Found</h1>`
        // }
    })

}

function showMovies(data) {
        const {title, poster_path, vote_average, overview, id} = data;
        printLog(title + " " + poster_path + " " + vote_average + " " + overview );
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
    // var message = "<h1>" + "Keycode is" + inEvent.keyCode + "</h1>"+ "</br>";
    // document.getElementById("results").innerHTML = message;
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