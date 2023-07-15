class Player {
  constructor(player) {
    this.musicImage = player.querySelector('#music-image')
    this.musicName = player.querySelector('#music-name')
    this.musicSinger = player.querySelector('#music-singer')
    this.btnPervious = player.querySelector('#previous')
    this.btnPlay = player.querySelector('#play')
    this.btnNext = player.querySelector('#next')
    this.volumeSlider = player.querySelector('#volume-slider')
    this.timeSlider = player.querySelector('#time-slider')

    this.isPlaying = false
    this.musicIndex = 0
    this.audio = document.createElement('audio')
    this.musics = [
      {
        "name": "مست نجف",
        "singer": "علی اکبر حائری",
        "soundFile": "mast_najaf.mp3",
        "imageFile": "mast_najaf.jpg"
      },
      {
        "name": "نماهنگ سرود جانم علی",
        "singer": "گروه سرود نجم الثاقب",
        "soundFile": "janam_ali.mp3",
        "imageFile": "janam_ali.jpg"
      },
      {
        "name": "نماهنگ بیعت با علی",
        "singer": "ابوذر روحی",
        "soundFile": "beyat_ba_ali.mp3",
        "imageFile": "beyat_ba_ali.jpg"
      },
      {
        "name": "نماهنگ خلیفة الله",
        "singer": "حسن کاتب کربلایی",
        "soundFile": "khalifa_allah.mp3",
        "imageFile": "khalifa_allah.jpg"
      }
    ]
    this.svgs = {
      pause: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256"><path fill="currentColor" d="M216 48v160a16 16 0 0 1-16 16h-40a16 16 0 0 1-16-16V48a16 16 0 0 1 16-16h40a16 16 0 0 1 16 16ZM96 32H56a16 16 0 0 0-16 16v160a16 16 0 0 0 16 16h40a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16Z"/></svg>',
      play: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256"><path fill="currentColor" d="M240 128a15.74 15.74 0 0 1-7.6 13.51L88.32 229.65a16 16 0 0 1-16.2.3A15.86 15.86 0 0 1 64 216.13V39.87a15.86 15.86 0 0 1 8.12-13.82a16 16 0 0 1 16.2.3l144.08 88.14A15.74 15.74 0 0 1 240 128Z"/></svg>',
      next: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256"><path fill="currentColor" d="M208 40v176a8 8 0 0 1-16 0v-69.23L72.43 221.55A15.95 15.95 0 0 1 48 208.12V47.88a15.95 15.95 0 0 1 24.43-13.43L192 109.23V40a8 8 0 0 1 16 0Z"/></svg>',
      pervious: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256"><path fill="currentColor" d="M208 47.88v160.24a16 16 0 0 1-24.43 13.43L64 146.77V216a8 8 0 0 1-16 0V40a8 8 0 0 1 16 0v69.23l119.57-74.78A15.95 15.95 0 0 1 208 47.88Z"/></svg>',
    }
  }
  init = () => {
    this.loadMusic(this.musicIndex)
    this.setEL()
  }
  loadMusic = (id) => {
    this.musicName.textContent = this.musics[id].name
    this.musicSinger.textContent = this.musics[id].singer
    this.musicImage.src = `./assets/image/${this.musics[id].imageFile}`
    this.audio.src = `./assets/sound/${this.musics[id].soundFile}`
    this.audio.load()
  }
  plause = () => {
    if (this.isPlaying)  {
      this.audio.pause()
      this.btnPlay.innerHTML = this.svgs.play
    }
    if (!this.isPlaying) {
      this.audio.play()
      this.btnPlay.innerHTML = this.svgs.pause
    }
    this.isPlaying = !this.isPlaying
  }
  next = () => {
    this.reset()
    this.musicIndex = (this.musicIndex >= this.musics.length - 1) ? (0) : (this.musicIndex + 1);
    this.loadMusic(this.musicIndex)
    this.plause()
  }
  pervious = () => {
    this.reset()
    this.musicIndex = (this.musicIndex <= 0) ? (this.musics.length - 1) : (this.musicIndex - 1);
    this.loadMusic(this.musicIndex)
  }
  reset = () => {
    this.btnPlay.innerHTML = this.svgs.play
    if (!this.audio.paused) this.audio.pause()
    this.isPlaying = false
    this.timeSlider.value = 0
  }
  setEL = () => {
    this.fixUI()
    this.audio.addEventListener('ended', this.next)
    this.btnPlay.addEventListener('click', this.plause)
    this.btnNext.addEventListener('click', this.next)
    this.btnPervious.addEventListener('click', this.pervious)
    this.volumeSlider.addEventListener('input', this.setVolume)
    this.timeSlider.addEventListener('input', this.setTime)
  }
  fixUI = () => {
    this.btnPlay.innerHTML = this.svgs.play
    this.btnNext.innerHTML = this.svgs.next
    this.btnPervious.innerHTML = this.svgs.pervious
  }
  setVolume = () => {
    this.audio.volume = this.volumeSlider.value / 100
    this.volumeSlider.style.background = `linear-gradient(to right, hsl(200, 100%, 50%) ${this.volumeSlider.value}%, hsla(0, 0%, 0%, 0.5) 0%)`
  }
  setTime = () => {
    let timeToSeekTo = (this.audio.duration * (this.timeSlider.value / 100))
    this.audio.currentTime = timeToSeekTo
  }
}

const player = new Player(document.querySelector('.player'))
player.init()