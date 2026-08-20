import Phaser from 'phaser';
import { PLAYER_SPEED, PLAYER_FIRE_INTERVAL, PLAYER_HP, BULLET_SPEED } from '../config/params';
import { BulletPool } from './Bullet';

export class Player {
  scene: Phaser.Scene;
  sprite: Phaser.GameObjects.Rectangle;
  hp: number = PLAYER_HP;
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private fireKey: Phaser.Input.Keyboard.Key;
  private fireTimer = 0;
  private bulletPool: BulletPool;

  constructor(scene: Phaser.Scene, x: number, y: number, bulletPool: BulletPool) {
    this.scene = scene;
    this.sprite = scene.add.rectangle(x, y, 40, 24, 0x0077ff).setOrigin(0.5);
    this.cursors = scene.input.keyboard.createCursorKeys();
    this.fireKey = scene.input.keyboard.addKey('Space');
    this.bulletPool = bulletPool;
  }

  update(dt: number) {
    // movement
    let vx = 0;
    if (this.cursors.left?.isDown) vx -= 1;
    if (this.cursors.right?.isDown) vx += 1;
    this.sprite.x += vx * PLAYER_SPEED * dt;

    // clamp to screen
    const w = this.scene.scale.width;
    this.sprite.x = Phaser.Math.Clamp(this.sprite.x, 20, w - 20);

    // firing
    this.fireTimer -= dt;
    if (this.fireKey.isDown && this.fireTimer <= 0) {
      // spawn bullet upward
      this.bulletPool.spawn(this.sprite.x, this.sprite.y - 20, 0, -BULLET_SPEED, 'player');
      this.fireTimer = PLAYER_FIRE_INTERVAL;
    }
  }

  takeDamage(n: number) {
    this.hp -= n;
    if (this.hp < 0) this.hp = 0;
  }
}
