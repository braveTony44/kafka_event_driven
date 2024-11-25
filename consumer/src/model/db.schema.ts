import mongoose from "mongoose";

interface Post{
    title:string
    content:string
}

const postSchema =new mongoose.Schema<Post>({
 title:{
    type:"string",
    required:true
 },
 content:{
    type:"string",
    required:true
 }
})

const postModel = mongoose.models.Post || mongoose.model("Post",postSchema)
export default postModel;