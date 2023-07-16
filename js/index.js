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

    this.audio = document.createElement('audio')
    this.isPlaying = false
    this.musicIndex = 0
    this.currentTimeTracker;
    this.musics = [
      {
        "name": "مست نجف",
        "singer": "علی اکبر حائری",
        "soundFile": "https://mir1.kashoob.com/audio/202307/enc_16886604346303551066363.mp3",
        "imageFile": "https://cdnimg.kashoob.com/GCpYEPw21Qtxy_CrruMwwTUwN2dDPHPMdCaCJ2ehyfs/wm:0.8:sowe:15:15:0.18/bG9jYWw6Ly8vc3RvcmFnZS9pbWFnZS8yMDIzMDcvMTY4ODY2MDM1OTIzOTY2NjMyNDQ3MjcuanBn.jpg"
      },
      {
        "name": "نماهنگ سرود جانم علی",
        "singer": "گروه سرود نجم الثاقب",
        "soundFile": "https://mir1.kashoob.com/audio/202307/enc_16883148568412932893789.mp3",
        "imageFile": "https://cdnimg.kashoob.com/8kk91Xbys7V1Qvtaq0qo8WPPDBb72vIMQae5HM6Aew4/wm:0.8:sowe:15:15:0.18/bG9jYWw6Ly8vc3RvcmFnZS9pbWFnZS8yMDIzMDcvMTY4ODMxNDg5MzAwOTc2Njc0MTQ4MzIuanBn.jpg"
      },
      {
        "name": "نماهنگ بیعت با علی",
        "singer": "ابوذر روحی",
        "soundFile": "https://mir1.kashoob.com/audio/202307/enc_16883183490391081798728.mp3",
        "imageFile": "https://cdnimg.kashoob.com/M3GGTOAQvjtrWavvqZqpvUxt1ni_rwMK0mOy5nNZeDw/wm:0.8:sowe:15:15:0.18/bG9jYWw6Ly8vc3RvcmFnZS9pbWFnZS8yMDIzMDcvMTY4ODMxODY1Njg2NjcwMjc0MzM4OTQuanBn.jpg"
      },
      {
        "name": "نماهنگ خلیفة الله",
        "singer": "حسن کاتب کربلایی",
        "soundFile": "https://mir1.kashoob.com/audio/202207/enc_16581591953983524323193.mp3",
        "imageFile": "https://cdnimg.kashoob.com/pFgSp5DpefLp8QIPw6p51yqmGlZcgUypQbLvO6oOCeE/wm:0.8:sowe:15:15:0.18/bG9jYWw6Ly8vc3RvcmFnZS9pbWFnZS8yMDIyMDcvMTY1ODE1OTIyMTUzNDk3MDgyMzExNTkuanBn.jpg"
      }
    ]
    this.svgs = {
      pause: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256"><path fill="currentColor" d="M216 48v160a16 16 0 0 1-16 16h-40a16 16 0 0 1-16-16V48a16 16 0 0 1 16-16h40a16 16 0 0 1 16 16ZM96 32H56a16 16 0 0 0-16 16v160a16 16 0 0 0 16 16h40a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16Z"/></svg>',
      play: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256"><path fill="currentColor" d="M240 128a15.74 15.74 0 0 1-7.6 13.51L88.32 229.65a16 16 0 0 1-16.2.3A15.86 15.86 0 0 1 64 216.13V39.87a15.86 15.86 0 0 1 8.12-13.82a16 16 0 0 1 16.2.3l144.08 88.14A15.74 15.74 0 0 1 240 128Z"/></svg>',
    }
  }
  init = () => {
    this.loadMusic(this.musicIndex)
    this.setEL()
  }
  loadMusic = (id) => {
    this.musicName.textContent = this.musics[id].name
    this.musicSinger.textContent = this.musics[id].singer
    this.musicImage.src = this.musics[id].imageFile
    this.audio.src = this.musics[id].soundFile
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
    this.plause()
  }
  reset = () => {
    this.btnPlay.innerHTML = this.svgs.play
    if (!this.audio.paused) this.audio.pause()
    this.isPlaying = false
    this.setTime(0)
  }
  setEL = () => {
    this.audio.addEventListener('ended', this.next)
    this.btnPlay.addEventListener('click', this.plause)
    this.btnNext.addEventListener('click', this.next)
    this.btnPervious.addEventListener('click', this.pervious)
    this.volumeSlider.addEventListener('input', this.setVolume)
    this.timeSlider.addEventListener('input', this.setTime)
    this.currentTimeTracker = setInterval(() => {
      if (!this.audio.paused) this.setTimeUI(this.calcCurrentPercentage())
    }, 1000)
  }
  setSliderStyle = (value, elem) => {
    elem.style.background = `linear-gradient(to right, hsl(200, 100%, 50%) ${value}%, hsla(0, 0%, 0%, 0.5) 0%)`
  }

  setVolume = () => {
    this.setCurrentVolume(this.volumeSlider.value)
    this.setVolumeUI(this.volumeSlider.value)
  }
  setCurrentVolume = (percentage) => {
    this.audio.volume = percentage / 100
  }
  setVolumeUI = (percentage) => {
    this.volumeSlider.setAttribute('value', percentage)
    this.setSliderStyle(percentage, this.volumeSlider)
  }
  setTime = () => {
    this.setCurrentTime(this.timeSlider.value)
    this.setTimeUI(this.timeSlider.value)
  }
  setCurrentTime = (percentage) => {
    this.audio.currentTime = (this.audio.duration * (percentage / 100))
  }
  setTimeUI = (percentage) => {
    this.timeSlider.setAttribute('value', percentage)
    this.timeSlider.value = percentage
    this.setSliderStyle(percentage, this.timeSlider)
  }
  calcCurrentPercentage = () => Math.round((this.audio.currentTime / this.audio.duration) * 100)
}

const player = new Player(document.querySelector('.player'))
player.init()
