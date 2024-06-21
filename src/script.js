
//   // Import the necessary Camera Kit modules.
// import {
//   bootstrapCameraKit,
//   CameraKitSession,
//   createMediaStreamSource,
//   Transform2D,
//   Lens,
// } from '@snap/camera-kit';

// let mediaStream;
// const  fps =60;
// let deviceId;
// let cameras;
// let cameraSelect; 
// let devices;
// let cameraSelectSelectedIndex=1; 
// const apiToken ='eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNzE4MzAxNTc0LCJzdWIiOiIyMzBhNmYzMC1mNzg2LTRjYzAtOTFjZS04Mzc0OGM0OTQzZGZ-U1RBR0lOR345ODJmNDBmMi0wMTVjLTRkZGItOTJlYy1mYzk1NDQ3MjZiY2QifQ.BkamWEBU6PxFdKsNEAQnAihzzkqgpgS6E4NUQSvAAV0';
// const  lensGroupID = '54483818-148b-4e5c-8541-27bd4b1a6984'; 
// let facingMode = 'environment';

// const liveRenderTarget = document.getElementById('canvas');
// let flipCamera = document.getElementById('flip');
// let isBackFacing = true;

  // Create an async function to initialize Camera Kit and start the video stream.
  //  async function  init() {
  //   console.log('Este es');
  //       // Bootstrap Camera Kit using your API token.
  //       const cameraKit = await bootstrapCameraKit({ apiToken });
  //       const { lenses } = await cameraKit.lensRepository.loadLensGroups([lensGroupID]);
  //       const session = await cameraKit.createSession();
        
  //       session.applyLens(lenses[0]);
  //       await setCameraKitSource(session);

  //       attachCamerasToSelect(session);
  //       attachLensesToSelect(lenses, session);

  //       session.events.addEventListener('error', (event) => {
  //         if (event.detail.error.name === 'LensExecutionError') {
  //           console.log('The current Lens encountered an error and was removed.', event.detail.error);
  //         }
  //       });

  //       // Create a new CameraKit session.
  //       await session.setFPSLimit(fps);
  //       // Replace the `canvas` element with the live output from the CameraKit session.
  //       document.getElementById('canvas').replaceWith(session.output.live);
  //       cameraSelect = document.getElementById('cameras');

  //       cameraSelect.addEventListener('change', (event) => {
  //       deviceId = event.target.selectedOptions[0].value;
  //       setCameraKitSource(session, deviceId);
  //     });

  //       mediaStream = await navigator.mediaDevices.getUserMedia({ video: { deviceId }, video: {  facingMode: 'environment' } });
  //       const source = createMediaStreamSource(mediaStream, {
  //       // NOTE: This is important for world facing experiences
  //       cameraType: 'back',
  //     });
          
  //     // Set the source of the CameraKit session.
  //     await session.setSource(source);
  //     // Set the render size of the CameraKit session to the size of the browser window.
  //     session.source.setRenderSize( window.innerWidth,  window.innerHeight); 
  //     // Start the CameraKit session.
  //     session.play();
  //     console.log('Lens rendering has started!');
  // }


  //setar camara del combo

  // async function setCameraKitSource(session, deviceId) {
  //   if (mediaStream) {
  //     session.pause();
  //     mediaStream.getVideoTracks()[0].stop();
  //   }
  
  //   cameraSelect = document.getElementById('cameras');
  //   cameraSelectSelectedIndex = cameraSelect.selectedIndex;
  //   console.log(cameraSelectSelectedIndex);
  
  //   if (cameraSelectSelectedIndex === 0) {
  //     facingMode = 'user';
  //   }
  //   else{
  //     facingMode = 'environment';
  //   }
  
  //   mediaStream = await navigator.mediaDevices.getUserMedia({
  //     video: { deviceId, facingMode }
  //   });
  
  //   const source = createMediaStreamSource(mediaStream, {
  //     // NOTE: This is important for world facing experiences
  //     cameraType: 'back',
  //   });
  
  //   console.log(mediaStream);
  //   await session.setSource(source);
  //   await session.setFPSLimit(fps);
  //   session.source.setRenderSize(window.innerWidth, window.innerHeight);
  //   session.play();
  
  //   console.log('*---*');
  // }
  
// //Llena el combo de camaras
// async function attachCamerasToSelect(session) {
//   cameraSelect = document.getElementById('cameras');
//   devices = await navigator.mediaDevices.enumerateDevices();
//   cameras = devices.filter(({ kind }) => kind === 'videoinput');

//   cameras.forEach((camera) => {
//     const option = document.createElement('option');
//     option.value = camera.deviceId;
//     option.text = camera.label;
//     cameraSelect.appendChild(option);
//   });

//   cameraSelect.addEventListener('change', (event) => {
//     deviceId = event.target.selectedOptions[0].value;
//     setCameraKitSource(session, deviceId);
//   });
// }

//Llena el combo de lentes
// async function attachLensesToSelect(lenses, session) {
//   const lensSelect = document.getElementById('lenses');

//   lenses.forEach((lens) => {
//     const option = document.createElement('option');
//     option.value = lens.id;
//     option.text = lens.name;
//     lensSelect.appendChild(option);
//   });

//   lensSelect.addEventListener('change', (event) => {
//     const lensId = event.target.selectedOptions[0].value;
//     const lens = lenses.find((lens) => lens.id === lensId);
//     if (lens) 
//       session.applyLens(lens);
//   });
// }

//init();