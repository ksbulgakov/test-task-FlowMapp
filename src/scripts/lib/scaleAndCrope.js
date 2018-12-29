import showMessage from './showMessage';
import Canvas from '../entities/Canvas';
import CanvasPreview from '../entities/CanvasPreview';
import Frame from '../entities/Frame';
import ImageObj from '../entities/ImageObj';

export default (maxW = 300, maxH = 300) => event => new Promise((resolve) => {
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
  imageEl.src = event.target.result;
})
  .then(imageEl => new Promise((resolve) => {
    const canvasElement = document.getElementById('canvas');
    const previewEl = document.getElementById('canvas-preview');
    const cropeButton = document.getElementById('crope-button');
    const saveButton = document.getElementById('save-button');

    const baseCanvasWidth = 600;
    const basePreWidth = 300;
    const backgroundColor = '#CCB7A6';
    const frameHeight = 300;
    const framewidth = 300;
    const frameColor = 'black';

    const image = new ImageObj(imageEl);
    const frame = new Frame(frameColor, framewidth, frameHeight);
    const canvas = new Canvas(canvasElement, image, frame, baseCanvasWidth, backgroundColor);
    const canvasPreview =
      new CanvasPreview(previewEl, image, frame, basePreWidth, backgroundColor, canvasElement);

    canvas.drawImage();
    canvas.drawFrame();
    canvas.addScaleEvent('wheel');
    canvas.addDragCaretsEvent('mousedown');
    canvas.addCursorCaretsEvent('mousemove');
    canvasPreview.drawImage();
    canvasPreview.addCropeEvent('mousedown', cropeButton);

    showMessage('Scale and crope your image.');
    saveButton.addEventListener('click', () => {
      previewEl.toBlob(resolve, 'image/png', '1');
    });
  })) // .then(blob => console.log(blob))
  .catch(error => showMessage(error.message));
