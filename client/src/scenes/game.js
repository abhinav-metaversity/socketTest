import io from "socket.io-client";
import Card from "../helpers/card";
import Dealer from "../helpers/dealer";
import Zone from "../helpers/zone";

export default class Game extends Phaser.Scene {
  constructor() {
    super({
      key: "Game",
    });
  }

  preload() {
    this.load.image("card_back", "src/assets/card-back.jpg");
    this.load.image("ace_of_clubs", "src/assets/ace_of_clubs.png");
    this.load.image("ace_of_diamonds", "src/assets/ace_of_diamonds.png");
    this.load.image("ace_of_hearts", "src/assets/ace_of_hearts.png");
    this.load.image("ace_of_spades", "src/assets/ace_of_spades.png");
    this.load.image("2_of_clubs", "src/assets/2_of_clubs.png");
    this.load.image("2_of_diamonds", "src/assets/2_of_diamonds.png");
    this.load.image("2_of_hearts", "src/assets/2_of_hearts.png");
    this.load.image("2_of_spades", "src/assets/2_of_spades.png");
    this.load.image("3_of_clubs", "src/assets/3_of_clubs.png");
    this.load.image("3_of_diamonds", "src/assets/3_of_diamonds.png");
    this.load.image("3_of_hearts", "src/assets/3_of_hearts.png");
    this.load.image("3_of_spades", "src/assets/3_of_spades.png");
    this.load.image("4_of_clubs", "src/assets/4_of_clubs.png");
    this.load.image("4_of_diamonds", "src/assets/4_of_diamonds.png");
    this.load.image("4_of_hearts", "src/assets/4_of_hearts.png");
    this.load.image("4_of_spades", "src/assets/4_of_spades.png");
    this.load.image("5_of_clubs", "src/assets/5_of_clubs.png");
    this.load.image("5_of_diamonds", "src/assets/5_of_diamonds.png");
    this.load.image("5_of_hearts", "src/assets/5_of_hearts.png");
    this.load.image("5_of_spades", "src/assets/5_of_spades.png");
    this.load.image("6_of_clubs", "src/assets/6_of_clubs.png");
    this.load.image("6_of_diamonds", "src/assets/6_of_diamonds.png");
    this.load.image("6_of_hearts", "src/assets/6_of_hearts.png");
    this.load.image("6_of_spades", "src/assets/6_of_spades.png");
    this.load.image("7_of_clubs", "src/assets/7_of_clubs.png");
    this.load.image("7_of_diamonds", "src/assets/7_of_diamonds.png");
    this.load.image("7_of_hearts", "src/assets/7_of_hearts.png");
    this.load.image("7_of_spades", "src/assets/7_of_spades.png");
    this.load.image("8_of_clubs", "src/assets/8_of_clubs.png");
    this.load.image("8_of_diamonds", "src/assets/8_of_diamonds.png");
    this.load.image("8_of_hearts", "src/assets/8_of_hearts.png");
    this.load.image("8_of_spades", "src/assets/8_of_spades.png");
    this.load.image("9_of_clubs", "src/assets/9_of_clubs.png");
    this.load.image("9_of_diamonds", "src/assets/9_of_diamonds.png");
    this.load.image("9_of_hearts", "src/assets/9_of_hearts.png");
    this.load.image("9_of_spades", "src/assets/9_of_spades.png");
    this.load.image("10_of_clubs", "src/assets/10_of_clubs.png");
    this.load.image("10_of_diamonds", "src/assets/10_of_diamonds.png");
    this.load.image("10_of_hearts", "src/assets/10_of_hearts.png");
    this.load.image("10_of_spades", "src/assets/10_of_spades.png");
    this.load.image("jack_of_clubs", "src/assets/jack_of_clubs.png");
    this.load.image("jack_of_diamonds", "src/assets/jack_of_diamonds.png");
    this.load.image("jack_of_hearts", "src/assets/jack_of_hearts.png");
    this.load.image("jack_of_spades", "src/assets/jack_of_spades.png");
    this.load.image("king_of_clubs", "src/assets/king_of_clubs.png");
    this.load.image("king_of_diamonds", "src/assets/king_of_diamonds.png");
    this.load.image("king_of_hearts", "src/assets/king_of_hearts.png");
    this.load.image("king_of_spades", "src/assets/king_of_spades.png");
    this.load.image("queen_of_clubs", "src/assets/queen_of_clubs.png");
    this.load.image("queen_of_diamonds", "src/assets/queen_of_diamonds.png");
    this.load.image("queen_of_hearts", "src/assets/queen_of_hearts.png");
    this.load.image("queen_of_spades`", "src/assets/queen_of_spades.png");
    this.load.image("cyanCardFront", "src/assets/CyanCardFront.png");
    this.load.image("cyanCardBack", "src/assets/CyanCardBack.png");
    this.load.image("magentaCardFront", "src/assets/MagentaCardFront.png");
    this.load.image("magentaCardBack", "src/assets/MagentaCardBack.png");
  }

  create() {
    this.isPlayerA = false;
    this.opponentCards = [];

    this.zone = new Zone(this);
    this.dropZone = this.zone.renderZone();
    this.outline = this.zone.renderOutline(this.dropZone);

    this.dealer = new Dealer(this);

    let self = this;

    this.socket = io("http://localhost:3000");

    this.socket.on("connect", function () {
      console.log("Connected!");
    });

    this.socket.on("isPlayerA", function () {
      self.isPlayerA = true;
    });

    this.socket.on("dealCards", function () {
      self.dealer.dealCards();
      self.dealText.disableInteractive();
    });

    this.socket.on("cardPlayed", function (gameObject, isPlayerA) {
      if (isPlayerA !== self.isPlayerA) {
        let sprite = gameObject.textureKey;
        self.opponentCards.shift().destroy();
        self.dropZone.data.values.cards++;
        let card = new Card(self);
        card
          .render(
            self.dropZone.x - 350 + self.dropZone.data.values.cards * 50,
            self.dropZone.y,
            sprite
          )
          .disableInteractive();
      }
    });

    this.dealText = this.add
      .text(75, 350, ["DEAL CARDS"])
      .setFontSize(18)
      .setFontFamily("Trebuchet MS")
      .setColor("#00ffff")
      .setInteractive();

    this.dealText.on("pointerdown", function () {
      self.socket.emit("dealCards");
    });

    this.dealText.on("pointerover", function () {
      self.dealText.setColor("#ff69b4");
    });

    this.dealText.on("pointerout", function () {
      self.dealText.setColor("#00ffff");
    });

    this.input.on("drag", function (pointer, gameObject, dragX, dragY) {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });

    this.input.on("dragstart", function (pointer, gameObject) {
      gameObject.setTint(0xff69b4);
      self.children.bringToTop(gameObject);
    });

    this.input.on("dragend", function (pointer, gameObject, dropped) {
      gameObject.setTint();
      if (!dropped) {
        gameObject.x = gameObject.input.dragStartX;
        gameObject.y = gameObject.input.dragStartY;
      }
    });

    this.input.on("drop", function (pointer, gameObject, dropZone) {
      dropZone.data.values.cards++;
      gameObject.x = dropZone.x - 350 + dropZone.data.values.cards * 50;
      gameObject.y = dropZone.y;
      gameObject.disableInteractive();
      self.socket.emit("cardPlayed", gameObject, self.isPlayerA);
    });
  }

  update() {}
}
