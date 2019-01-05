export default class ImageObj {
  constructor(element) {
    this.element = element;
    this.sx = 0;
    this.sy = 0;
    this.width = element.width;
    this.height = element.height;
    this.dx = 0;
    this.dy = 0;
    this.scaleDiff = 0;
  }

  get drawArguments() {
    const drawArguments = [
      this.element,
      this.sx,
      this.sy,
      this.width,
      this.height,
      this.dx,
      this.dy,
    ];
    return drawArguments;
  }

  scale(event) {
    const scaleSpeed = 2;
    this.scaleDiff = scaleSpeed * event.deltaY;
    this.sx -= this.scaleDiff;
    this.sy -= this.scaleDiff;
    this.width += 2 * this.scaleDiff;
    this.height += 2 * this.scaleDiff;
  }

  get imageProportions() {
    return this.height / this.width;
  }

  set coordinates(coordinates) {
    this.dx = coordinates.x;
    this.dy = coordinates.y;
  }
}
