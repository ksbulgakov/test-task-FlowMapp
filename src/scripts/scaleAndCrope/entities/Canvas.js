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

  addCursorHandlesEvent(eventType) {
    this.element.addEventListener(eventType, (event) => {
      const coordinates = this.countCoordinates(event);

      if (this.frame.isInLeftTopHandle(coordinates)) {
        this.element.style.cursor = 'move';
        return;
      }
      if (this.frame.isInRightTopHandle(coordinates)) {
        this.element.style.cursor = 'move';
        return;
      }

      if (this.frame.isInRightBottomHandle(coordinates)) {
        this.element.style.cursor = 'move';
        return;
      }

      if (this.frame.isInLeftBottomHandle(coordinates)) {
        this.element.style.cursor = 'move';
        return;
      }

      this.element.style.cursor = 'default';
    });
  }

  addDragHandlesEvent(eventType) {
    const moves = {
      leftTop: this.moveLeftTopHandle.bind(this),
      rightTop: this.moveRightTopHandle.bind(this),
      rightBottom: this.moveRightBottomHandle.bind(this),
      leftBottom: this.moveLeftBottomHandle.bind(this),
    };

    this.element.addEventListener(eventType, (event) => {
      const coordinates = this.countCoordinates(event);

      if (this.frame.isInLeftTopHandle(coordinates)) {
        this.element.addEventListener('mousemove', moves.leftTop);
      }
      if (this.frame.isInRightTopHandle(coordinates)) {
        this.element.addEventListener('mousemove', moves.rightTop);
      }
      if (this.frame.isInRightBottomHandle(coordinates)) {
        this.element.addEventListener('mousemove', moves.rightBottom);
      }
      if (this.frame.isInLeftBottomHandle(coordinates)) {
        this.element.addEventListener('mousemove', moves.leftBottom);
      }
    });

    Object.values(moves).forEach((move) => {
      document.addEventListener('mouseup', () => {
        this.element.removeEventListener('mousemove', move);
      });
    });
  }

  moveLeftTopHandle(event) {
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

  moveRightTopHandle(event) {
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

  moveRightBottomHandle(event) {
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

  moveLeftBottomHandle(event) {
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

  countCoordinates(event) {
    const rect = this.element.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const coordinates = { x, y };

    return coordinates;
  }

  drawFrame() {
    this.ctx.strokeStyle = this.frame.color;
    this.ctx.fillStyle = this.frame.color;
    this.ctx.strokeRect(...this.frame.drawFrameArguments);
    this.ctx.fillRect(...this.frame.leftTopHandleArguments);
    this.ctx.fillRect(...this.frame.rightTopHandleArguments);
    this.ctx.fillRect(...this.frame.rightBottomHandleArguments);
    this.ctx.fillRect(...this.frame.leftBottomHandleArguments);
  }

  drawImage() {
    this.ctx.drawImage(...this.image.drawArguments, this.element.width, this.element.height);
  }
}
