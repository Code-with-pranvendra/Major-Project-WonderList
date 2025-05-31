const mongoose=require("mongoose");
const initData=require("./data.js");
const listing=require("../models/listing.js");
const mongo_url="mongodb://127.0.0.1:27017/wanderlust";
main().then(()=>{
    console.log("connected to db");
}).catch(err=>{
    console.log(err);
});


async function main(){
 await mongoose.connect(mongo_url);
}

const initdb=async ()=>{
    await listing.updateMany({})
    await listing.deleteMany({})
    initData.data = initData.data.map ((obj)=>({...obj,owner:"67f9da1aceb536f5abdfa867"}))
    await listing.insertMany(initData.data);
    console.log("data was initialized");
}
initdb();