export default {
    getStudios(state, studios) {
        state.studios = studios;
    },
    getMovieByIsScreen(state, movies) {
        state.movies = movies;
    },
    getScreenCount(state, count) {
        state.screenCount = count;
    },
    getUnScreenCount(state, count) {
        state.unScreenCount = count;
    },
    getMovieId(state, movie) {
        state.movie = movie;
    },
    getUser(state, user) {
        state.user = user;
    },
    // getTickets(state, tickets) {
    //     state.tickets = tickets;
    // }
    returnUser(state, user) {
        state.user = user;
    }

}