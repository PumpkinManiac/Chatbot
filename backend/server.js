import app from "./app.js";
import connectDB from "./Config/db.js";

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
app.listen(PORT ,()=>{
    console.log(`Server is running at port ${PORT}`)
})
}).catch((err) => {
    console.error("Database connection failed:", err);
});;
