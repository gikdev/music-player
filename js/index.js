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
    this.timeNow = player.querySelector('#time-now');
    this.timeAll = player.querySelector('#time-all');

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
        "name": "نماهنگ به خونه برگردیم",
        "singer": "سید رضا نریمانی",
        "soundFile": "https://mir1.kashoob.com/audio/202207/enc_16588838931580620064171.mp3",
        "imageFile": "https://cdnimg.kashoob.com/yeqbp1lZ7Kax_SDUWDPmABsQJBHnQxVtJHeX-ALQ0MA/wm:0.8:sowe:15:15:0.18/bG9jYWw6Ly8vc3RvcmFnZS9pbWFnZS8yMDIyMDcvMTY1ODg4MzkzMTkzMzg0MzYzODEyMzkuanBn.jpg"
      }
    ]
    this.svgs = {
      pause: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#ffffff" viewBox="0 0 256 256"><path d="M208,48V208a8,8,0,0,1-8,8H160a8,8,0,0,1-8-8V48a8,8,0,0,1,8-8h40A8,8,0,0,1,208,48ZM96,40H56a8,8,0,0,0-8,8V208a8,8,0,0,0,8,8H96a8,8,0,0,0,8-8V48A8,8,0,0,0,96,40Z" opacity="0.2"></path><path d="M200,32H160a16,16,0,0,0-16,16V208a16,16,0,0,0,16,16h40a16,16,0,0,0,16-16V48A16,16,0,0,0,200,32Zm0,176H160V48h40ZM96,32H56A16,16,0,0,0,40,48V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V48A16,16,0,0,0,96,32Zm0,176H56V48H96Z"></path></svg>',
      play: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#ffffff" viewBox="0 0 256 256"><path d="M228.23,134.69,84.15,222.81A8,8,0,0,1,72,216.12V39.88a8,8,0,0,1,12.15-6.69l144.08,88.12A7.82,7.82,0,0,1,228.23,134.69Z" opacity="0.2"></path><path d="M232.4,114.49,88.32,26.35a16,16,0,0,0-16.2-.3A15.86,15.86,0,0,0,64,39.87V216.13A15.94,15.94,0,0,0,80,232a16.07,16.07,0,0,0,8.36-2.35L232.4,141.51a15.81,15.81,0,0,0,0-27ZM80,215.94V40l143.83,88Z"></path></svg>',
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
}

const player = new Player(document.querySelector('.player'))
player.init()