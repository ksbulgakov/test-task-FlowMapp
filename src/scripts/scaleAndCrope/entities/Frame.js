const isInHandle = (handle, coordinates) => {
  if (handle[0] < coordinates.x && coordinates.x < handle[0] + handle[2]
    && handle[1] < coordinates.y && coordinates.y < handle[1] + handle[3]) {
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
      this.x - (this.handleWidth / 2),
      this.y - (this.handleHeight / 2),
      this.handleWidth,
      this.handleHeight,
    ];
  }

  get rightTopHandleArguments() {
    return [
      (this.x + this.width) - (this.handleWidth / 2),
      this.y - (this.handleHeight / 2),
      this.handleWidth,
      this.handleHeight,
    ];
  }

  get rightBottomHandleArguments() {
    return [
      (this.x + this.width) - (this.handleWidth / 2),
      (this.y + this.height) - (this.handleHeight / 2),
      this.handleWidth,
      this.handleHeight,
    ];
  }

  get leftBottomHandleArguments() {
    return [
      this.x - (this.handleWidth / 2),
      (this.y + this.height) - (this.handleHeight / 2),
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

  isInLeftTopHandle(coordinates) {
    return isInHandle(this.leftTopHandleArguments, coordinates);
  }

  isInRightTopHandle(coordinates) {
    return isInHandle(this.rightTopHandleArguments, coordinates);
  }

  isInRightBottomHandle(coordinates) {
    return isInHandle(this.rightBottomHandleArguments, coordinates);
  }

  isInLeftBottomHandle(coordinates) {
    return isInHandle(this.leftBottomHandleArguments, coordinates);
  }

  changeWidth(delta) {
    this.width += delta;
  }

  changeHeight(delta) {
    this.height += delta;
  }
}
