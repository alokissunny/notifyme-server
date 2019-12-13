const topic = require('../model/topics');
const Mongoose = require("mongoose");
const config = require('../config');
const cat = require('../utils/categories');
Mongoose.connect(config.database,{
    useNewUrlParser: true
  });
var Schema = Mongoose.Schema;
var topicSchema = new Schema(topic.topic)
const TopicModel = Mongoose.model("topic", topicSchema);
exports.addTopic =  async function (request,response) {
    try {
        var topic = new TopicModel(request.body);
        var result = await topic.save();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
}
exports.deleteTopic = async function (request, response) {
    try {
        var result = await TopicModel.deleteOne({ _id: request.params.id }).exec();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
};
exports.getAllTopics = async function (request , response) {

    try {
        var categoryId = request.params.id || 1;
       var offset = parseInt(request.query.offset);
       var count = parseInt(request.query.count);
       console.log(offset);
       console.log(count);
        var result = await TopicModel.find({"categoryId" : categoryId})
        .skip(offset)
        .limit(count)
        .exec();
        console.log(result)
        response.send(result)
    } catch (error) {
        response.status(500).send(error);
    }
}
exports.getTopic = async function ( request , response) {
    try {
        
    } catch (error) {
        response.status(500).send(error);
    }
}

exports.getAllCatergories = async function (request , response) {
    try {
        response.send(cat.categories)
    } catch (error) {
        response.status(500).send(error)
    }

}