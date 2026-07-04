const songs = [

{
title:"Until I Found You",
artist:"Stephen Sanchez",
src:"songs/song1.mp3",
cover:"images/cover1.jpg"
},

{
title:"Shape of You",
artist:"Ed Sheeran",
src:"songs/song2.mp3",
cover:"images/cover2.jpg"
},

{
title:"Beauty and a Beat",
artist:"Justin Beiber",
src:"songs/song3.mp3",
cover:"images/cover3.jpg"
},

{
title:"Night Changes",
artist:"One Direction",
src:"songs/song4.mp3",
cover:"images/cover4.jpg"
},

{
title:"Love Story",
artist:"Taylor Swift",
src:"songs/song5.mp3",
cover:"images/cover5.jpg"
},

{
title:"her(ft. ZVC)",
artist:"JVKE",
src:"songs/song6.mp3",
cover:"images/cover6.jpg"
},

{
title:"Cupid",
artist:"Fifty Fifty",
src:"songs/song7.mp3",
cover:"images/cover7.jpg"
},

];

let currentSong = 0;
let isPlaying = false;

const audio = document.getElementById("audio");

const cover = document.getElementById("cover-image");

const title = document.getElementById("song-title");

const artist = document.getElementById("artist-name");

const playBtn = document.getElementById("play");

const prevBtn = document.getElementById("prev");

const nextBtn = document.getElementById("next");

const progress = document.getElementById("progress-bar");

const volume = document.getElementById("volume");

const currentTime = document.getElementById("current-time");

const duration = document.getElementById("duration");

const playlistSongs = document.querySelectorAll(".song");

function loadSong(index){

audio.src = songs[index].src;

cover.src = songs[index].cover;

title.innerHTML = songs[index].title;

artist.innerHTML = songs[index].artist;

playlistSongs.forEach(song=>song.classList.remove("active"));

playlistSongs[index].classList.add("active");

}

loadSong(currentSong);

function playSong(){

audio.play();

isPlaying=true;

cover.classList.add("rotate");

playBtn.innerHTML='<i class="fa-solid fa-pause"></i>';

}

function pauseSong(){

audio.pause();

isPlaying=false;

cover.classList.remove("rotate");

playBtn.innerHTML='<i class="fa-solid fa-play"></i>';

}

playBtn.addEventListener("click",()=>{

if(isPlaying){

pauseSong();

}

else{

playSong();

}

});

nextBtn.addEventListener("click",()=>{

currentSong++;

if(currentSong>=songs.length){

currentSong=0;

}

loadSong(currentSong);

playSong();

});

prevBtn.addEventListener("click",()=>{

currentSong--;

if(currentSong<0){

currentSong=songs.length-1;

}

loadSong(currentSong);

playSong();

});

audio.addEventListener("timeupdate",()=>{

const progressPercent=(audio.currentTime/audio.duration)*100;

progress.value=progressPercent||0;

currentTime.innerHTML=formatTime(audio.currentTime);

duration.innerHTML=formatTime(audio.duration);

});

progress.addEventListener("input",()=>{

audio.currentTime=(progress.value/100)*audio.duration;

});

volume.addEventListener("input",()=>{

audio.volume=volume.value;

});

audio.addEventListener("ended",()=>{

currentSong++;

if(currentSong>=songs.length){

currentSong=0;

}

loadSong(currentSong);

playSong();

});

playlistSongs.forEach(song=>{

song.addEventListener("click",()=>{

currentSong=Number(song.dataset.index);

loadSong(currentSong);

playSong();

});

});

function formatTime(time){

if(isNaN(time)) return "0:00";

let min=Math.floor(time/60);

let sec=Math.floor(time%60);

if(sec<10){

sec="0"+sec;

}

return min+":"+sec;

}