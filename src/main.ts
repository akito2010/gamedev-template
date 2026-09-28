import Phaser from 'phaser';
import { ShootingScene } from './scenes/ShootingScene';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'game-container',
  backgroundColor: '#07111f',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 960,
    height: 540,
  },
  scene: [ShootingScene],
};

const game = new Phaser.Game(config);

if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    game.destroy(true);
  });
  import.meta.hot.accept();
}
