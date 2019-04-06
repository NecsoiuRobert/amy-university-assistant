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
      user: 'amy.university.assistant@gmail.com',
      pass: '123Asus!@#'
    }
});

exports.firestoreEmail = functions.firestore
    .document('Users/{user}')
    .onCreate((event) => {
  
  const templateActivare = (url: string) => (
    `Amy îți urează bun venit!,<br/><br/><br/>
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
        from: 'amy.university.assistant@gmail.com',
        to: user.email,
        subject: 'Amy - Activare cont',
        html: templateActivare('http://localhost:4200/user/activate?id=' + userId) // TODO: pune url firebase pentru deploy
      };
      
      nodeMailerTransport.sendMail(mailOptions);
    })
    .then(() => console.log('email sent!', ) )
    .catch((err: any) => console.log(err) )
});