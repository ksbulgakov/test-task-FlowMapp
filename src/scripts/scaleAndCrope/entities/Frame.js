const isInRectangle = (rectangle, coordinates) => {
  if (rectangle[0] < coordinates.x && coordinates.x < rectangle[0] + rectangle[2]
    && rectangle[1] < coordinates.y && coordinates.y < rectangle[1] + rectangle[3]) {
    return true;
  }
  return false;
};


export default class Frame {
  constructor(color, width, height) {
    this.x = 100;
    this.y = 100;
    this.color = color;
    this.width = width;
    this.height = height;
    this.minWidth = 50;
    this.minHeight = 50;
    this.handleWidth = 10;
    this.handleHeight = 10;
  }

  get drawFrameArguments() {
    const drawArguments = [
      this.x,
      this.y,
      this.width,
      this.height,
    ];
    return drawArguments;
  }

  get leftTopHandleArguments() {
    return [
      this.x - this.handleWidth,
      this.y - this.handleHeight,
      this.handleWidth,
      this.handleHeight,
    ];
  }

  get rightTopHandleArguments() {
    return [
      this.x + this.width,
      this.y - this.handleHeight,
      this.handleWidth,
      this.handleHeight,
    ];
  }

  get rightBottomHandleArguments() {
    return [
      this.x + this.width,
      this.y + this.height,
      this.handleWidth,
      this.handleHeight,
    ];
  }

  get leftBottomHandleArguments() {
    return [
      this.x - this.handleWidth,
      this.y + this.height,
      this.handleWidth,
      this.handleHeight,
    ];
  }

  set leftTopConer(properties) {
    this.x = properties.x;
    this.y = properties.y;
    this.width = properties.width;
    this.height = properties.height;
  }

  set rightTopConer(properties) {
    this.y = properties.y;
    this.width = properties.width;
    this.height = properties.height;
  }

  set rightBottomConer(properties) {
    this.width = properties.width;
    this.height = properties.height;
  }

  set leftBottomConer(properties) {
    this.x = properties.x;
    this.width = properties.width;
    this.height = properties.height;
  }

  get coordinates() {
    return { x: this.x, y: this.y };
  }

  set coordinates(coordinates) {
    this.x = coordinates.x;
    this.y = coordinates.y;
  }

  isInFrame(coordinates) {
    return isInRectangle(this.drawFrameArguments, coordinates);
  }

  isInLeftTopHandle(coordinates) {
    return isInRectangle(this.leftTopHandleArguments, coordinates);
  }

  isInRightTopHandle(coordinates) {
    return isInRectangle(this.rightTopHandleArguments, coordinates);
  }

  isInRightBottomHandle(coordinates) {
    return isInRectangle(this.rightBottomHandleArguments, coordinates);
  }

  isInLeftBottomHandle(coordinates) {
    return isInRectangle(this.leftBottomHandleArguments, coordinates);
  }

  changeWidth(delta) {
    this.width += delta;
  }

  changeHeight(delta) {
    this.height += delta;
  }
}
