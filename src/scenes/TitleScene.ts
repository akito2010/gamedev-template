import Phaser from 'phaser';

export class TitleScene extends Phaser.Scene {
  private enterKey!: Phaser.Input.Keyboard.Key;

  constructor() {
    super('TitleScene');
  }

  create(): void {
    const { width, height } = this.scale;
    this.add.text(width / 2, height / 2 - 40, 'My Shooting Game', {
      fontFamily: 'sans-serif',
      fontSize: '48px',
      color: '#000000',
    }).setOrigin(0.5);

    this.add.text(width / 2, height / 2 + 20, 'Press Enter to Start', {
      fontFamily: 'sans-serif',
      fontSize: '24px',
      color: '#333333',
    }).setOrigin(0.5);

    this.enterKey = this.input.keyboard.addKey('Enter');
  }

  update(): void {
    if (this.enterKey.isDown) {
      this.scene.start('GameScene');
    }
  }
}
