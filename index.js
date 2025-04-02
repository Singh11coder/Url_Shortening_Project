const express=require("express");
const path=require("path");
const cookieParser=require("cookie-parser");
const URL=require("./models/url");
const {connectToMongoDB}=require("./connection"); 
const app=express();
const PORT=8001;
const {restrictToLoginUserOnly,checkAuth}=require("./middlewares/auth");

const urlRoute=require("./routes/url");
const staticroute=require("./routes/static_router");
const userRoute=require("./routes/user");



app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

connectToMongoDB("mongodb://127.0.0.1:27017/short2-url")
.then(()=>console.log("MongoDB Connected"));

app.set("view engine","ejs");
app.set("views",path.resolve("./views"))

app.use("/url",restrictToLoginUserOnly,urlRoute);
app.use("/",checkAuth,staticroute);
app.use("/user",userRoute);
app.get("/url/:shortid",async(req,res)=>{
  try {
    const shortid = req.params.shortid;
    const entry = await URL.findOneAndUpdate(
        { shortid },
        { 
            $push: { 
                visitHistory: { timestamp: Date.now() } 
            } 
        },
        { new: true } // Ensures updated document is returned
    );

    if (!entry || !entry.redirectURL) {
      return res.status(404).send("Short URL not found or invalid.");
    }
    res.redirect(entry.redirectURL);
} catch (error) {
    console.error("Error retrieving URL:", error);
    res.status(500).send("Internal Server Error");
}
});

app.listen(PORT,()=> console.log(`Server Started at Port: ${PORT}`));