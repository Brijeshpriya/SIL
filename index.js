const express=require("express");
const app=express();




const port=8080;
const path=require("path");
//to use uuid package
const {v4:uuidv4}=require('uuid');
//midilewear
app.use(express.urlencoded({extended:true}));

// for viwes folder
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
//for public  folder
app.use(express.static(path.join(__dirname,"public")));

app.listen(port,()=>{
    console.log(`port is listening ${port}`);
});

app.get("/", (req,res)=>{
    res.send("server is working well!");
});

let posts=[
    {
        id:uuidv4(),
        username:"priyanka",
        content:"I love codeing",
    },
    {
        id:uuidv4(),
        username:"navnit",
        content:"Hardwork is a key of success",
    },
    
];
//implement GET/posts
app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});

//implement POST/posts it is use 2 step routes
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});

app.post("/posts",(req,res)=>{
    let {username,content}=req.body;
    let id=uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts");
    // res.send("post is working!");//redirect ke baad
    //  koi bhi response send nhi kar skte hai
});



//implement GET/posts/:id
//show the indivisual details in the help of id. 

app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
    res.render("show.ejs",{post});
});

//implement PATCH/posts/:id
const methodOverride=require('method-override');
app.use(methodOverride('_method'));



app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let newcontent=req.body.content;
    let post=posts.find((p)=>id===p.id);
    post.content=newcontent;
    console.log(post);
    
    res.redirect("/posts");
});


app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
    res.render("edit.ejs",{post});

});

// delete the post


app.delete("/posts/id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
     posts=posts.filter((p)=>id!==p.id);
     console.log("delete working");
    //  res.redirect("/posts");

});