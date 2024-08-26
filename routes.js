const express=require('express');
const router = express.Router();
const moviecon=require('./controller');

router.get('/movies',moviecon.getAllMovies);
router.get('/movies/:id',moviecon.getMovieById);
router.post('/movies',moviecon.createMovie);
router.put('/movies/:id',moviecon.updateMovie );
router.delete('/movies/:id',moviecon.deleteMovie);
router.post('/movies/fav',moviecon.addtofav);
router.get('/fav/:id', moviecon.getfav);
router.delete('/fav/:id', moviecon.deleteMoviefav);
router.post('/user',moviecon.createnewuser);
router.get('/user',moviecon.getusers);
router.put('/user/:id',moviecon.updateusers);
router.delete('/user/:id',moviecon.deleteuser);
router.post('/login', moviecon.loginUser);
router.get('/find/:email',moviecon.findusers);
router.post('/req',moviecon.createreqs);
router.put('/req',moviecon.createreqs);
router.get('/req',moviecon.getAllreq);
router.get('/req/:userid', moviecon.getApprovedMoviesForUser);

module.exports=router;