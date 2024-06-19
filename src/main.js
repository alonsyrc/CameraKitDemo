// Import the necessary Camera Kit modules.
import {
  bootstrapCameraKit,
  createMediaStreamSource,
} from '@snap/camera-kit';

  
  // Create an async function to initialize Camera Kit and start the video stream.
  (async function() {
    console.log('AAAAA')
    const apiToken ='eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNzE4MzAxNTc0LCJzdWIiOiIyMzBhNmYzMC1mNzg2LTRjYzAtOTFjZS04Mzc0OGM0OTQzZGZ-U1RBR0lOR345ODJmNDBmMi0wMTVjLTRkZGItOTJlYy1mYzk1NDQ3MjZiY2QifQ.BkamWEBU6PxFdKsNEAQnAihzzkqgpgS6E4NUQSvAAV0';
    //const apiToken ='eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNzE4NjQyNDI3LCJzdWIiOiIyMzBhNmYzMC1mNzg2LTRjYzAtOTFjZS04Mzc0OGM0OTQzZGZ-UFJPRFVDVElPTn5hMTVhN2YyNy01ZjljLTRhNTEtOGU3Ni1kZjVkZDlmZDUyODIifQ.3pnEQ83BII02c_dH5q7PL44B3q-6KFGN_32oo-QzaU4';
    const  lensGroupID = '54483818-148b-4e5c-8541-27bd4b1a6984'; 
    //const  lensID ='b7ca6439-bb34-4d23-8c27-4ad198750a62'; //Gorra
    //const  lensID ='15c3a4d1-47cd-4acb-883f-6622cfa5fd3b'; //Calaca
    const  lensID = '53f72501-35a8-444c-ad46-d8d611631f5b'; //Patas
    const  fps =60;
 
    console.log('Este es');
        // Bootstrap Camera Kit using your API token.
        const cameraKit = await bootstrapCameraKit({ apiToken });

        // Let Camera Kit create a new canvas, then append it to the DOM
        const canvas = document.getElementById('canvas');
        const session = await cameraKit.createSession();
        canvas.appendChild(session.output.live);


        session.events.addEventListener('error', (event) => {
          if (event.detail.error.name === 'LensExecutionError') {
            console.log(
              'The current Lens encountered an error and was removed.',
              event.detail.error
            );
          }
        });

        // Create a new CameraKit session.
        await session.setFPSLimit(fps);
        // Replace the `canvas` element with the live output from the CameraKit session.
        document.getElementById('canvas').replaceWith(session.output.live);

        const  lens  = await cameraKit.lensRepository.loadLens(lensID, lensGroupID);
        // Apply the first lens in the lens group to the CameraKit session.
        session.applyLens(lens);
       // Get the user's media stream.
       let mediaStream  = await navigator.mediaDevices.getUserMedia({ video: {
        facingMode: 'environment', 
       },
      });

      const source = createMediaStreamSource(mediaStream, {
        // NOTE: This is important for world facing experiences
        cameraType: 'back',
      });
          
      // Set the source of the CameraKit session.
      await session.setSource(source);
      // Set the render size of the CameraKit session to the size of the browser window.
      session.source.setRenderSize( window.innerWidth,  window.innerHeight); 
      // Start the CameraKit session.
      session.play();
      console.log('Lens rendering has started!');
  })();