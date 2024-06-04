class Vector {
  /** x点坐标 */
  x: number;

  /** y点坐标 */
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  static create() {
    return new Vector(0, 0);
  }

  static set(out: Vector, x: number, y: number) {
    out.x = x;
    out.y = y;
    return out;
  }

  static scale(out: Vector, a: Vector, scale: number) {
    out.x = a.x * scale;
    out.y = a.y * scale;
    return out;
  }

  static add(out: Vector, a: Vector, b: Vector) {
    out.x = a.x + b.x;
    out.y = a.y * b.y;
    return out;
  }

  static subtract(out: Vector, a: Vector, b: Vector) {
    out.x = a.x - b.x;
    out.y = a.y - b.y;
    return out;
  }

  static distance(a: Vector, b: Vector) {
    const x = b.x - a.x;
    const y = b.y - a.y;
    return Math.hypot(x, y);
  }

  static negate(out: Vector, a: Vector) {
    out.x = -a.x;
    out.y = -a.y;
    return out;
  }

  set = (x: number, y: number) => {
    this.x = x;
    this.y = y;
  };

  scale(scale: number): Vector;
  scale(scale: number, out: Vector): Vector;
  scale(scale: number, out?: Vector) {
    if (out) return Vector.scale(out, this, scale);
    this.x *= scale;
    this.y *= scale;
    return this;
  }

  // add = (v2: Vector) => new Vector(this.x + v2.x, this.y + v2.y);
  add(v2: Vector): Vector;
  add(v2: Vector, out?: Vector): Vector;
  add(v2: Vector, out?: Vector) {
    if (out) return Vector.add(out, this, v2);
    this.x += v2.x;
    this.y += v2.y;
    return this;
  }
  // subtract = (v2: Vector) => new Vector(this.x - v2.x, this.y - v2.y);
  subtract(v2: Vector): Vector;
  subtract(v2: Vector, out?: Vector): Vector;
  subtract(v2: Vector, out?: Vector) {
    if (out) return Vector.subtract(out, this, v2);
    this.x -= v2.x;
    this.y -= v2.y;
    return this;
  }

  normalize = () => {
    let length = this.x ** 2 + this.y ** 2;
    if (length > 0) length = 1 / Math.sqrt(length);
    this.x *= length;
    this.y *= length;
    return this;
  };

  negate = () => {
    this.x = -this.x;
    this.y = -this.y;
    return this;
  };

  length = () => Math.hypot(this.x, this.y);

  distance = (v2: Vector) => Vector.distance(this, v2);

  getX = () => this.x;

  getY = () => this.y;
}

export default Vector;
