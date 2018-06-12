// <reference path="screen.ts"/>
/// <reference path="egg.ts"/>

class PlayScreen {

    private eggs: Egg[] = []
    private basket: Basket
    private game: Game

    constructor(g:Game) {
        this.game = g
        this.basket = new Basket(20, 87, 83)

        for (var i = 0; i < 10; i++) {
            this.eggs.push(new Egg())
        }
    }

    public update(): void {
        for (var b of this.eggs) {

            // egg hits basket
            if (this.checkCollision(b.getRectangle(), this.basket.getRectangle())) {
                b.hitBasket()
            }

            // egg leaves the screen: gameover!
            /** if (b.getRectangle().left < 0) {
                this.game.showGameoverScreen()
            } */

            b.update()
        }

        this.basket.update()
    }

    private checkCollision(a: ClientRect, b: ClientRect) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom)
    }

}