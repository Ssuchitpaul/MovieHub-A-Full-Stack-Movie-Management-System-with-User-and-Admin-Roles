const { query } = require('express');
const db=require('./config.js');

let movie={};

movie.getf=(id,callback)=>
    {
    
        db.query('SELECT DISTINCT * FROM fav where userid=?',[id],callback);
    
    };

//movie
movie.getAll=(callback)=>
{

    db.query('SELECT * FROM movies',callback);

};

movie.getById=(id,callback)=>
{
    db.query('SELECT * FROM movies WHERE id=?',[id],callback);
};

movie.create = (newmov, callback) => {

    const { id, title, director, genre, release_year, duration_minutes, rating, poster_image, box_office_total } = newmov;

    const query = 'INSERT INTO movies (id, title, director, genre, release_year, duration_minutes, rating, poster_image, box_office_total) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';

    const values = [id, title, director, genre, release_year, duration_minutes, rating, poster_image, box_office_total];

    db.query(query, values, callback);
};

movie.update = (id, updatedFields, callback) => {
    const { title, director, genre, release_year, duration_minutes, rating, poster_image, box_office_total } = updatedFields;

    const query = `
        UPDATE movies 
        SET title = ?, director = ?, genre = ?, release_year = ?, duration_minutes = ?, rating = ?, poster_image = ?, box_office_total = ? 
        WHERE id = ?
    `;

    const values = [title, director, genre, release_year, duration_minutes, rating, poster_image, box_office_total, id];

    db.query(query, values, callback);
};


movie.delete=(id,callback)=>
{
    db.query('DELETE FROM movies WHERE id = ?', [id], callback);
}

//fav

movie.fav=(c,callback)=>
{
    let { userid,movieid,movie} = c;
    let query = 'INSERT INTO fav (userid,movieid,movie) VALUES (?, ?,?)';
    let values=[userid,movieid,movie];
    db.query(query,values,callback);
}

movie.deletefav = (id, callback) => {
    db.query('DELETE FROM fav WHERE id = ?', [id], callback);
};

//user
movie.createuser = (newmov, callback) => {

    const { username, email, password, role } = newmov;

    const query = 'INSERT INTO users ( username, email, password, role) VALUES (?, ?, ?, ?)';

    const values = [username, email, password, role];

    db.query(query, values, callback);
};

movie.getusers=(callback)=>
    {
    
        db.query('SELECT * FROM users',callback);
    
    };

 movie.createuser = (newmov, callback) => {

        const { username, email, password, role } = newmov;
    
        const query = 'INSERT INTO users ( username, email, password, role) VALUES (?, ?, ?, ?)';
    
        const values = [username, email, password, role];
    
        db.query(query, values, callback);
};

movie.updateuser = (id, updatedFields, callback) => {
    const { username, email, password, role } = updatedFields;

    const query = 'UPDATE users SET username = ?, email = ?, password = ?, role = ? WHERE id = ?';


    const values = [username, email, password, role, id];

    db.query(query, values, callback);
};

movie.deleteusers = (id, callback) => {
    db.query('DELETE FROM users WHERE id = ?', [id], callback);
};

movie.findUserByEmail = (email, callback) => {
    db.query('SELECT id, password, role FROM users WHERE email = ?',[email],callback);
    
};

movie.findUser = (email, callback) => {
    db.query('SELECT id,username from users WHERE email = ?',[email],callback);
};

movie.createreq = (newmov, callback) => {

    const { userid,movieid,movie,status } = newmov;

    const query = 'INSERT INTO req( userid,movieid,movie,status) VALUES (?, ?, ?, ?)';

    const values = [userid,movieid,movie,status];

    db.query(query, values, callback);
};

movie.updateUserRequest = (updatedFields, callback) => {
    const { userid, movieid } = updatedFields;
    const status = 'approved';  // Set the status to 'approved'
    const query = 'UPDATE req SET status = ? WHERE userid = ? AND movieid = ?';
    const values = [status, userid, movieid];
    
    db.query(query, values, callback);
};

movie.getAllreqs=(callback)=>
    {
    
        db.query('SELECT * FROM req',callback);
    
    };

    movie.getApprovedMoviesForUser = (userid, callback) => {
        const query = 'SELECT * FROM req WHERE userid = ? AND status = ?';
        const values = [userid, 'approved'];
    
        db.query(query, values, callback);
    };
module.exports=movie;

