import * as functions from 'firebase-functions';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

admin.initializeApp();


const nodeMailerTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'kortana.assistant@gmail.com',
      pass: '123Asus!@#'
    }
});

function b64EncodeUnicode(str: any) {
  // first we use encodeURIComponent to get percent-encoded UTF-8,
  // then we convert the percent encodings into raw bytes which
  // can be fed into btoa.
    return Buffer.from(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
      // function toSolidBytes(match, p1) {
      (match, p1) => {
        // console.debug('match: ' + match);
        return String.fromCharCode(("0x" + p1) as any);
      })).toString('base64');
}

// function b64DecodeUnicode(str: any) {
//   // Going backwards: from bytestream, to percent-encoding, to original string.
//     return decodeURIComponent(atob(str).split('').map(function (c) {
//       return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//     }).join(''));
// }

exports.firestoreEmail = functions.firestore
    .document('Users/{user}')
    .onCreate((event) => {
  
  const templateActivare = (url: string) => (
    `Kortana îți urează bun venit!,<br/><br/><br/>
    Pentru activarea contului accesează ${url}.    
    `
    )
    
    const userId = event.id;
    
    const db = admin.firestore()
    
    return db.collection('Users').doc(userId)
    .get()
    .then((doc: any) => {
      
      const user = doc.data()
      
      const mailOptions = {
        from: 'kortana.assistant@gmail.com',
        to: user.email,
        subject: 'Kortana - Activare cont',
        html: templateActivare('https://amy-university-assistant.firebaseapp.com/user/activate?id=' + b64EncodeUnicode(user.email)) // TODO: pune url firebase pentru deploy
      };
      
      nodeMailerTransport.sendMail(mailOptions);
    })
    .then(() => console.log('email sent!', ) )
    .catch((err: any) => console.log(err) )
});