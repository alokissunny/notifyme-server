const Express = require("express");
const Mongoose = require("mongoose");
const BodyParser = require("body-parser");

var cors = require('cors')


const topicController = require('./controller/topicController')


const messageController = require('./controller/messageController');

const fireBaseController = require('./controller/firebaseController');
var app = Express();

app.use(cors())


app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

app.post("/topic",topicController.addTopic);
app.delete("/topic/:id",topicController.deleteTopic);
app.get("/getAllTopics/:id", topicController.getAllTopics);
app.get("/getTopic",topicController.getTopic);
app.get("/getCategories",topicController.getAllCatergories);


app.post("/subscribe",messageController.subscribe);
app.delete("/unsubscribe/:id",messageController.unsubscribe);
app.post("/publish",messageController.publish);

app.post("/triggerSubscription",fireBaseController.subscribe);
app.post("/notify",fireBaseController.notify);





// app.post("/person", async (request, response) => {
//     try {
//         var person = new PersonModel(request.body);
//         var result = await person.save();
//         response.send(result);
//     } catch (error) {
//         response.status(500).send(error);
//     }
// });

// app.get("/person/:id", async (request, response) => {
//     try {
//         var person = await PersonModel.findById(request.params.id).exec();
//         response.send(person);
//     } catch (error) {
//         response.status(500).send(error);
//     }
// });
// app.put("/person/:id", async (request, response) => {
//     try {
//         var person = await PersonModel.findById(request.params.id).exec();
//         person.set(request.body);
//         var result = await person.save();
//         response.send(result);
//     } catch (error) {
//         response.status(500).send(error);
//     }
// });

// app.delete("/person/:id", async (request, response) => {
//     try {
//         var result = await PersonModel.deleteOne({ _id: request.params.id }).exec();
//         response.send(result);
//     } catch (error) {
//         response.status(500).send(error);
//     }
// });

app.listen(3001, () => {
    console.log("Listening at :3001...");
});



