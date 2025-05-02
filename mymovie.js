async function fetchMovies(){
    const url = "https://api.themoviedb.org/3/movie/popular?api_key=c933460f20c1289576e32c382d67160b&language=ko-KR";


    try{
        const response = await fetch(url);
        const data = await response.json();
        const movies = data.results;
        const sortedMovies = [...movies].sort((a, b) => b.popularity - a.popularity);
        
        renderTop3(sortedMovies.slice(0, 3));
        renderAllMovies(sortedMovies.slice(3));

        

    }
    catch(error){
        console.error(`에러발생: ${error}`);
    }
};

function renderTop3 (top3Movies){
    for(let i =0;i<3;i++){
        const target = document.getElementById(`rank${i+1}`)
        const movie = top3Movies[i];
        target.addEventListener("click", () => {
            showMovieDetail(movie); 
        });

        target.querySelector("img").src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        target.querySelector("img").alt = movie.title;
        target.querySelector(".movie-title").textContent = `${i+1}위: ${movie.title}`;
        target.querySelector(".rating").textContent= `⭐${movie.vote_average}`;
    }
};

function renderAllMovies(rest){
    const container= document.querySelector(".movie-list");
    const template = document.querySelector("#movie-template");

    rest.forEach(movie => {
        const card = template.cloneNode(true);
        card.style.display = "block";
        card.addEventListener("click", () => {
            showMovieDetail(movie); 
        });
        
        card.querySelector("img").src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        card.querySelector("img").alt = movie.title;
        card.querySelector(".movie-title").textContent = movie.title;
        card.querySelector(".rating").textContent = `⭐${movie.vote_average}`;
    
        container.appendChild(card);
    });

};

fetchMovies();


function showMovieDetail(movie) {
    document.getElementById("detail-img").src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    document.getElementById("detail-title").textContent = movie.title;
    document.getElementById("detail-release").textContent = `개봉일: ${movie.release_date}`;
    document.getElementById("detail-rating").textContent = `⭐${movie.vote_average}`;
    document.getElementById("detail-overview").textContent = movie.overview;
    document.getElementById("movie-detail-modal").style.display = "flex";
};


document.querySelector(".close").addEventListener("click", function() {
    document.getElementById("movie-detail-modal").style.display = "none";
});





function searchMovie(keyword) {
    const topWrapper = document.getElementById("top-movies");
    const topCards  = document.querySelectorAll("#top-movies .movie-card");
    const restCards = document.querySelectorAll(".movie-list .movie-card");
    let topMatch = false, restMatch = false;

    topCards.forEach(card => {
        const title = card.querySelector(".movie-title").textContent;
        if (title.includes(keyword)) {
            card.style.display = "flex";
            topMatch = true;
        } else {
            card.style.display = "none";
        }
    });

    restCards.forEach(card => {
        const title = card.querySelector(".movie-title").textContent;
        if (title.includes(keyword)) {
            card.style.display = "flex";
            restMatch = true;
        } else {
            card.style.display = "none";
        }
    });


    if (!keyword.trim()) {
        topWrapper.style.display = "block";
    } else {
        topWrapper.style.display = topMatch ? "block" : "none";
    }


    if (keyword.trim() && !topMatch && !restMatch) {
        alert("검색 결과가 없습니다 😢");
    }
}

const input = document.querySelector(".searchbar input");
const button = document.querySelector(".searchbar button");

button.addEventListener("click", () => {
    searchMovie(input.value.trim());
});

input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        searchMovie(input.value.trim());
    }
});

document.querySelector("h1").addEventListener("click", () => {
    location.reload();
});
