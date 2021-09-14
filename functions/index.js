const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", { structuredData: true });
  response.send("Helo from Firebase!");
});

exports.addMod = functions.https.onCall(async (email) => {
  const user = await admin.auth().getUserByEmail(email);
  if (user.customClaims && user.customClaims.moderator === true) {
    return {
      message: "aleady added",
    };
  }
  return admin
    .auth()
    .setCustomUserClaims(user.uid, {
      moderator: true,
    })
    .then(() => {
      return {
        message: "sucess",
      };
    })
    .catch((err) => {
      return err;
    });
});

exports.defaultField = functions.firestore
  .document("/users/{usersId}/posts/{id}")
  .onCreate((snap, context) => {
    db.doc("/users/{usersId}/posts/{id}").update({ approved: false });
  });
