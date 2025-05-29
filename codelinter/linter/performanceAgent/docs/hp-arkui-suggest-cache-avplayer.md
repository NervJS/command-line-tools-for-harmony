# Suggestion: Cache AVPlayer instances to shorten the playback start delay (`hp-arkui-suggest-cache-avplayer`)

## Benefits from Code Optimization
Enhanced audio and video playback startup speed.

## Rule Details
The creation and destruction of the AVPlayer instances can undermine performance. As such, you are advised to cache instances. Specifically, create two instances when the page is loaded for the first time; switch to the idle instance when opening a new page is opened; and use the reset API to reset the instance to the initial state. This approach eliminates the need to frequently create and destroy instances and, with the use of reset rather than release, delivers better performance.

> See [***documentation***](https://developer.huawei.com/consumer/{{region}}/doc/harmonyos-guides-{{apiVersion}}/ide-hp-arkui-suggest-cache-avplayer-{{apiVersion}}) or [***best practice***](https://developer.huawei.com/consumer/cn/doc/best-practices-V5/bpta-smooth-switching-V5) for more details.

## Examples

Examples of **incorrect** code for this rule:

```ts
import media from '@ohos.multimedia.media';

@Entry
@Component
struct MyComponent {
  private avPlayer: media.AVPlayer | undefined = undefined;

  aboutToAppear(): void {
    // Initialize the AVPlayer instance during page creation
    media.createAVPlayer().then((ret) => {
      this.avPlayer = ret;
    });
  }

  aboutToDisappear(): void {
    // Destroy the AVPlayer instance when leaving the page
    if (this.avPlayer) {
      this.avPlayer.release();
    }
    this.avPlayer = undefined;
  }

  build() {
    // Component Layout
  }
}
```

Examples of **correct** code for this rule:

```ts
import media from '@ohos.multimedia.media';

@Entry
@Component
struct MyComponent {
  private avPlayer: media.AVPlayer | undefined = undefined;
  private avPlayerManager: AVPlayerManager = AVPlayerManager.getInstance();

  aboutToAppear(): void {
    this.avPlayerManager.switchPlayer();
    this.avPlayer = this.avPlayerManager.getCurrentPlayer();
  }

  aboutToDisappear(): void {
    this.avPlayerManager.resetCurrentPlayer();
    this.avPlayer = undefined;
  }

  build() {
    // Component Layout
  }
}

class AVPlayerManager {
  private static instance?: AVPlayerManager;

  private player1?: media.AVPlayer;
  private player2?: media.AVPlayer;
  private currentPlayer?: media.AVPlayer;

  public static getInstance(): AVPlayerManager {
    if (!AVPlayerManager.instance) {
      AVPlayerManager.instance = new AVPlayerManager();
    }
    return AVPlayerManager.instance;
  }

  async AVPlayerManager() {
    this.player1 = await media.createAVPlayer();
    this.player2 = await media.createAVPlayer();
  }

  /**
   * Switching AVPlayer Instances During Page Switching
   */
  switchPlayer(): void {
    if (this.currentPlayer === this.player1) {
      this.currentPlayer = this.player2;
    } else {
      this.currentPlayer = this.player1;
    }
  }

  getCurrentPlayer(): media.AVPlayer | undefined {
    return this.currentPlayer;
  }

  /**
   * Resetting an AVPlayer instance using the reset method
   */
  resetCurrentPlayer(): void {
    this.currentPlayer?.pause(() => {
      this.currentPlayer?.reset();
    });
  }
}
```