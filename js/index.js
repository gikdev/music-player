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
    this.timeNow = player.querySelector('#time-now')
    this.timeAll = player.querySelector('#time-all')
    this.dlBtn = player.querySelector('#dl-btn')
    this.repeatBtn = player.querySelector('#repeat-btn')
    this.soundBtn = player.querySelector('#sound-btn')
    this.nowPlaying = player.querySelector('#now-playing')

    this.repeatBtnMode = "repeat-all"
    // All modes: "repeat-all", "repeat-once", "shuffle"
    this.audio = document.createElement('audio')
    this.volumeSliderIsVisible = false
    this.isPlaying = false
    this.musicIndex = 0
    this.nextMusicToPlay = 1
    this.musics = [
      {
        "name": "نماهنگ مرهم",
        "singer": "پیام کیانی",
        "soundFile": "https://mir1.kashoob.com/audio/202306/enc_16862418013250862413684.mp3",
        "imageFile": "https://cdnimg.kashoob.com/eLVd0ivEmLniULUT53A49lHDdMp7hwXEHNaH37Lwpmo/wm:0.8:sowe:15:15:0.18/bG9jYWw6Ly8vc3RvcmFnZS9pbWFnZS8yMDIzMDYvMTY4NjI0MTcxMDQxMjA2ODkwMzM4NTAuanBn.jpg"
      },
      {
        "name": "نماهنگ بغل وا کن",
        "singer": "حسین خلجی",
        "soundFile": "https://mir1.kashoob.com/audio/202306/enc_16868682688575724581181.mp3",
        "imageFile": "https://cdnimg.kashoob.com/4KMgVhHQKL5Je5HTEo5gmpT-lnYKOnWM3B6gfJhghhM/wm:0.8:sowe:15:15:0.18/bG9jYWw6Ly8vc3RvcmFnZS9pbWFnZS8yMDIzMDYvMTY4Njg2ODM4OTEzMTk2NjAxMjMyOTQuanBn.jpg"
      },
      {
        "name": "نماهنگ سحر کربلا",
        "singer": "سید رضا نریمانی",
        "soundFile": "https://mir1.kashoob.com/audio/202306/enc_16874500265213467745966.mp3",
        "imageFile": "https://cdnimg.kashoob.com/1UKT1kYN6qyjUkUEEUIaAGOTu-TVJJt5Tm8cNDn8T6Q/wm:0.8:sowe:15:15:0.18/bG9jYWw6Ly8vc3RvcmFnZS9pbWFnZS8yMDIzMDYvMTY4NzQ0OTk0NDg2OTQyMjM0MzU0MTguanBn.jpg"
      },
      {
        "name": "نماهنگ به خونه برگردیم",
        "singer": "سید رضا نریمانی",
        "soundFile": "https://mir1.kashoob.com/audio/202207/enc_16588838931580620064171.mp3",
        "imageFile": "https://cdnimg.kashoob.com/yeqbp1lZ7Kax_SDUWDPmABsQJBHnQxVtJHeX-ALQ0MA/wm:0.8:sowe:15:15:0.18/bG9jYWw6Ly8vc3RvcmFnZS9pbWFnZS8yMDIyMDcvMTY1ODg4MzkzMTkzMzg0MzYzODEyMzkuanBn.jpg"
      }
    ]
    this.svgs = {
      pause: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#ffffff" viewBox="0 0 256 256"><path d="M208,48V208a8,8,0,0,1-8,8H160a8,8,0,0,1-8-8V48a8,8,0,0,1,8-8h40A8,8,0,0,1,208,48ZM96,40H56a8,8,0,0,0-8,8V208a8,8,0,0,0,8,8H96a8,8,0,0,0,8-8V48A8,8,0,0,0,96,40Z" opacity="0.2"></path><path d="M200,32H160a16,16,0,0,0-16,16V208a16,16,0,0,0,16,16h40a16,16,0,0,0,16-16V48A16,16,0,0,0,200,32Zm0,176H160V48h40ZM96,32H56A16,16,0,0,0,40,48V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V48A16,16,0,0,0,96,32Zm0,176H56V48H96Z"></path></svg>',
      play: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#ffffff" viewBox="0 0 256 256"><path d="M228.23,134.69,84.15,222.81A8,8,0,0,1,72,216.12V39.88a8,8,0,0,1,12.15-6.69l144.08,88.12A7.82,7.82,0,0,1,228.23,134.69Z" opacity="0.2"></path><path d="M232.4,114.49,88.32,26.35a16,16,0,0,0-16.2-.3A15.86,15.86,0,0,0,64,39.87V216.13A15.94,15.94,0,0,0,80,232a16.07,16.07,0,0,0,8.36-2.35L232.4,141.51a15.81,15.81,0,0,0,0-27ZM80,215.94V40l143.83,88Z"></path></svg>',
      repeatAll: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#ffffff" viewBox="0 0 256 256"><path d="M224,64v64a64,64,0,0,1-64,64H32V128A64,64,0,0,1,96,64Z" opacity="0.2"></path><path d="M24,128A72.08,72.08,0,0,1,96,56H204.69L194.34,45.66a8,8,0,0,1,11.32-11.32l24,24a8,8,0,0,1,0,11.32l-24,24a8,8,0,0,1-11.32-11.32L204.69,72H96a56.06,56.06,0,0,0-56,56,8,8,0,0,1-16,0Zm200-8a8,8,0,0,0-8,8,56.06,56.06,0,0,1-56,56H51.31l10.35-10.34a8,8,0,0,0-11.32-11.32l-24,24a8,8,0,0,0,0,11.32l24,24a8,8,0,0,0,11.32-11.32L51.31,200H160a72.08,72.08,0,0,0,72-72A8,8,0,0,0,224,120Z"></path></svg>',
      repeatOnce: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#ffffff" viewBox="0 0 256 256"><path d="M224,64v64a64,64,0,0,1-64,64H32V128A64,64,0,0,1,96,64Z" opacity="0.2"></path><path d="M24,128A72.08,72.08,0,0,1,96,56H204.69L194.34,45.66a8,8,0,0,1,11.32-11.32l24,24a8,8,0,0,1,0,11.32l-24,24a8,8,0,0,1-11.32-11.32L204.69,72H96a56.06,56.06,0,0,0-56,56,8,8,0,0,1-16,0Zm200-8a8,8,0,0,0-8,8,56.06,56.06,0,0,1-56,56H51.31l10.35-10.34a8,8,0,0,0-11.32-11.32l-24,24a8,8,0,0,0,0,11.32l24,24a8,8,0,0,0,11.32-11.32L51.31,200H160a72.08,72.08,0,0,0,72-72A8,8,0,0,0,224,120Zm-88,40a8,8,0,0,0,8-8V104a8,8,0,0,0-11.58-7.16l-16,8a8,8,0,1,0,7.16,14.31l4.42-2.21V152A8,8,0,0,0,136,160Z"></path></svg>',
      shuffle: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#ffffff" viewBox="0 0 256 256"><path d="M107.14,98.8,128,128l-20.86,29.2A64,64,0,0,1,55.06,184H32V72H55.06A64,64,0,0,1,107.14,98.8ZM200.94,72a64,64,0,0,0-52.08,26.8L128,128l20.86,29.2A64,64,0,0,0,200.94,184H232V72Z" opacity="0.2"></path><path d="M237.66,178.34a8,8,0,0,1,0,11.32l-24,24a8,8,0,0,1-11.32-11.32L212.69,192H200.94a72.12,72.12,0,0,1-58.59-30.15l-41.72-58.4A56.1,56.1,0,0,0,55.06,80H32a8,8,0,0,1,0-16H55.06a72.12,72.12,0,0,1,58.59,30.15l41.72,58.4A56.1,56.1,0,0,0,200.94,176h11.75l-10.35-10.34a8,8,0,0,1,11.32-11.32ZM143,107a8,8,0,0,0,11.16-1.86l1.2-1.67A56.1,56.1,0,0,1,200.94,80h11.75L202.34,90.34a8,8,0,0,0,11.32,11.32l24-24a8,8,0,0,0,0-11.32l-24-24a8,8,0,0,0-11.32,11.32L212.69,64H200.94a72.12,72.12,0,0,0-58.59,30.15l-1.2,1.67A8,8,0,0,0,143,107Zm-30,42a8,8,0,0,0-11.16,1.86l-1.2,1.67A56.1,56.1,0,0,1,55.06,176H32a8,8,0,0,0,0,16H55.06a72.12,72.12,0,0,0,58.59-30.15l1.2-1.67A8,8,0,0,0,113,149Z"></path></svg>',
    }
  }
  init = () => {
    this.loadMusic(this.musicIndex)
    this.setListeners()
  }
  loadMusic = (id) => {
    this.musicName.textContent = this.musics[id].name
    this.musicSinger.textContent = this.musics[id].singer
    this.musicImage.src = this.musics[id].imageFile
    this.audio.src = this.musics[id].soundFile
    this.audio.load()

    this.dlBtn.setAttribute('href', this.musics[id].soundFile)
    this.nowPlaying.innerText = `در حال پخش ${this.musicIndex + 1} از ${this.musics.length}`
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
  nextMusic = () => {
    this.resetState()
    this.musicIndex = (this.musicIndex >= this.musics.length - 1) ? (0) : (this.musicIndex + 1);
    this.loadMusic(this.musicIndex)
    this.plause()
  }
  perviousMusic = () => {
    this.resetState()
    this.musicIndex = (this.musicIndex <= 0) ? (this.musics.length - 1) : (this.musicIndex - 1);
    this.loadMusic(this.musicIndex)
    this.plause()
  }
  resetState = () => {
    this.setTime(0)
    this.btnPlay.innerHTML = this.svgs.play
    if (!this.audio.paused) this.audio.pause()
    this.isPlaying = false
  }
  setListeners = () => {
    this.audio.addEventListener('ended', this.onMusicEnd)
    this.btnPlay.addEventListener('click', this.plause)
    this.btnNext.addEventListener('click', this.nextMusic)
    this.btnPervious.addEventListener('click', this.perviousMusic)
    this.volumeSlider.addEventListener('input', this.setVolume)
    this.timeSlider.addEventListener('input', this.setTime)
    this.repeatBtn.addEventListener('click', this.onRepeatBtnClick)
    this.soundBtn.addEventListener('click', this.onSoundBtnClick)
    setInterval(() => {
      if (!this.audio.paused) this.setTimeUI(this.calcCurrentPercentage())
    }, 1000)
    this.audio.addEventListener('loadeddata', () => {
      this.timeAll.innerText = this.secondsToTime(this.audio.duration)
    })
  }
  setSliderStyle = (value, elem) => {
    elem.style.background = `linear-gradient(to right, hsl(200, 100%, 50%) ${value}%, hsla(0, 0%, 0%, 0.5) 0%)`
  }
  secondsToTime = seconds => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)
    const minutesWithZero = minutes > 9 ? minutes : `0${minutes}`
    const remainingSecondsWithZero = remainingSeconds > 9 ? remainingSeconds : `0${remainingSeconds}`
    return `${minutesWithZero}:${remainingSecondsWithZero}`
  }
  decideNextAudio = () => {
    if (this.repeatBtnMode == "repeat-all") {
      this.nextMusicToPlay = ((this.musicIndex + 1) > this.musics.length - 1) ? 0 : (this.musicIndex + 1);
    }
    if (this.repeatBtnMode == "repeat-once") {
      this.nextMusicToPlay = this.musicIndex
    }
    if (this.repeatBtnMode == "shuffle") {
      let randomIndex = this.generateRandomIndex()
      while (randomIndex === this.musicIndex) randomIndex = this.generateRandomIndex()
      if (randomIndex !== this.musicIndex) this.nextMusicToPlay = randomIndex
    }
  }
  onRepeatBtnClick = () => {
    if (this.repeatBtnMode == "repeat-all") {
      this.repeatBtn.innerHTML = this.svgs.repeatOnce
      this.repeatBtnMode = "repeat-once"
    } 
    else if (this.repeatBtnMode == "repeat-once") {
      this.repeatBtn.innerHTML = this.svgs.shuffle
      this.repeatBtnMode = "shuffle"
    } 
    else if (this.repeatBtnMode == "shuffle") {
      this.repeatBtn.innerHTML = this.svgs.repeatAll
      this.repeatBtnMode = "repeat-all"
    }
    this.decideNextAudio()
  }
  onMusicEnd = () => {
    this.resetState()
    this.decideNextAudio()
    this.musicIndex = this.nextMusicToPlay
    this.loadMusic(this.nextMusicToPlay)
    this.plause()
  }
  onSoundBtnClick = () => {
    if (this.volumeSliderIsVisible) this.volumeSlider.style.display = 'block'
    if (!this.volumeSliderIsVisible) this.volumeSlider.style.display = 'none'
    this.volumeSliderIsVisible = !this.volumeSliderIsVisible
  }
  setVolume = () => {
    this.setVolumeUI(this.volumeSlider.value)
    this.setCurrentVolume(this.volumeSlider.value)
  }
  setCurrentVolume = (percentage) => {
    this.audio.volume = percentage / 100
  }
  setVolumeUI = (percentage) => {
    this.setSliderStyle(percentage, this.volumeSlider)
  }
  setTime = () => {
    this.setTimeUI(this.timeSlider.value)
    this.setCurrentTime(this.timeSlider.value)
  }
  setCurrentTime = (percentage) => {
    this.audio.currentTime = (this.audio.duration * (percentage / 100))
  }
  setTimeUI = (percentage) => {
    this.timeNow.innerText = this.secondsToTime(this.audio.currentTime)
    this.timeSlider.value = percentage
    this.setSliderStyle(percentage, this.timeSlider)
  }
  calcCurrentPercentage = () => Math.round((this.audio.currentTime / this.audio.duration) * 100)
  generateRandomIndex = () => Math.floor(Math.random() * (((this.musics.length - 1) - 0 + 1) + 0))
}

const player = new Player(document.querySelector('.player'))
player.init()