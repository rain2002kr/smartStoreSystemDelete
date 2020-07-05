var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const userSchema = new Schema({
    email:{
        type:String,
        required:true,
    },
    name :{
        type:String
    },
    age:{
        type:Number,
        min:18,
        max:50
    }
},
    {
        timestamps:true
    }
)

module.exports = mongoose.model('User', userSchema);  //콜렉션에 모델을 연결한다. 
