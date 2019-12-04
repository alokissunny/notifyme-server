const topic = require('../model/topics');
const Mongoose = require("mongoose");
var url = "mongodb+srv://Notifyme:Codejam@12@cluster0-yb1jm.mongodb.net/test?retryWrites=true&w=majority";
Mongoose.connect(url,{
    useNewUrlParser: true
  });

const TopicModel = Mongoose.model("topic", {
    name :String,
    creationDate : Date ,
    expirationDate : Date,
    subscribers : []
});
exports.addTopic =  async function (request,response) {
    try {
        request.body.creationDate = new Date().getTime();
        var topic = new TopicModel(request.body);
        var result = await topic.save();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }


}