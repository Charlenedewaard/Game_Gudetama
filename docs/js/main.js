"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var GameObject = (function () {
    function GameObject() {
        console.log("I am a gameobject");
    }
    GameObject.prototype.update = function () {
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    GameObject.prototype.getRectangle = function () {
        return this.div.getBoundingClientRect();
    };
    return GameObject;
}());
var Basket = (function (_super) {
    __extends(Basket, _super);
    function Basket(xp, up, down) {
        var _this = _super.call(this) || this;
        _this.downSpeed = 0;
        _this.upSpeed = 0;
        _this.div = document.createElement("basket");
        document.body.appendChild(_this.div);
        _this.upkey = up;
        _this.downkey = down;
        _this.x = xp;
        _this.y = 200;
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        window.addEventListener("keyup", function (e) { return _this.onKeyUp(e); });
        return _this;
    }
    Basket.prototype.getRectangle = function () {
        return this.div.getBoundingClientRect();
    };
    Basket.prototype.onKeyDown = function (e) {
        switch (e.keyCode) {
            case this.upkey:
                this.upSpeed = 5;
                break;
            case this.downkey:
                this.downSpeed = 5;
                break;
        }
    };
    Basket.prototype.onKeyUp = function (e) {
        switch (e.keyCode) {
            case this.upkey:
                this.upSpeed = 0;
                break;
            case this.downkey:
                this.downSpeed = 0;
                break;
        }
    };
    Basket.prototype.update = function () {
        var newY = this.y - this.upSpeed + this.downSpeed;
        if (newY > 0 && newY + 100 < window.innerHeight)
            this.y = newY;
        this.div.style.transform = "translatex(" + this.y + "px)";
    };
    return Basket;
}(GameObject));
var Egg = (function (_super) {
    __extends(Egg, _super);
    function Egg() {
        var _this = _super.call(this) || this;
        _this.div = document.createElement("egg");
        document.body.appendChild(_this.div);
        _this.x = window.innerWidth / 2;
        _this.y = Math.random() * (window.innerHeight - 100);
        _this.speedX = -3 - (Math.random() * 6);
        _this.speedY = Math.random() * 6 - 3;
        return _this;
    }
    Egg.prototype.getRectangle = function () {
        return this.div.getBoundingClientRect();
    };
    Egg.prototype.hitBasket = function () {
        this.speedX *= -1;
    };
    Egg.prototype.update = function () {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.y + this.getRectangle().height > window.innerHeight || this.y < 0) {
            this.speedY *= -1;
        }
        if (this.x + this.getRectangle().width > window.innerWidth || this.x < 0) {
            this.speedX *= -1;
        }
        if (this.x > window.innerWidth) {
            this.speedX *= -1;
        }
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    return Egg;
}(GameObject));
var PlayScreen = (function () {
    function PlayScreen(g) {
        this.eggs = [];
        this.game = g;
        this.basket = new Basket(20, 87, 83);
        for (var i = 0; i < 10; i++) {
            this.eggs.push(new Egg());
        }
    }
    PlayScreen.prototype.update = function () {
        for (var _i = 0, _a = this.eggs; _i < _a.length; _i++) {
            var b = _a[_i];
            if (this.checkCollision(b.getRectangle(), this.basket.getRectangle())) {
                b.hitBasket();
            }
            b.update();
        }
        this.basket.update();
    };
    PlayScreen.prototype.checkCollision = function (a, b) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom);
    };
    return PlayScreen;
}());
var Game = (function () {
    function Game() {
        this.currentscreen = new StartScreen(this);
        this.gameLoop();
    }
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.currentscreen.update();
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    Game.prototype.showPlayScreen = function () {
        document.body.innerHTML = "";
        this.currentscreen = new PlayScreen(this);
    };
    Game.prototype.showGameoverScreen = function () {
        document.body.innerHTML = "";
        this.currentscreen = new GameOver(this);
    };
    return Game;
}());
window.addEventListener("load", function () { return new Game(); });
var GameOver = (function () {
    function GameOver(g) {
        var _this = this;
        this.game = g;
        this.div = document.createElement("splash");
        document.body.appendChild(this.div);
        this.div.addEventListener("click", function () { return _this.splashClicked(); });
        this.div.innerHTML = "BETTER LUCK NEXT TIME";
    }
    GameOver.prototype.update = function () {
    };
    GameOver.prototype.splashClicked = function () {
        this.game.showPlayScreen();
    };
    return GameOver;
}());
var StartScreen = (function () {
    function StartScreen(g) {
        var _this = this;
        this.game = g;
        this.div = document.createElement("splash");
        document.body.appendChild(this.div);
        this.div.addEventListener("click", function () { return _this.splashClicked(); });
        this.div.innerHTML = "GUDETAMA";
    }
    StartScreen.prototype.update = function () {
    };
    StartScreen.prototype.splashClicked = function () {
        this.game.showPlayScreen();
    };
    return StartScreen;
}());
//# sourceMappingURL=main.js.map