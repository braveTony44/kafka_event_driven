import mongoose from "mongoose";

const connect = async ()=>{
    try {
        await mongoose.connect("mongodb+srv://vabby:rbnHdBlBRe9RS03p@cluster0.okwqj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    console.log("db connection established")
    } catch (error:any) {
        console.log("db connection error", error.message);
    }
}

export default connect;