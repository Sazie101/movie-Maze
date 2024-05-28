'use strict';

import { onEvent, select, selectById, selectAll, print } from "./utility.js";

import movies from "./movies.js";

const poster = select('.moviePoster');
const searchBtn = select('.searchBtn');
const title = select('.movieTitle');
const searchBar = select('#searchBar');
const suggestionsBox = select('#autocompleteSuggestions');
const dateAndTimeElement = select('.movieDateAndTime');
const plotElement = select('.moviePlot');
const genreElement = select('.movieGenre');

onEvent('load', window, () => {
    searchBar.value = '';
});

onEvent('input', searchBar, () => {
    const input = searchBar.value.toLowerCase();
    const filteredMovies = movies.filter(movie => movie.title.toLowerCase().includes(input));
    suggestionsBox.innerHTML = '';
    if (input) {
        if (filteredMovies.length > 0) {
            filteredMovies.forEach(movie => {
                const suggestion = document.createElement('div');
                suggestion.className = 'autocomplete-suggestion';
                suggestion.innerText = movie.title;
                suggestion.onclick = () => {
                    searchBar.value = movie.title;
                    suggestionsBox.innerHTML = '';
                };
                suggestionsBox.appendChild(suggestion);
            });
        } else {
            const noMoviesFound = document.createElement('div');
            noMoviesFound.className = 'autocomplete-suggestion';
            noMoviesFound.innerText = 'No movies found';
            suggestionsBox.appendChild(noMoviesFound);
        }
    }
    suggestionsBox.style.width = `${searchBar.offsetWidth}px`;
});

onEvent('click', searchBtn, () => {
    const query = searchBar.value.toLowerCase();
    const movie = movies.find(movie => movie.title.toLowerCase() === query);
    if (movie) {
        displayMovieInfo(movie);
    } else {
        searchBar.placeholder = 'Movie not found';
    }
});

function displayMovieInfo(movie) {
    title.innerText = movie.title;
    poster.src = movie.poster;
    dateAndTimeElement.innerText = `${movie.year} | ${movie.runningTime}`;
    plotElement.innerText = movie.description;
    genreElement.innerText = `Genre: ${movie.genre.join(', ')}`;
}