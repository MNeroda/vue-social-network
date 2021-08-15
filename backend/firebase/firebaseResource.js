const admin = require("firebase-admin");

const serviceAccount = require("./vue-social-network-images-firebase-adminsdk-itth7-88ba42f9bc.json")
const firebaseConfig = {
    apiKey: "AIzaSyBQnBO4J-sFFjgzdx_JQJyxR-C7R7_IJCc",
    authDomain: "vue-social-network-images.firebaseapp.com",
    projectId: "vue-social-network-images",
    storageBucket: "vue-social-network-images.appspot.com",
    messagingSenderId: "782802673926",
    appId: "1:782802673926:web:c69056d8d67db64951fe87"
};

const app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
/*    ...firebaseConfig*/
})

const storage = app.storage()
module.exports = storage
