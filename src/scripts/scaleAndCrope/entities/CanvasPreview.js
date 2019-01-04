import Canvas from './Canvas';

export default class CanvasPreview extends Canvas {
  constructor(element, image, frame, baseWidth, fillStyle, mainCanvasEl) {
    super(element, image, frame, baseWidth, fillStyle);
    this.mainCanvasEl = mainCanvasEl;
    this.shift = 1;
  }

  addCropeEvent(eventType, button) {
    button.addEventListener(eventType, (event) => {
      this.drawPreview(event);
    });
  }

  drawPreview() {
    this.ctx.fillStyle = this.fillStyle;
    this.ctx.fillRect(0, 0, this.element.width, this.element.height);
    const dx = 0;
    const dy = 0;
    this.element.width = this.frame.width;
    this.element.height = this.frame.height;
    this.ctx.drawImage(
      this.mainCanvasEl,
      this.frame.x + this.shift, this.frame.y + this.shift,
      this.frame.width - (2 * this.shift), this.frame.height - (2 * this.shift),
      dx, dy,
      this.element.width, this.element.height,
    );
  }
}
