const Express = require("express");
const Mongoose = require("mongoose");
const BodyParser = require("body-parser");
const topicController = require('./controller/topicController')
var url = "mongodb+srv://Notifyme:Codejam@12@cluster0-yb1jm.mongodb.net/test?retryWrites=true&w=majority";
Mongoose.connect(url,{
    useNewUrlParser: true
  });

var app = Express();

const PersonModel = Mongoose.model("person", {
    firstname: String,
    lastname: String
});

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

app.post("/topic",topicController.addTopic);
app.delete("/topic/:id",topicController.deleteTopic);
app.get("/getAllTopics", topicController.getAllTopics);
app.get("/getTopic",topicController.getTopic);

app.post("/person", async (request, response) => {
    try {
        var person = new PersonModel(request.body);
        var result = await person.save();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.get("/person/:id", async (request, response) => {
    try {
        var person = await PersonModel.findById(request.params.id).exec();
        response.send(person);
    } catch (error) {
        response.status(500).send(error);
    }
});
app.put("/person/:id", async (request, response) => {
    try {
        var person = await PersonModel.findById(request.params.id).exec();
        person.set(request.body);
        var result = await person.save();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.delete("/person/:id", async (request, response) => {
    try {
        var result = await PersonModel.deleteOne({ _id: request.params.id }).exec();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.listen(3000, () => {
    console.log("Listening at :3000...");
});



