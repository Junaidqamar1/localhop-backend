const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");


// const User=require("./model/user.model")

// const authRoutes = require("./routes/auth");

dotenv.config();
const app = express();



// backend/index.js or app.js


app.use(cors({
  // 'http://localhost:5173'
  origin: 'https://localhop.netlify.app/', // ✅ your frontend origin
  credentials: true               // ✅ allow cookies to be sent
}));



// app.options('*', cors()); // Ensure preflight requests are handled

app.use(express.json());
app.use(cookieParser());

// app.use("/api/auth", authRoutes);
app.get("/",(req, res) =>{
    res.send({name:"junaid"})
})

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected ✅");
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT} 🚀`)
    );
  })
  .catch((err) => console.log("MongoDB connection error:", err));

// app.post('/user',async(req,res)=>{
//     try {
//         const newuser= User.create(req.body)
//         console.log("new user cteted")
//         res.send(newuser)
//     } catch (error) {
//         res.send(error.message)
//     }
// })
const authRoutes = require("./routes/authRoutes");
app.use("/auth", authRoutes);

const orderRoutes = require("./routes/order");
app.use("/api/orders", orderRoutes);

