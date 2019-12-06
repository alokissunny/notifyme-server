const subs = require('../model/subscription')
const Mongoose = require("mongoose");
const config = require('../config');
Mongoose.connect(config.database,{
    useNewUrlParser: true
  });
  var Schema = Mongoose.Schema;
  var subsSchema = new Schema(subs.subscription)
  const subscriptionModel = Mongoose.model("subscription", subsSchema);


exports.subscribe = async function(req, res ) {
    try {
        var subscription = subscriptionModel(req.body);
        var result = await subscription.save();
        res.send(result);
    } catch (error) {
        res.status(500).send(error)
    }
   
}
exports.unsubscribe = async function(req, res ) {

    try {
        var result = subscriptionModel.deleteOne({_id : req.params.id}).exec();
        res.send(result);

    } catch (error) {
        res.status(500).send(error);
    }
}
exports.publish = async function (res, res ) {
    
}