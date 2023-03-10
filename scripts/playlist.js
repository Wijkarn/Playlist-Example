let path = window.location.pathname;
{
  if (path != "index.html") {
    path = "yeet/index.html";
  }
}

// Ignore everything above. It onöy for github and live server.

//let path = window.location.pathname;
let page = path.split("/").pop();

console.log(page);
let playlist;

// Links
{
  if (page == "index.html") {
    playlist = [
      {
        name: "Video 1",
        src: "./videos/v1.mp4",
      },
      {
        name: "Video 2",
        src: "./videos/v2.mp4",
      },
      {
        name: "Video 3",
        src: "./videos/v3.mp4",
      },
    ];
  } else if (page == "otherpage.html") {
    playlist = [
      {
        name: "Video 3",
        src: "./videos/v3.mp4",
      },
      {
        name: "Video 2",
        src: "./videos/v2.mp4",
      },
      {
        name: "Video 1",
        src: "./videos/v1.mp4",
      },
    ];
  }
}

// (A2) playListVideo PLAYER & GET HTML CONTROLS

const playListVideo = document.getElementById("playlistVideo"),
  playlistList = document.getElementById("playlistList");

// (A3) BUILD PLAYLIST
for (let i in playlist) {
  let row = document.createElement("div");
  row.className = "vRow";
  row.innerHTML = playlist[i]["name"];
  row.addEventListener("click", () => {
    vidPlay(i);
  });
  playlist[i]["row"] = row;
  playlistList.appendChild(row);
}

// (B) PLAY MECHANISM
// (B1) FLAGS
let vidNow = 0, // current playListVideo
  vidStart = false, // auto start next playListVideo
  // (B2) PLAY SELECTED playListVideo
  vidPlay = (idx, nostart) => {
    vidNow = idx;
    vidStart = nostart ? false : true;
    playListVideo.src = playlist[idx]["src"];
    for (let i in playlist) {
      if (i == idx) {
        playlist[i]["row"].classList.add("now");
      } else {
        playlist[i]["row"].classList.remove("now");
      }
    }
  };

// (B3) AUTO START WHEN SUFFICIENTLY BUFFERED
playListVideo.addEventListener("canplay", () => {
  if (vidStart) {
    playListVideo.play();
    vidStart = false;
  }
});

// (B4) AUTOPLAY NEXT playListVideo IN THE PLAYLIST
playListVideo.addEventListener("ended", nextPlayListVideo);

// (B5) INIT SET FIRST playListVideo
vidPlay(0, true);

// PRESS KEYS TO GO TO NEXT OR PREV playListVideo
document.addEventListener("keydown", (event) => {
  if (event.key == "-") {
    nextPlayListVideo();
  } else if (event.key == ".") {
    prevPlayListVideo();
  }
});

// PLAYS THE NEXT playListVideo
function nextPlayListVideo() {
  vidNow++;
  if (vidNow >= playlist.length) {
    vidNow = 0;
  }
  vidPlay(vidNow);
}

// PLAYS THE PREV playListVideo
function prevPlayListVideo() {
  if (vidNow == 0) {
    vidNow = playlist.length - 1;
  } else {
    vidNow--;
  }
  vidPlay(vidNow);
}
