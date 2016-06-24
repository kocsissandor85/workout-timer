var beep, beepSource, wooden, woodenSource;

beepSource  = document.createElement("source");
beepSource.type = "audio/mpeg";
beepSource.src  = "../sfx/beep.wav";

beep  = new Audio();
beep.appendChild(beepSource);

woodenSource  = document.createElement("source");
woodenSource.type = "audio/mpeg";
woodenSource.src  = "../sfx/wooden.wav";

wooden  = new Audio();
wooden.appendChild(woodenSource);

export default {
  wooden: wooden,
  beep: beep
};