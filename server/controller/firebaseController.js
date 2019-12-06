var admin = require("firebase-admin");

var serviceAccount = require("../private/serviceAccountKey");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://test-285b5.firebaseio.com"
});

admin.messaging().subscribeToTopic(req.body.registrationTokens, req.body.topic)
  .then(function(response) {
    // See the MessagingTopicManagementResponse reference documentation
    // for the contents of response.
    console.log('Successfully subscribed to topic:', response);
    res.send(response)
  })
  .catch(function(error) {
    console.log('Error subscribing to topic:', error);
    res.status(500).send(error);
  });
