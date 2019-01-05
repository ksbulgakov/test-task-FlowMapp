import showMessage from './lib/showMessage';
import isValid from './lib/isValid';
import Canvas from './entities/Canvas';
import CanvasPreview from './entities/CanvasPreview';
import Frame from './entities/Frame';
import ImageObj from './entities/ImageObj';


export default (maxW = 300, maxH = 300) => event => new Promise((resolve) => {
  const file = event.target.files[0];

  if (!isValid(file)) {
    return;
  }

  const reader = new FileReader();
  reader.addEventListener('load', (e) => {
    resolve(e);
  });
  reader.addEventListener('error', (e) => {
    showMessage(e.target.error.message);
  });
  reader.readAsDataURL(file);
})
  .then(e => new Promise((resolve) => {
    const imageEl = document.createElement('img');

    imageEl.addEventListener('load', () => {
      if (imageEl.naturalHeight > maxH || imageEl.naturalWidth > maxW) {
        const messageText = `Maximum image height is ${maxH}px.
          \nAnd maximum width is ${maxW}px`;
        showMessage(messageText);
        return;
      }
      resolve(imageEl);
    });

    imageEl.src = e.target.result;
  }))
  .then(imageEl => new Promise((resolve) => {
    const canvasElement = document.getElementById('canvas');
    const previewEl = document.getElementById('canvas-preview');
    const cropeButton = document.getElementById('crope-button');
    const saveButton = document.getElementById('save-button');

    const baseCanvasWidth = 600;
    const basePreWidth = 300;
    const backgroundColor = '#C7E6ED';
    const frameHeight = 300;
    const framewidth = 300;
    const frameColor = 'white';

    const image = new ImageObj(imageEl);
    const frame = new Frame(frameColor, framewidth, frameHeight);
    const canvas = new Canvas(canvasElement, image, frame, baseCanvasWidth, backgroundColor);
    const canvasPreview =
      new CanvasPreview(previewEl, image, frame, basePreWidth, backgroundColor, canvasElement);

    canvas.drawImage();
    canvas.drawFrame();
    canvas.addScaleEvent('wheel');
    canvas.addDragFrameEvent('mousedown');
    canvas.addCursorFrameEvent('mousemove');
    canvasPreview.drawImage();
    canvasPreview.addCropeEvent('mousedown', cropeButton);

    showMessage('Scale and crope your image.');
    saveButton.addEventListener('click', () => {
      previewEl.toBlob(resolve, 'image/png', '1');
    });
  })) // then(blob => console.log('blob', blob))
  .catch(error => showMessage(error.message));
