import Phaser from 'phaser';

export class PauseScene extends Phaser.Scene {
  private escKey!: Phaser.Input.Keyboard.Key;

  constructor() {
    super('PauseScene');
  }

  create(): void {
    const { width, height } = this.scale;
    this.add.rectangle(width / 2, height / 2, 400, 200, 0x000000, 0.6);
    this.add.text(width / 2, height / 2 - 20, 'Paused', {
      fontFamily: 'sans-serif',
      fontSize: '32px',
      color: '#ffffff',
    }).setOrigin(0.5);
    this.add.text(width / 2, height / 2 + 20, 'Press Esc to resume', {
      fontFamily: 'sans-serif',
      fontSize: '18px',
      color: '#ffffff',
    }).setOrigin(0.5);

    this.escKey = this.input.keyboard.addKey('Escape');
  }

  update(): void {
    if (this.escKey.isDown) {
      this.scene.stop();
      this.scene.resume('GameScene');
    }
  }
}
