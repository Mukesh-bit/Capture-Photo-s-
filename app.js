const addPhoto = document.querySelector(".addPhotoBtn")
const video = document.querySelector("video")
const cameraIcon = document.querySelector(".cameraIcon")
const imagePreview = document.querySelector(".imagePreview")
const confirmPhotoBtn = document.querySelector(".confirmPhotoBtn")
const cancelPhotoBtn = document.querySelector(".cancelPhotoBtn")
const addPhotoWrapper = document.querySelector(".addPhotoWrapper")


addPhoto.addEventListener("click",async () => {
  
  try {
    const mediaStream =await navigator.mediaDevices.getUserMedia({video: {facingMode: "environment"}, audio: false})
    video.srcObject = mediaStream
    video.play()
    video.style.display = "block"

    video.onloadedmetadata = () => {
      cameraIcon.style.display = "block"
      addPhotoWrapper.style.display = "none"
    }
    
  } catch (error) {
      console.log(error)
  }
})

cameraIcon.addEventListener("click", () => {
  const canvas = document.createElement('canvas')
  canvas.width = video.videoWidth
  canvas.height = video.videoHeight

  const context = canvas.getContext('2d')
  context.drawImage(video,0,0,canvas.width,canvas.height)

  const dataUrl = canvas.toDataURL('image/png')

  imagePreview.setAttribute('src', dataUrl)

  confirmPhotoBtn.style.display = "block"
  cancelPhotoBtn.style.display = "block"
  imagePreview.style.display = "block"

  video.style.display = "none"
  cameraIcon.style.display = "none"
})  


cancelPhotoBtn.addEventListener("click", () => {
  confirmPhotoBtn.style.display = "none"
  cancelPhotoBtn.style.display = "none"
  imagePreview.style.display = "none"

  video.style.display = "block"
  cameraIcon.style.display = "block"
})


confirmPhotoBtn.addEventListener("click", () => {
  const toBeSubmitedPhoto = document.createElement("img")
  toBeSubmitedPhoto.setAttribute('src', imagePreview.getAttribute("src"))
  toBeSubmitedPhoto.className = "submitPhoto"
  addPhotoWrapper.insertBefore(toBeSubmitedPhoto,addPhoto)

  addPhotoWrapper.style.display = "block"

  confirmPhotoBtn.style.display = "none"
  cancelPhotoBtn.style.display = "none"
  imagePreview.style.display = "none"

  stopStreamedVideo()
})


function stopStreamedVideo() {
  const stream = video.srcObject;
  const tracks = stream.getTracks();

  tracks.forEach((track) => {
    track.stop();
  });

  video.srcObject = null;
}
