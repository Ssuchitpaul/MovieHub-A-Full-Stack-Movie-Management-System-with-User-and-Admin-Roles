const Movie = require('./models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.getAllMovies = (req, res) => {
    
    Movie.getAll((err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(result);
    });
};

exports.getMovieById = (req, res) => {
    const { id } = req.params;
    Movie.getById(id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        res.status(200).json(result[0]);
    });
};

exports.createMovie = (req, res) => {
    const movie = req.body; 
    Movie.create(movie, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Movie added successfully.' });
    });
};

exports.updateMovie = (req, res) => {
    const { id } = req.params;
    const movie = req.body;
    Movie.update(id, movie, (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: 'Movie updated successfully.' });
    });
};

exports.deleteMovie = (req, res) => {
    const { id } = req.params;
    Movie.delete(id, (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: 'Movie deleted successfully.' });
    });
};

exports.addtofav=(req,res)=>{
    let c=req.body;
    Movie.fav(c,(err,result)=>
    {
        if(err){

            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Movie added successfully to fav.' });
    });
};

exports.getfav = (req, res) => {
    let {id}=req.params;
    Movie.getf(id,(err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(result);
    });
};

exports.deleteMoviefav = (req, res) => {
    const { id } = req.params;
    Movie.deletefav(id, (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: 'Movie deleted successfully.' });
    });
};

exports.createnewuser = (req, res) => {
    const movie = req.body; 
    Movie.createuser(movie, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'user added successfully.' });
    });
};

exports.getusers = (req, res) => {
    
    Movie.getusers((err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(result);
    });
};

exports.updateusers = (req, res) => {
    const { id } = req.params;
    const movie = req.body;
    Movie.updateuser(id, movie, (err,result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: 'Movie updated successfully.' });
    });
};

exports.deleteuser = (req, res) => {
    const { id } = req.params;
    Movie.deleteusers(id, (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: 'Movie deleted successfully.' });
    });
};

const JWT_SECRET = '@12345';

exports.loginUser = (req, res) => {
    const { email, password } = req.body;

    // Log incoming login request data
    console.log(`Login attempt: email=${email}, password=${password}`);

    Movie.findUserByEmail(email, (error, results) => {
        if (error) {
            console.error('Database error:', error);
            return res.status(500).json({ error: 'Database error' });
        }

        if (results.length === 0) {
            console.log('No user found with the given email');
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const user = results[0];

        // Log fetched user data
        console.log(`User found: id=${user.id}, email=${email}, password=${user.password}, role=${user.role}`);

        if (password !== user.password) {
            console.log('Password mismatch');
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

        res.json({ token, role: user.role });
    });
};


exports.findusers = (req, res) => {
    let {email}=req.params;
    Movie.findUser(email,(err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(result);
    });
};

exports.createreqs = (req, res) => {
    const movie = req.body; 
    Movie.createreq(movie, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Movie added successfully.' });
    });
};

exports.updateuserreq = (req, res) => {
    const { userid, movieid } = req.body;

    Movie.updateUserRequest(userid,movieid, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Movie request not found.' });
        }
        res.status(200).json({ message: 'Movie updated successfully.' });
    });
};

exports.getAllreq = (req, res) => {
    
    Movie.getAllreqs((err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(result);
    });
};

// Controller function
exports.getApprovedMoviesForUser = (req, res) => {
    const {userid} = req.params;

    Movie.getApprovedMoviesForUser(userid, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.status(200).json(results);
    });
};
