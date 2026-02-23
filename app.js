import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAmElPVCV5bIoUste1aunreoWswNak_hh8",
  authDomain: "chat-e3c2a.firebaseapp.com",
  projectId: "chat-e3c2a",
  storageBucket: "chat-e3c2a.firebasestorage.app",
  messagingSenderId: "732872928958",
  appId: "1:732872928958:web:11005c036280b63caff8ef",
  measurementId: "G-9527WZYYC7"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const messagesRef = collection(db, "messages");
const q = query(messagesRef, orderBy("time"));

const messagesDiv = document.getElementById("messages");
const nameInput = document.getElementById("name");
const messageInput = document.getElementById("message");
const sendBtn = document.getElementById("sendBtn");

let replyTo = null;

// عرض الرسائل
onSnapshot(q, (snapshot)=>{
  messagesDiv.innerHTML = "";
  snapshot.forEach(docSnap=>{
    const data = docSnap.data();

    const msgDiv = document.createElement("div");
    msgDiv.classList.add("message");
    msgDiv.classList.add(data.name===nameInput.value?"sent":"received");

    // الريبلاي يظهر فوق الاسم
    let replyHTML = data.replyTo ? `<div class="reply">رد على: ${data.replyTo}</div>` : "";

    msgDiv.innerHTML = `
      ${replyHTML}
      <div class="name">${data.name}</div>
      <div class="text">${data.text}</div>
      <div class="message-actions">
        <span class="action-btn reply-btn" data-text="${data.text}">&larr;</span>
      </div>
    `;

    messagesDiv.appendChild(msgDiv);
  });

  // زر Reply لكل رسالة
  document.querySelectorAll(".reply-btn").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      replyTo = btn.dataset.text;
      messageInput.focus();
    });
  });

  messagesDiv.scrollTop = messagesDiv.scrollHeight;
});

// إرسال الرسالة
sendBtn.addEventListener("click", sendMessage);
messageInput.addEventListener("keypress",(e)=>{if(e.key==="Enter"){sendMessage();}});

async function sendMessage(){
  const name = nameInput.value;
  const text = messageInput.value;
  if(!name || !text) return;

  await addDoc(messagesRef,{
    name:name,
    text:text,
    time:Date.now(),
    replyTo:replyTo
  });

  messageInput.value="";
  replyTo=null;
}