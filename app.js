<!DOCTYPE html>
<html lang="ar">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Chat</title>
<link rel="stylesheet" href="style.css">
</head>
<body>

<div class="chat-wrapper">
  <div class="chat-container">

    <!-- الهيدر -->
    <div class="header">
      <span>💬 Chat</span>
      <label for="profileInput" class="profile-btn">👤</label>
      <input type="file" id="profileInput" accept="image/*" hidden>
    </div>

    <!-- الرسائل -->
    <div class="messages" id="messages"></div>

    <!-- الإدخال -->
    <div class="input-area">
      <input id="name" placeholder="اسمك">

      <div class="chat-controls">
        <label for="imageInput" class="icon-btn">📷</label>
        <input type="file" id="imageInput" accept="image/*" hidden>

        <button id="recordBtn" class="icon-btn">🎤</button>

        <textarea id="message" placeholder="اكتب رسالة"></textarea>

        <button id="sendBtn" class="send-btn">➤</button>
      </div>

      <div id="recordingStatus" class="recording-status"></div>
    </div>

  </div>
</div>

<script type="module" src="app.js"></script>
</body>
</html>
