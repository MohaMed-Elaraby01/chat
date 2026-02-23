importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyAmElPVCV5bIoUste1aunreoWswNak_hh8",
  authDomain: "chat-e3c2a.firebaseapp.com",
  projectId: "chat-e3c2a",
  messagingSenderId: "732872928958",
  appId: "1:732872928958:web:11005c036280b63caff8ef"
});

const messaging = firebase.messaging();