import mongoose from "mongoose";

export const connection = async ()=>{
    let response = await mongoose.connect('mongodb+srv://akhiakhitha3:akhiakhitha3@cluster0.b8fdo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(()=>console.log('connected')).catch((data)=>{console.log('not connect')})
}