var admin = require("firebase-admin");

var serviceAccount = require("../private/serviceAccountKey");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://test-285b5.firebaseio.com"
});

exports.subscribe = async function (req , res ) {
  try {
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
  } catch (error) {
    console.log(error);
    res.status(500).send(error)
  }
 
}

exports.notify = async function(req , res ) {
 try {
  admin.messaging().send(req.body)
  .then((response) => {
    // Response is a message ID string.
    console.log('Successfully sent message:', response);
    res.send(response)
  })
  .catch((error) => {
    console.log('Error sending message:', error);
    res.status(500).send(error);
  });
 } catch (error) {
  console.log('Error sending message:', error);
  res.status(500).send(error);
 }

}


  // These registration tokens come from the client FCM SDKs

// Unsubscribe the devices corresponding to the registration tokens from
// the topic.
// admin.messaging().unsubscribeFromTopic(registrationTokens, topic)
//   .then(function(response) {
//     // See the MessagingTopicManagementResponse reference documentation
//     // for the contents of response.
//     console.log('Successfully unsubscribed from topic:', response);
//   })
//   .catch(function(error) {
//     console.log('Error unsubscribing from topic:', error);
//   });