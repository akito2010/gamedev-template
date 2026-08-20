import Phaser from 'phaser';
import { Player } from '../objects/Player';
import { Enemy } from '../objects/Enemy';
import { BulletPool } from '../objects/Bullet';
import { HUD } from '../ui/HUD';
import { GAME_WIDTH, GAME_HEIGHT } from '../config/params';

export class GameScene extends Phaser.Scene {
  private player!: Player;
  private enemy!: Enemy;
  private bulletPool!: BulletPool;
  private hud!: HUD;
  private escKey!: Phaser.Input.Keyboard.Key;

  constructor() {
    super('GameScene');
  }

  create(): void {
    // simple background
    this.cameras.main.setBackgroundColor('#ffffff');

    // bullet pool
    this.bulletPool = new BulletPool(this);

    // player at bottom center
    this.player = new Player(this, GAME_WIDTH / 2, GAME_HEIGHT - 80, this.bulletPool);

    // enemy at top center
    this.enemy = new Enemy(this, GAME_WIDTH / 2, 120, this.bulletPool, this.player);

    // HUD
    this.hud = new HUD(this, this.player, this.enemy);

    // pause key
    this.escKey = this.input.keyboard.addKey('Escape');
  }

  update(time: number, delta: number): void {
    const dt = delta / 1000;

    if (this.escKey.isDown) {
      this.scene.pause();
      this.scene.launch('PauseScene');
      return;
    }

    this.player.update(dt);
    this.enemy.update(dt);
    this.bulletPool.update(dt);

    // collisions: player bullets -> enemy
    this.bulletPool.activeBullets.forEach(b => {
      if (!b.active) return;
      if (b.owner === 'player') {
        if (this.checkOverlapRect(b.sprite, this.enemy.sprite)) {
          b.deactivate();
          this.enemy.takeDamage(1);
          this.hud.update();
          if (this.enemy.hp <= 0) {
            // victory
            this.scene.start('GameOverScene', { victory: true });
          }
        }
      } else if (b.owner === 'enemy') {
        if (this.checkOverlapRect(b.sprite, this.player.sprite)) {
          b.deactivate();
          this.player.takeDamage(1);
          this.hud.update();
          if (this.player.hp <= 0) {
            // defeat
            this.scene.start('GameOverScene', { victory: false });
          }
        }
      }
    });
  }

  private checkOverlapRect(a: Phaser.GameObjects.Rectangle, b: Phaser.GameObjects.Rectangle): boolean {
    const ax1 = a.x - a.width / 2;
    const ax2 = a.x + a.width / 2;
    const ay1 = a.y - a.height / 2;
    const ay2 = a.y + a.height / 2;
    const bx1 = b.x - b.width / 2;
    const bx2 = b.x + b.width / 2;
    const by1 = b.y - b.height / 2;
    const by2 = b.y + b.height / 2;
    return ax1 <= bx2 && ax2 >= bx1 && ay1 <= by2 && ay2 >= by1;
  }
}
