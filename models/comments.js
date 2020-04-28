const mongoose = require("mongoose")
const { Schema, model } = mongoose

 commentsSchema = new Schema ({

  message:String,
  date:String,
  time:String,
  status:Boolean,
  autor:String,
  owner:String,
  para:String,

},
{
timestamps: true
}

)


module.exports = model('Comments', commentsSchema);
