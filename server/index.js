const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');


const app = express();

// Make "favorites" variable and assign an empty array
const favorites = [];

// a collection of comment objects that has two properties
//   - "movieId": id of the movie you want to add it to, and
//   - "text": the actual body of the comment
const comments = [];


app.use(cors());
app.use(bodyParser.json());

app.get('/api/favorites', (req,response) => {
    response.send(favorites)
})

app.get('/api/movies/comments', (req,response) => {
    response.send(comments)
})




// Create POST to /api/favorites
// Make it add the provided ID from the req.body to the `favorites` array
// It should send the response being the whole "favorites" array
app.post( '/api/favorites', (req,res) => {
    const favoritemovie = req.body;
    
    const favoriteIndex = favorites.findIndex((favorite) => favorite.id == favoritemovie.id);

    if (favoriteIndex == -1) {
        favorites.push(favoritemovie);
    }

    res.send(favorites);
});


// Create DELETE to /api/favorites/:id
app.delete('/api/favorites/:id', (req,res) => {
    const { id } = req.params;

    const favoritesIndex = favorites.findIndex((favorite) => favorite.id == id);

    if(favoritesIndex === -1){
        return res.status(404).send({ message: 'Could not find favorite with id of ' + id });
    }

    favorites.splice(favoritesIndex, 1);

    res.send(favorites);
})



//create a PUT to /api/favorites/:id
app.put('/api/movies/:id/comments', (req,res) => {
    const movieId = +req.params.id;
    const { text } = req.body;

    const movieIndex = comments.findIndex((comment) => movieId === comment.movieId);

    let comment;

    if (movieIndex === -1){
        comment = {
            movieId,
            text,
        };

        comments.push(comment);
    }
    else {
        comment = comments[movieIndex];
        comment.text = text;
    }

    res.send(comment);
})



// http://localhost:3002
app.listen(3002,  () =>{
    console.log("app is up and running");
});