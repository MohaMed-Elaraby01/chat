let audioPlayer = document.getElementById("audioPlayer");
let audioFile = document.getElementById("audioFile");

audioFile.addEventListener("change", function () {
  let file = this.files[0];
  if (file) {
    let url = URL.createObjectURL(file);
    audioPlayer.src = url;
  }
});

function playAudio() {
  audioPlayer.play();
}

function pauseAudio() {
  audioPlayer.pause();
}
