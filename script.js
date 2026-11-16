// the things on the page
const cards = document.querySelectorAll('.photo-card');
const video = document.getElementById('concert-video');
const videoCard = document.getElementById('video-card');
const soundscape = document.getElementById('soundscape');

// function: stop one photo's sound and reset how it looks
function stopCard(card) {
  card.audio.pause();
  card.audio.currentTime = 0;
  card.classList.remove('playing');
  card.querySelector('.status').textContent = 'Click to play';
}

// function: stop every photo's sound
function stopAll() {
  cards.forEach(stopCard);
}

// function: start one photo's sound and make the photo pulse
function startCard(card) {
  // only one thing plays at a time, so stop everything else first
  stopAll();
  video.pause();
  soundscape.pause();

  card.audio.play().catch(function() {
    // if the sound file is missing, go back to the normal look
    stopCard(card);
  });
  card.classList.add('playing');
  card.querySelector('.status').textContent = 'Playing. Click to stop';
}

// function: play the sound if it is stopped, stop it if it is playing
function toggleCard(card) {
  if (card.audio.paused) {
    startCard(card);
  } else {
    stopCard(card);
  }
}

// set up each photo
cards.forEach(function(card) {
  // each photo gets its own audio object that loops
  card.audio = new Audio(card.dataset.sound);
  card.audio.loop = true;

  // event listener: clicking the photo plays or stops its sound
  card.addEventListener('click', function() {
    toggleCard(card);
  });
});

// event listeners for the video
video.addEventListener('play', function() {
  stopAll();
  soundscape.pause();
  videoCard.classList.add('playing');
});

video.addEventListener('pause', function() {
  videoCard.classList.remove('playing');
});

// event listener: when the full soundscape starts, stop everything else
soundscape.addEventListener('play', function() {
  stopAll();
  video.pause();
});
