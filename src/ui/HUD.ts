import Phaser from 'phaser';
import { Player } from '../objects/Player';
import { Enemy } from '../objects/Enemy';

export class HUD {
  private scene: Phaser.Scene;
  private player: Player;
  private enemy: Enemy;
  private playerText!: Phaser.GameObjects.Text;
  private enemyText!: Phaser.GameObjects.Text;

  constructor(scene: Phaser.Scene, player: Player, enemy: Enemy) {
    this.scene = scene;
    this.player = player;
    this.enemy = enemy;

    this.playerText = scene.add.text(16, 16, `HP: ${this.player.hp}`, {
      fontFamily: 'sans-serif',
      fontSize: '20px',
      color: '#000000',
    });

    this.enemyText = scene.add.text(scene.scale.width - 200, 16, `Enemy HP: ${this.enemy.hp}`, {
      fontFamily: 'sans-serif',
      fontSize: '20px',
      color: '#000000',
    });
  }

  update() {
    this.playerText.setText(`HP: ${this.player.hp}`);
    this.enemyText.setText(`Enemy HP: ${this.enemy.hp}`);
  }
}
