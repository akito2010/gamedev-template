import Phaser from 'phaser';

export class Bullet {
  sprite: Phaser.GameObjects.Rectangle;
  vx = 0;
  vy = 0;
  owner: 'player' | 'enemy' | null = null;
  active = false;
  scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.sprite = scene.add.rectangle(-100, -100, 6, 12, 0x000000).setOrigin(0.5);
    this.sprite.setVisible(false);
  }

  activate(x: number, y: number, vx: number, vy: number, owner: 'player' | 'enemy') {
    this.sprite.x = x;
    this.sprite.y = y;
    this.vx = vx;
    this.vy = vy;
    this.owner = owner;
    this.active = true;
    this.sprite.setVisible(true);
  }

  deactivate() {
    this.active = false;
    this.sprite.setVisible(false);
    this.owner = null;
    // move offscreen
    this.sprite.x = -100;
    this.sprite.y = -100;
  }

  update(dt: number) {
    if (!this.active) return;
    this.sprite.x += this.vx * dt;
    this.sprite.y += this.vy * dt;
    // deactivate if out of bounds
    const w = this.scene.scale.width;
    const h = this.scene.scale.height;
    if (this.sprite.x < -10 || this.sprite.x > w + 10 || this.sprite.y < -10 || this.sprite.y > h + 10) {
      this.deactivate();
    }
  }
}

export class BulletPool {
  scene: Phaser.Scene;
  pool: Bullet[] = [];

  constructor(scene: Phaser.Scene, size = 50) {
    this.scene = scene;
    for (let i = 0; i < size; i++) {
      this.pool.push(new Bullet(scene));
    }
  }

  spawn(x: number, y: number, vx: number, vy: number, owner: 'player' | 'enemy') {
    const b = this.pool.find(p => !p.active);
    if (b) {
      b.activate(x, y, vx, vy, owner);
    }
  }

  update(dt: number) {
    this.pool.forEach(p => p.update(dt));
  }

  get activeBullets() {
    return this.pool.filter(p => p.active);
  }
}
