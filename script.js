// This is the code to play the audio when you press the icon.

document.getElementById("sound-icon").addEventListener("click", () => {
    const sound = document.getElementById("click-sound");
    sound.currentTime = 0;
    sound.play();
  });
