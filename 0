import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

import { 
  getMessaging, 
  getToken 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging.js";


// 🔥 Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyAm7jGKD6YzJ7sEAH9Qk2TvIQNmUaFr59E",
  authDomain: "hyaty-53f82.firebaseapp.com",
  projectId: "hyaty-53f82",
  storageBucket: "hyaty-53f82.firebasestorage.app",
  messagingSenderId: "1042737484371",
  appId: "1:1042737484371:web:5f4b6206c4142c6e992ca6",
  measurementId: "G-6G0M1DBDX4"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app); // ✅ اتصلحت


// ✅ تسجيل Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/firebase-messaging-sw.js')
    .then((registration) => {
      console.log("Service Worker registered:", registration);
    })
    .catch((error) => {
      console.log("Service Worker registration failed:", error);
    });
}


// 🔔 إعداد الإشعارات
const messaging = getMessaging(app);

async function requestPermission() {
  const permission = await Notification.requestPermission();

  if (permission === "granted") {
    const token = await getToken(messaging, {
      vapidKey: "BDHSxQI5ZGB6c5dLprdcmMdnkMqOubjnm7X_vRA_HpDffre8AgxCRFypQPHnqBy6dfCfBj70d35h5IYGoOCajdE"
    });

    console.log("Token:", token);

    if (token) {
      await addDoc(collection(db, "tokens"), {
        token: token,
        time: Date.now()
      });
    }
  } else {
    console.log("Notification permission denied");
  }
}

requestPermission();


// ================== الشات ==================

const messagesRef = ref(db, "messages");

const messagesDiv = document.getElementById("messages");
const nameInput = document.getElementById("name");
const messageInput = document.getElementById("message");
const sendBtn = document.getElementById("sendBtn");
const imageInput = document.getElementById("imageInput");
const recordBtn = document.getElementById("recordBtn");
const profileInput = document.getElementById("profileInput");
const recordingStatus = document.getElementById("recordingStatus");


// حفظ الاسم
nameInput.value = localStorage.getItem("username") || "";
nameInput.addEventListener("input", () => {
  localStorage.setItem("username", nameInput.value);
});


// صورة البروفايل
let profilePic = localStorage.getItem("profilePic");

profileInput.addEventListener("change", e => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    profilePic = reader.result;
    localStorage.setItem("profilePic", profilePic);
  };
  reader.readAsDataURL(file);
});


// تنسيق الوقت
function formatTime(timestamp) {
  const d = new Date(timestamp);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}


// عرض الرسائل (Realtime 🔥)
onValue(messagesRef, snapshot => {
  messagesDiv.innerHTML = "";

  messagesDiv.innerHTML = "";

const data = snapshot.val();

for (const key in data) {
  const msg = data[key];
    const isMe = data.name === nameInput.value;

    const msgDiv = document.createElement("div");
    msgDiv.className = "message " + (isMe ? "sent" : "received");

    const avatar = data.profilePic || "default-avatar.png";
    const avatarHTML = avatar ? `<img src="${avatar}" class="avatar">` : "";

    let content = "";
    if (data.text) content = data.text;
    if (data.image) content = `<img src="${data.image}" class="chat-img">`;
    if (data.audio) content = `<audio controls src="${data.audio}"></audio>`;

    msgDiv.innerHTML = `
      ${avatarHTML}
      <div>
        <div class="name">
          ${data.name || "مستخدم"}
          <span class="time">${formatTime(data.time)}</span>
        </div>
        <div class="bubble">${content}</div>
      </div>
    `;

    messagesDiv.appendChild(msgDiv);
  });

  messagesDiv.scrollTop = messagesDiv.scrollHeight;
});


// إرسال نص
async function sendMessage() {
  const name = nameInput.value.trim();
  const text = messageInput.value.trim();
  if (!name || !text) return;

  await addDoc(messagesRef, {
    name,
    text,
    profilePic: profilePic || "",
    time: Date.now()
  });

  messageInput.value = "";
}

sendBtn.addEventListener("click", sendMessage);
messageInput.addEventListener("keypress", e => {
  if (e.key === "Enter") sendMessage();
});


// إرسال صورة (Base64 مؤقت)
imageInput.addEventListener("change", async e => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = async () => {
    await addDoc(messagesRef, {
      name: nameInput.value,
      image: reader.result,
      profilePic: profilePic || "",
      time: Date.now()
    });
  };
  reader.readAsDataURL(file);
});


// تسجيل الصوت
let mediaRecorder;
let audioChunks = [];

recordBtn.addEventListener("click", async () => {
  if (!mediaRecorder || mediaRecorder.state === "inactive") {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);

    audioChunks = [];
    mediaRecorder.start();
    recordingStatus.textContent = "🎤 جاري التسجيل...";

    mediaRecorder.ondataavailable = e => audioChunks.push(e.data);

    mediaRecorder.onstop = async () => {
      recordingStatus.textContent = "";

      const blob = new Blob(audioChunks, { type: "audio/webm" });
      const reader = new FileReader();

      reader.onloadend = async () => {
        await addDoc(messagesRef, {
          name: nameInput.value,
          audio: reader.result,
          profilePic: profilePic || "",
          time: Date.now()
        });
      };

      reader.readAsDataURL(blob);
    };

  } else {
    mediaRecorder.stop();
  }
});
