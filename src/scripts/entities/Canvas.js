export default class Canvas {
  constructor(element, image, frame, baseWidth, fillStyle) {
    this.element = element;
    this.image = image;
    this.frame = frame;
    this.ctx = this.element.getContext('2d');
    this.fillStyle = fillStyle;
    this.ctx.strokeStyle = this.frame.color;
    this.element.width = baseWidth;
    this.element.height = this.element.width * this.image.imageProportions;
  }

  addScaleEvent(eventType) {
    this.element.addEventListener(eventType, (event) => {
      this.scaleImage(event);
    });
  }

  addCursorCaretsEvent(eventType) {
    this.element.addEventListener(eventType, (event) => {
      const coordinates = this.countCoordinates(event);

      if (this.frame.isInLeftTopCaret(coordinates)) {
        this.element.style.cursor = 'move';
        return;
      }
      if (this.frame.isInRightTopCaret(coordinates)) {
        this.element.style.cursor = 'move';
        return;
      }

      if (this.frame.isInRightBottomCaret(coordinates)) {
        this.element.style.cursor = 'move';
        return;
      }

      if (this.frame.isInLeftBottomCaret(coordinates)) {
        this.element.style.cursor = 'move';
        return;
      }

      this.element.style.cursor = 'default';
    });
  }

  addDragCaretsEvent(eventType) {
    const moves = {
      leftTop: this.moveLeftTopCater.bind(this),
      rightTop: this.moveRightTopCater.bind(this),
      rightBottom: this.moveRightBottomCater.bind(this),
      leftBottom: this.moveLeftBottomCater.bind(this),
    };

    this.element.addEventListener(eventType, (event) => {
      const coordinates = this.countCoordinates(event);

      if (this.frame.isInLeftTopCaret(coordinates)) {
        this.element.addEventListener('mousemove', moves.leftTop);
      }

      if (this.frame.isInRightTopCaret(coordinates)) {
        this.element.addEventListener('mousemove', moves.rightTop);
      }

      if (this.frame.isInRightBottomCaret(coordinates)) {
        this.element.addEventListener('mousemove', moves.rightBottom);
      }

      if (this.frame.isInLeftBottomCaret(coordinates)) {
        this.element.addEventListener('mousemove', moves.leftBottom);
      }
    });

    Object.values(moves).forEach((move) => {
      document.addEventListener('mouseup', () => {
        this.element.removeEventListener('mousemove', move);
      });
    });
  }

  moveLeftTopCater(event) {
    const { x, y } = this.countCoordinates(event);

    let frameX = x;
    let frameY = y;

    if (x > (this.frame.x + this.frame.width) - this.frame.minWidth) {
      frameX = (this.frame.x + this.frame.width) - this.frame.minWidth;
    }
    if (x < 0) {
      frameX = 0;
    }
    if (y > (this.frame.y + this.frame.height) - this.frame.minHeight) {
      frameY = (this.frame.y + this.frame.height) - this.frame.minHeight;
    }
    if (y < 0) {
      frameY = 0;
    }

    const frameWidth = (this.frame.x + this.frame.width) - frameX;
    const frameHeight = (this.frame.y + this.frame.height) - frameY;

    this.frame.leftTopConer = {
      x: frameX,
      y: frameY,
      width: frameWidth,
      height: frameHeight,
    };
    this.update();
  }

  moveRightTopCater(event) {
    const { x, y } = this.countCoordinates(event);

    let frameWidth = x - this.frame.x;
    let frameY = y;

    if (x < this.frame.x + this.frame.minWidth) {
      frameWidth = this.frame.minWidth;
    }
    if (x > this.element.width) {
      frameWidth = this.element.width - this.frame.x;
    }
    if (y < 0) {
      frameY = 0;
    }
    if (y > (this.frame.y + this.frame.height) - this.frame.minHeight) {
      frameY = (this.frame.y + this.frame.height) - this.frame.minHeight; // eslint-disable-line
    }

    const frameHeight = (this.frame.y + this.frame.height) - frameY;

    this.frame.rightTopConer = { y: frameY, width: frameWidth, height: frameHeight };
    this.update();
  }

  moveRightBottomCater(event) {
    const { x, y } = this.countCoordinates(event);

    let frameWidth = x - this.frame.x;
    let frameHeight = y - this.frame.y;

    if (x > this.element.width) {
      frameWidth = this.element.width - this.frame.x;
    }
    if (x < this.frame.x + this.frame.minWidth) {
      frameWidth = this.frame.minWidth; // eslint-disable-line
    }
    if (y > this.element.height) {
      frameHeight = this.element.height - this.frame.y;
    }
    if (y < this.frame.y + this.frame.minHeight) {
      frameHeight = this.frame.minHeight;
    }

    this.frame.rightBottomConer = { width: frameWidth, height: frameHeight };
    this.update();
  }

  moveLeftBottomCater(event) {
    const { x, y } = this.countCoordinates(event);

    let frameX = x;
    let frameHeight = y - this.frame.y;

    if (x > (this.frame.x + this.frame.width) - this.frame.minWidth) {
      frameX = (this.frame.x + this.frame.width) - this.frame.minWidth;
    }
    if (x < 0) {
      frameX = 0;
    }
    if (y > this.element.height) {
      frameHeight = this.element.height - this.frame.y;
    }
    if (y < this.frame.y + this.frame.minHeight) {
      frameHeight = this.frame.minHeight;
    }

    const frameWidth = (this.frame.x + this.frame.width) - frameX;

    this.frame.leftBottomConer = { x: frameX, width: frameWidth, height: frameHeight };
    this.update();
  }

  update() {
    this.ctx.fillStyle = this.fillStyle;
    this.ctx.fillRect(0, 0, this.element.width, this.element.height);
    this.drawImage();
    this.drawFrame();
  }

  scaleImage(event) {
    event.preventDefault();
    event.stopPropagation();
    this.image.scale(event);
    this.update();
  }

  scaleFrame(event) {
    event.preventDefault();
    event.stopPropagation();
    this.frame.scale(event);
    this.update();
  }

  countCoordinates(event) {
    const rect = this.element.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const coordinates = { x, y };

    return coordinates;
  }

  drawFrame() {
    this.ctx.strokeStyle = this.frame.color;
    this.ctx.strokeRect(...this.frame.drawFrameArguments);
    this.ctx.strokeRect(...this.frame.leftTopCaretArguments);
    this.ctx.strokeRect(...this.frame.rightTopCaretArguments);
    this.ctx.strokeRect(...this.frame.rightBottomCaretArguments);
    this.ctx.strokeRect(...this.frame.leftBottomCaretArguments);
  }

  drawImage() {
    this.ctx.drawImage(...this.image.drawArguments, this.element.width, this.element.height);
  }
}
