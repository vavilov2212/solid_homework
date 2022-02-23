export class Move {
  constructor(movable) {
    this.movable = movable;
  };

  execute() {
    this.movable.setDistance(this.movable.getDistance() + this.movable.getVelocity());
  };

};

export class IMovable {
  distance = 0;
  maxDistance;
  velocity = 30;

  getDistance() {
    return this.distance;
  };

  setDistance(d) {
    console.log('this', this);
    if (d < this.maxDistance) {
      return this.distance = this.maxDistance - (this.maxDistance - d);
    } else {
      return this.distance = this.maxDistance;
    }
  };

  setMaxDistance(md) {
    return this.maxDistance = md;
  };

  getMaxDistance() {
    return this.maxDistance;
  };

  getVelocity() {
    return this.velocity;
  };

};

export class Reset {
  constructor(resetable) {
    this.resetable = resetable;
  }

};
