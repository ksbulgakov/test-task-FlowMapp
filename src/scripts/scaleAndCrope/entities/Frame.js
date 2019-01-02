const isInCaret = (caret, coordinates) => {
  if (caret[0] < coordinates.x && coordinates.x < caret[0] + caret[2]
    && caret[1] < coordinates.y && coordinates.y < caret[1] + caret[3]) {
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
    this.caretWidth = 10;
    this.caretHeight = 10;
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

  get leftTopCaretArguments() {
    return [
      this.x - (this.caretWidth / 2),
      this.y - (this.caretHeight / 2),
      this.caretWidth,
      this.caretHeight,
    ];
  }

  get rightTopCaretArguments() {
    return [
      (this.x + this.width) - (this.caretWidth / 2),
      this.y - (this.caretHeight / 2),
      this.caretWidth,
      this.caretHeight,
    ];
  }

  get rightBottomCaretArguments() {
    return [
      (this.x + this.width) - (this.caretWidth / 2),
      (this.y + this.height) - (this.caretHeight / 2),
      this.caretWidth,
      this.caretHeight,
    ];
  }

  get leftBottomCaretArguments() {
    return [
      this.x - (this.caretWidth / 2),
      (this.y + this.height) - (this.caretHeight / 2),
      this.caretWidth,
      this.caretHeight,
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

  isInLeftTopCaret(coordinates) {
    return isInCaret(this.leftTopCaretArguments, coordinates);
  }

  isInRightTopCaret(coordinates) {
    return isInCaret(this.rightTopCaretArguments, coordinates);
  }

  isInRightBottomCaret(coordinates) {
    return isInCaret(this.rightBottomCaretArguments, coordinates);
  }

  isInLeftBottomCaret(coordinates) {
    return isInCaret(this.leftBottomCaretArguments, coordinates);
  }

  changeWidth(delta) {
    this.width += delta;
  }

  changeHeight(delta) {
    this.height += delta;
  }
}
