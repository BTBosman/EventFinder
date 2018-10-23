"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
exports.events = functions.database.ref('/users/').onWrite(() => {
    console.log('new user added weh');
    const registrationToken = 'eek8leAJ-1E:APA91bFArm18K_jx7vQcxI-ky6NVak88f4s4JSQtz6OHzCyKfLSiN2Sw6e99KqQE4zlYZsi5mO8FlBU8HPPHhZH37XWs_1RwaOblbmUdofoSsgGo22cn5cHvaEZbAzxfFfXVqThmZjpW';
    // See documentation on defining a message payload.
    const message = {
        data: {
            score: '850',
            time: '2:45'
        },
        token: registrationToken
    };
    // Send a message to the device corresponding to the provided
    // registration token.
    admin.messaging().send(message)
        .then((response) => {
        // Response is a message ID string.
        console.log('Successfully sent message:', response);
    })
        .catch((error) => {
        console.log('Error sending message:', error);
    });
});
//# sourceMappingURL=index.js.map