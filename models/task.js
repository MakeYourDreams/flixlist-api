const mongoose = require("mongoose")
const { Schema, model } = mongoose

 taskSchema = new Schema ({

  subjet:String,
  message:String,
  date:String,
  time:String,
  phone:Number,
  status:Boolean,
  owner:String,

},
{
timestamps: true
}

)


module.exports = model('Task', taskSchema);
