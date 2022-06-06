var playPauseMusicButton = document.getElementById("playPauseMusicButton");
var musicStationInput = document.getElementById("stations");
var playing = false;
var playPercent = 0;
var playIndicatorTime = 0;
var musicIndicator;
var currentSong;

var lofiSongs = new Array();
var currentLofi = 0;
var classicalSongs = new Array();
var currentClassical = 0;
var acousticSongs = new Array();
var currentAcoustic = 0;
var natureSongs = new Array();
var currentNature = 0;

var audioPlayer = document.getElementById("audioPlayer");

// Set Audio Srcs
lofiSongs[0] = "https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/XpOthDGLRLQULX4ayE2hezIK43FqPYAo69N5xxhn.mp3"; //https://freemusicarchive.org/music/holiznacc0/lazy-summer-lofi-1/blue-skiesmp3/
lofiSongs[1] = "https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/rsVaqU8XcOPmrhS3NF9U5hr2kSY0tjqcDWn6EeGi.mp3"; //https://freemusicarchive.org/music/holiznacc0/lazy-summer-lofi-1/wavesmp3/
lofiSongs[2] = "https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/Ayrr1BYn2ZBXLLWRDbAdasxsPzfqL70hNHlBaJif.mp3"; //https://freemusicarchive.org/music/holiznacc0/lazy-summer-lofi-1/laundry-on-the-wiremp3/
lofiSongs[3] = "https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/kaOJPdpxmsRiPqkfKV2qY5bwUUad4g1bzQhhAjy3.mp3"; //https://freemusicarchive.org/music/holiznacc0/busted-guitar-lofi-edit/come-again/
classicalSongs[0] = "https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/uwbEQCueByPpcHSlMJt71rkXKri3d1tbxfzCzOea.mp3"; //https://freemusicarchive.org/music/m33-project/classical-jouneys-vol-1/the-orchestra-improvisation/
classicalSongs[1] = "https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/BTRhpaYZBpT387b9pLJwARo2zvCPuhuXjOipYnOF.mp3"; //https://freemusicarchive.org/music/m33-project/classical-jouneys-vol-1/classical-kanon/
classicalSongs[2] = "https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/xxWo9yFOZBC3CEhAr5IlAMRhsGWGBMwY5U2222Xl.mp3"; //https://freemusicarchive.org/music/m33-project/classical-jouneys-vol-1/the-force-of-the-softness-f-dorian-guitar-flute/
classicalSongs[3] = "https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/rk5GjSTLqe5G6X7ufsppt3YBBLQhf3ksD5LYsX78.mp3"; //https://freemusicarchive.org/music/m33-project/classical-jouneys-vol-1/beautiful-flute-melody-strings/
acousticSongs[0] = "https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/ZGzjdgG5ynEy3AZlDwKSGkcWBp9KUgqPuZjQnmEI.mp3"; //https://freemusicarchive.org/music/crowander/acoustic-miniband-acoustic-minimals/smiling-flowers/
acousticSongs[1] = "https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/b17I4I7qJ9s7tUS2rMoCChRbtTxJTpCwXCRPVmLa.mp3"; //https://freemusicarchive.org/music/crowander/acoustic-miniband-acoustic-minimals/in-the-sun/
acousticSongs[2] = "https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/sYsCtkbQDbBCxdapzXm6cUl0fJVJ6F9h2ihDC9y5.mp3"; //https://freemusicarchive.org/music/crowander/acoustic-miniband-acoustic-minimals/easy-easy/
acousticSongs[3] = "https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/LgNStXHGZ0r7Df8X1tH685tZP3eZAZUtTZ3uw1Mc.mp3"; //https://freemusicarchive.org/music/crowander/acoustic-miniband-acoustic-minimals/one-more-round/
natureSongs[0] = "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/Ziklibrenbib/Les_Cartes_Postales_Sonores/NOISE_ON_EARTH_Vol7__AUSTRALIA/Les_Cartes_Postales_Sonores_-_16_-_Melbourne_rainfall.mp3"; //https://freemusicarchive.org/music/Les_Cartes_Postales_Sonores/NOISE_ON_EARTH_Vol7__AUSTRALIA/Les_Cartes_Postales_Sonores_-_NOISE_ON_EARTH_Vol7__AUSTRALIA_-_16_Melbourne_rainfall/
natureSongs[1] = "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/Ziklibrenbib/Les_Cartes_Postales_Sonores/NOISE_ON_EARTH_Vol7__AUSTRALIA/Les_Cartes_Postales_Sonores_-_15_-_Birds_of_Bruny_island.mp3"; //https://freemusicarchive.org/music/Les_Cartes_Postales_Sonores/NOISE_ON_EARTH_Vol7__AUSTRALIA/Les_Cartes_Postales_Sonores_-_NOISE_ON_EARTH_Vol7__AUSTRALIA_-_15_Birds_of_Bruny_island/
natureSongs[2] = "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/Ziklibrenbib/Les_Cartes_Postales_Sonores/NOISE_ON_EARTH_Vol7__AUSTRALIA/Les_Cartes_Postales_Sonores_-_13_-_Insectx.mp3"; //https://freemusicarchive.org/music/Les_Cartes_Postales_Sonores/NOISE_ON_EARTH_Vol7__AUSTRALIA/Les_Cartes_Postales_Sonores_-_NOISE_ON_EARTH_Vol7__AUSTRALIA_-_13_Insectx/
natureSongs[3] = "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/Ziklibrenbib/Les_Cartes_Postales_Sonores/NOISE_ON_EARTH_Vol7__AUSTRALIA/Les_Cartes_Postales_Sonores_-_12_-_Dark_water.mp3"; //https://freemusicarchive.org/music/Les_Cartes_Postales_Sonores/NOISE_ON_EARTH_Vol7__AUSTRALIA/Les_Cartes_Postales_Sonores_-_NOISE_ON_EARTH_Vol7__AUSTRALIA_-_12_Dark_water/

// Set previous channel
let loaded = localStorage.getItem('musicChannel');
if (loaded != null)
{
  updateMusicArt(loaded);
  musicStationInput.value = loaded;
}

function playPauseMusicClick()
{
  if (playing) // Already playing; change to pause
  {
    pauseMusic();
  } else { // Already paused; change to play

    let index = 0;
    let loaded = null;

    switch (musicStationInput.value)
    {
      case "lofi":
      loaded = localStorage.getItem('currentLofi');
      break;

      case "classical":
      loaded = localStorage.getItem('currentClassical');
      break;

      case "acoustic":
      loaded = localStorage.getItem('currentAcoustic');
      break;

      case "nature":
      loaded = localStorage.getItem('currentNature');
      break;
    }
    if (loaded != null) index = loaded;

    playMusic(musicStationInput.value, index);
  }
}

// play music
function playMusic(channel, index)
{
  document.getElementById("imgPause").style.display = "block";
  document.getElementById("imgPlay").style.display = "none";

  playing = true;
  playIndicatorTime = 0;

  // Play through actual track
  switch (channel)
  {
    case "lofi":
    currentSong = lofiSongs[index];
    break;

    case "classical":
    currentSong = classicalSongs[index];
    break;

    case "acoustic":
    currentSong = acousticSongs[index];
    break;

    case "nature":
    currentSong = natureSongs[index];
    break;
  }

  // Set (currentSong)
  audioPlayer.src = currentSong;
  audioPlayer.play();

  musicIndicator = window.setInterval(function(){
    document.querySelector(':root').style.setProperty('--playTransparency', Math.sin(playIndicatorTime) * 0.2 + 0.5);
    playIndicatorTime += 0.02;

    playPercent = Math.round(audioPlayer.currentTime / audioPlayer.duration * 100);

    // If time finishes, next song
    if (playPercent >= 100) moveTrack(1);
  }, 1);
}

// pause music
function pauseMusic()
{
  playing = false;
  document.getElementById("imgPause").style.display = "none";
  document.getElementById("imgPlay").style.display = "block";

  document.getElementById("audioPlayer").pause();

  clearInterval(musicIndicator);
  document.querySelector(':root').style.setProperty('--playTransparency', 0);
}

// skip track: -1 back, 1 forward
function moveTrack(skip)
{
  clearInterval(musicIndicator);

  switch (musicStationInput.value)
  {
    case "lofi":
      currentLofi += skip;
      if (currentLofi >= lofiSongs.length) currentLofi = 0;
      if (currentLofi < 0) currentLofi = lofiSongs.length - 1;
      localStorage.setItem("currentLofi", currentLofi);
      playMusic("lofi", currentLofi);
    break;

    case "classical":
      currentClassical += skip;
      if (currentClassical >= classicalSongs.length) currentClassical = 0;
      if (currentClassical < 0) currentClassical = classicalSongs.length - 1;
      localStorage.setItem("currentClassical", currentClassical);
      playMusic("classical", currentClassical);
    break;

    case "acoustic":
      currentAcoustic += skip;
      if (currentAcoustic >= acousticSongs.length) currentAcoustic = 0;
      if (currentAcoustic < 0) currentAcoustic = acousticSongs.length - 1;
      localStorage.setItem("currentAcoustic", currentAcoustic);
      playMusic("acoustic", currentAcoustic);
    break;

    case "nature":
      currentNature += skip;
      if (currentNature >= natureSongs.length) currentNature = 0;
      if (currentNature < 0) currentNature = natureSongs.length - 1;
      localStorage.setItem("currentNature", currentNature);
      playMusic("nature", currentNature);
    break;
  }
}

function musicChannelChanged()
{
  pauseMusic();
  updateMusicArt(musicStationInput.value);
}

function updateMusicArt(channel)
{
  localStorage.setItem('musicChannel', channel);

  switch(channel)
  {
    case "lofi":
      document.querySelector(':root').style.setProperty('--musicBackground', "#DBFFC5");
      document.getElementById("musicSymbol").children[0].textContent = "😎";
      break;
    case "classical":
      document.querySelector(':root').style.setProperty('--musicBackground', "#FFC5D3");
      document.getElementById("musicSymbol").children[0].textContent = "🎻";
      break;
    case "acoustic":
      document.querySelector(':root').style.setProperty('--musicBackground', "#FFE8C5");
      document.getElementById("musicSymbol").children[0].textContent = "🐴";
      break;
    case "nature":
      document.querySelector(':root').style.setProperty('--musicBackground', "#C5DFFF");
      document.getElementById("musicSymbol").children[0].textContent = "🌿";
      break;
  }
}
