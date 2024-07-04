// Import the necessary Camera Kit modules.
import {
  bootstrapCameraKit,
  createMediaStreamSource,
} from '@snap/camera-kit';

let mediaStream;
const fps = 60;
const apiToken = 'eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNzE4MzAxNTc0LCJzdWIiOiIyMzBhNmYzMC1mNzg2LTRjYzAtOTFjZS04Mzc0OGM0OTQzZGZ-U1RBR0lOR345ODJmNDBmMi0wMTVjLTRkZGItOTJlYy1mYzk1NDQ3MjZiY2QifQ.BkamWEBU6PxFdKsNEAQnAihzzkqgpgS6E4NUQSvAAV0';
const lensGroupID = '54483818-148b-4e5c-8541-27bd4b1a6984';
const liveRenderTarget = document.getElementById('canvas');
let flipCamera = document.getElementById('flip');
let isBackFacing = false;

const videoTarget = document.getElementById('video');
let mediaRecorder;
let downloadUrl;
let recordedChunks = [];

async function init() {
  const cameraKit = await bootstrapCameraKit({ apiToken: apiToken });
  const session = await cameraKit.createSession({ liveRenderTarget });
  const { lenses } = await cameraKit.lensRepository.loadLensGroups([lensGroupID]);
  session.applyLens(lenses[0]);
  bindFlipCamera(session);
  // bindRecorder();
  //ttachLensesToSelect(lenses, session);
  attachLensesToButtons(lenses, session);
  document.getElementById('canvas').replaceWith(session.output.live);
  await session.setFPSLimit(fps);
}

function bindFlipCamera(session) {
  flipCamera = document.getElementById('flip');
  flipCamera.style.cursor = 'pointer';
  flipCamera.addEventListener('click', () => { updateCamera(session); });
  updateCamera(session);
}

async function updateCamera(session) {
  isBackFacing = !isBackFacing;
  flipCamera.innerText = isBackFacing ? 'Switch to Front Camera' : 'Switch to Back Camera';

  if (mediaStream) {
    session.pause();
    mediaStream.getVideoTracks()[0].stop();
  }

  mediaStream = await navigator.mediaDevices.getUserMedia({
    video: {
      facingMode: isBackFacing ? 'environment' : 'user',
    },
  });

  // NOTE: This is important for world facing experiences
  const source = createMediaStreamSource(mediaStream, { cameraType: 'back' });

  await session.setSource(source);
  session.source.setRenderSize(window.innerWidth, window.innerHeight);
  session.play();
}

// Fill the lens dropdown
async function attachLensesToSelect(lenses, session) {
  const lensSelect = document.getElementById('lenses');

  lenses.forEach((lens) => {
    const option = document.createElement('option');
    option.value = lens.id;
    option.text = lens.name;
    lensSelect.appendChild(option);
  });

  lensSelect.addEventListener('change', (event) => {
    const lensId = event.target.selectedOptions[0].value;
    const lens = lenses.find((lens) => lens.id === lensId);
    if (lens)
      session.applyLens(lens);
  });
}

async function attachLensesToButtons(lenses, session) {
  const lensButtonsContainer = document.getElementById('lens-buttons-container');
  
  lenses.forEach((lens, index) => {
    const button = document.createElement('button');
    button.className = 'lens-button';
    if (index === 0) {
      button.classList.add('active');
    }
    const img = document.createElement('img');
    img.src = lens.thumbnail; // Asumiendo que cada lente tiene una miniatura
    img.alt = lens.name;
    button.appendChild(img);
    button.addEventListener('click', () => {
      document.querySelectorAll('.lens-button').forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      const selectedLens = lenses.find((l) => l.id === lens.id);
      if (selectedLens) {
        session.applyLens(selectedLens);
      }
    });
    lensButtonsContainer.appendChild(button);
  });

  // Aplica el primer lente automáticamente al cargar la página
  if (lenses.length > 0) {
    session.applyLens(lenses[0]);
  }
}


const session = {
  applyLens: (lens) => {
    console.log('Aplicando lente:', lens);
    // Aquí iría el código para aplicar el lente en la sesión real
  }
};

// function bindRecorder() {
//   const startRecordingButton = document.getElementById('start');
//   const stopRecordingButton = document.getElementById('stop');
//   const downloadButton = document.getElementById('download');
//   const videoContainer = document.getElementById('video-container');
//   const liveRenderTarget = document.getElementById('canvas');
//   const videoTarget = document.getElementById('video');

//   startRecordingButton.addEventListener('click', () => {
//     startRecordingButton.disabled = true;
//     stopRecordingButton.disabled = false;
//     downloadButton.disabled = true;
//     videoContainer.style.display = 'none';

//     const mediaStream = liveRenderTarget.captureStream(fps);
//     recordedChunks = [];

//     try {
//       mediaRecorder = new MediaRecorder(mediaStream, { mimeType: 'video/webm; codecs=vp8' });
//     } catch (e) {
//       console.error('Exception while creating MediaRecorder:', e);
//       return;
//     }

//     console.log('Created MediaRecorder', mediaRecorder, 'with options', { mimeType: 'video/webm; codecs=vp8' });

//     mediaRecorder.ondataavailable = handleDataAvailable;
//     mediaRecorder.onstop = handleStop;

//     mediaRecorder.start(100); // Collect 100ms chunks
//     console.log('MediaRecorder started', mediaRecorder);
//   });

//   stopRecordingButton.addEventListener('click', () => {
//     startRecordingButton.disabled = false;
//     stopRecordingButton.disabled = true;

//     mediaRecorder?.stop();
//   });

//   downloadButton.addEventListener('click', () => {
//     const link = document.createElement('a');

//     link.setAttribute('style', 'display: none');
//     link.href = downloadUrl;
//     link.download = 'camera-kit-web-recording.webm';
//     link.click();
//     link.remove();
//   });
// }

// function handleDataAvailable(event) {
//   console.log('Data available:', event);
//   console.log(event.data.size);
//   if (event.data.size > 0) {
//     console.log('Data size is greater than 0');
//     recordedChunks.push(event.data);
//   }
// }

// function handleStop() {
//   console.log('Recording stopped');
//   const blob = new Blob(recordedChunks, { type: 'video/webm' });
//   downloadUrl = window.URL.createObjectURL(blob);
//   const downloadButton = document.getElementById('download');
//   downloadButton.disabled = false;

//   const videoTarget = document.getElementById('video');
//   videoTarget.src = downloadUrl;

//   const videoContainer = document.getElementById('video-container');
//   videoContainer.style.display = 'block';
//   console.log('Blob size:', blob.size);
// }

init();
