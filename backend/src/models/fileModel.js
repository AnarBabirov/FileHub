import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({

originalname:{
    type:String,
    required:true,
    trim:true

},
filename:{
    type:String,
    required:true
},
path:{
    type:String,
    required:true
},
mimetype:{
    type:String,
    required:true
},
size:{
    type:Number,
    required:true
},
user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
}
},{
    
    timestamps: true, 
    collection: "files"
}
);

const File=mongoose.model("File",fileSchema);
export default File;
