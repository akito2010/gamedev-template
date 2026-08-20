import Phaser from 'phaser';
import { ENEMY_SPEED, ENEMY_FIRE_INTERVAL, ENEMY_HP, BULLET_SPEED } from '../config/params';
import { BulletPool } from './Bullet';
import { Player } from './Player';

export class Enemy {
  scene: Phaser.Scene;
  sprite: Phaser.GameObjects.Rectangle;
  hp: number = ENEMY_HP;
  private dir = 1;
  private speed = ENEMY_SPEED;
  private fireTimer = 0;
  private bulletPool: BulletPool;
  private player: Player;

  constructor(scene: Phaser.Scene, x: number, y: number, bulletPool: BulletPool, player: Player) {
    this.scene = scene;
    this.sprite = scene.add.rectangle(x, y, 80, 40, 0xff3333).setOrigin(0.5);
    this.bulletPool = bulletPool;
    this.player = player;
  }

  update(dt: number) {
    // simple horizontal patrol
    this.sprite.x += this.dir * this.speed * dt;
    const w = this.scene.scale.width;
    if (this.sprite.x < 40) {
      this.sprite.x = 40;
      this.dir = 1;
    } else if (this.sprite.x > w - 40) {
      this.sprite.x = w - 40;
      this.dir = -1;
    }

    // firing towards player at intervals
    this.fireTimer -= dt;
    if (this.fireTimer <= 0) {
      // fire a bullet downward
      this.bulletPool.spawn(this.sprite.x, this.sprite.y + 24, 0, BULLET_SPEED, 'enemy');
      this.fireTimer = ENEMY_FIRE_INTERVAL;
    }
  }

  takeDamage(n: number) {
    this.hp -= n;
    if (this.hp < 0) this.hp = 0;
  }
}
