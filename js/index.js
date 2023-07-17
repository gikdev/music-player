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
        "name": "نماهنگ علمداره آقا سپهداره",
        "singer": "حسن عطایی",
        "soundFile": "https://mir1.kashoob.com/audio/202307/enc_16892434062745120088309.mp3",
        "imageFile": "https://cdnimg.kashoob.com/m_uqba7iXbg2gIBlriuZkEoIIofd0rQgcTRHiiLk1xs/wm:0.8:sowe:15:15:0.18/bG9jYWw6Ly8vc3RvcmFnZS9pbWFnZS8yMDIzMDcvMTY4OTI0Mjg5NjE5MTY1MDUyOTE0NzUuanBn.jpg"
      }
    ]
    this.svgs = {
      pause: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256"><path fill="currentColor" d="M216 48v160a16 16 0 0 1-16 16h-40a16 16 0 0 1-16-16V48a16 16 0 0 1 16-16h40a16 16 0 0 1 16 16ZM96 32H56a16 16 0 0 0-16 16v160a16 16 0 0 0 16 16h40a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16Z"/></svg>',
      play: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256"><path fill="currentColor" d="M240 128a15.74 15.74 0 0 1-7.6 13.51L88.32 229.65a16 16 0 0 1-16.2.3A15.86 15.86 0 0 1 64 216.13V39.87a15.86 15.86 0 0 1 8.12-13.82a16 16 0 0 1 16.2.3l144.08 88.14A15.74 15.74 0 0 1 240 128Z"/></svg>',
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
    this.audio.addEventListener('ended', this.nextMusic)
    this.btnPlay.addEventListener('click', this.plause)
    this.btnNext.addEventListener('click', this.nextMusic)
    this.btnPervious.addEventListener('click', this.perviousMusic)
    this.volumeSlider.addEventListener('input', this.setVolume)
    this.timeSlider.addEventListener('input', this.setTime)
    setInterval(() => {
      if (!this.audio.paused) this.setTimeUI(this.calcCurrentPercentage())
    }, 1000)
  }
  setSliderStyle = (value, elem) => {
    elem.style.background = `linear-gradient(to right, hsl(200, 100%, 50%) ${value}%, hsla(0, 0%, 0%, 0.5) 0%)`
  }

  setVolume = () => {
    this.setVolumeUI(this.volumeSlider.value)
    this.setCurrentVolume(this.volumeSlider.value)
  }
  setCurrentVolume = (percentage) => {
    this.audio.volume = percentage / 100
  }
  setVolumeUI = (percentage) => {
    this.volumeSlider.setAttribute('value', percentage)
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
    this.timeSlider.setAttribute('value', percentage)
    this.timeSlider.value = percentage
    this.setSliderStyle(percentage, this.timeSlider)
  }
  calcCurrentPercentage = () => Math.round((this.audio.currentTime / this.audio.duration) * 100)
}

const player = new Player(document.querySelector('.player'))
player.init()
