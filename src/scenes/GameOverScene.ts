import Phaser from 'phaser';

export class GameOverScene extends Phaser.Scene {
  private enterKey!: Phaser.Input.Keyboard.Key;
  private victory: boolean = false;

  constructor() {
    super('GameOverScene');
  }

  init(data: any): void {
    this.victory = !!data?.victory;
  }

  create(): void {
    const { width, height } = this.scale;

    const title = this.victory ? 'You Win!' : 'Game Over';
    this.add.text(width / 2, height / 2 - 40, title, {
      fontFamily: 'sans-serif',
      fontSize: '48px',
      color: '#000000',
    }).setOrigin(0.5);

    this.add.text(width / 2, height / 2 + 20, 'Press Enter to go to Title', {
      fontFamily: 'sans-serif',
      fontSize: '24px',
      color: '#333333',
    }).setOrigin(0.5);

    this.enterKey = this.input.keyboard.addKey('Enter');
  }

  update(): void {
    if (this.enterKey.isDown) {
      this.scene.start('TitleScene');
    }
  }
}
