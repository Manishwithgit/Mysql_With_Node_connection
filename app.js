const express=require('express')

const mysql=require('mysql')

// create connection...............
const db=mysql.createConnection({
    host :'localhost',
    user :'root',
    password :'',
    database:'nodemysql'
})

// connect
db.connect((err)=>{
    if(err){
        throw err;
    }
    console.log('mysql connected...')
});

const app=express();


// create DB

app.get('/createdb',(req,res)=>{
    let sql='CREATE DATABASE nodemysql';
    db.query(sql,(err,result)=>{
        if(err) throw err;
        res.send('Database created...');
    })
})


// create table.......

app.get('/createpoststable', (req,res)=>{
    let sql='CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255),PRIMARY KEY (id))';

    db.query(sql,(err, result)=>{
        if(err) throw err;
        console.log(result);
        res.send('Posts table created...')
    })

});

// Insert post 1
app.get('/addpost1',(req,res)=>{
    let post={title:'Post One', body:'This is post number one'};
    let sql='INSERT INTO posts SET ?';
    let query=db.query(sql,post,(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send('Insert Post 1 added...')

    })
});

// Insert post 2

app.get('/addpost2',(req,res)=>{
    let post={title:'Post Two', body:'This is post number two'};
    let sql='INSERT INTO posts SET ?';
    let query=db.query(sql,post,(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send('Insert Post 2 added...')

    })
});


//select posts............

app.get('/getposts',(req,res)=>{
   let sql ='SELECT * FROM posts';
    let query=db.query(sql,(err,results)=>{
        if(err) throw err;
        console.log(results);
        res.send('Fetch Post...')

    })
});


// select single post....

app.get('/getpost/:id',(req,res)=>{
    let sql =`SELECT * FROM posts WHERE id = ${req.params.id}`;
     let query=db.query(sql,(err,result)=>{
         if(err) throw err;
         console.log(result);
         res.send('Fetch Post By id...')
 
     }); 
});


//update post..............

app.get('/updatepost/:id',(req,res)=>{
    let newTitle='update title';
    let sql =`UPDATE posts SET title = '${newTitle}' WHERE id = ${req.params.id}`;
     let query=db.query(sql,(err,result)=>{
         if(err) throw err;
         console.log(result);
         res.send('Update post by id...')
 
     }); 
});



// delete post..............

app.get('/deletepost/:id',(req,res)=>{
    // let newTitle='update title';
    let sql =`DELETE FROM posts WHERE id = ${req.params.id}`;
     let query=db.query(sql,(err,result)=>{
         if(err) throw err;
         console.log(result);
         res.send('post delete by id...')
 
     }); 
});



app.listen('5000',()=>{
    console.log('server started on port 5000')
})






// npm i -g nodemon