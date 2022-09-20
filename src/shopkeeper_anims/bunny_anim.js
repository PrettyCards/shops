import Konva from "konva";
import { ShopkeeperAnimBase } from "./shopkeep_anim_base";

class BunnyAnimation extends ShopkeeperAnimBase {

    constructor(shop) {
        super(shop);
        this.pos = 0; // I used the same variables name as Toby here.
        this.y = 0;
        this.loopAnim = true;
        this.expressionIds = ["default", "very_angry", "smirk", "angry", "happy", "worried"];
        //this.expressions = {};
        this.spritesheetAddress = "https://raw.githubusercontent.com/PrettyCards/shops/main/img/shop_sprites/bunny.png";
    }

    InitAnimations() {
        var stage_size = this.stage.getSize();

        this.torso = this.GetImageFromCanvas(-1, -1, 305, 555);
        this.torso.position({x: stage_size.width/2 - this.torso.getWidth()/2, y: stage_size.height - this.torso.getHeight()});
        this.mainLayer.add(this.torso);

        this.face = this.GetImageFromCanvas(304, -1, 125, 125);
        this.face.position({x: this.torso.getPosition().x + 90, y: this.torso.getPosition().y + 115});
        this.mainLayer.add(this.face);
    }

    OnChangeExpression(name) {
        var index = this.expressionIds.indexOf(name);
        if (index <= -1) {
            console.error(`Invalid expression for ${this.shop.id} "${name}"`)
            return;
        }
        this.face.cropY(index*this.face.cropHeight() - 1);
    }

    /*
    Toby's code:


    */

    OnMouthOpenStart() {
        if (!this.anim) {
            this.pos = 0;
            this.y = 0;
            this.loopAnim = true;
            /*
            this.anim = new Konva.Animation(function(frame) {
                //console.log(frame);
                if (this.pos >= 3) {
                    this.y = 2
                }
                if (this.pos >= 6) {
                    this.y = 4
                }
                if (this.pos >= 9) {
                    this.y = 2
                }
                if (this.pos >= 12) {
                    this.y = 0
                    this.pos = 0
                    if (!this.loopAnim) {
                        this.ResetAnimatedBits();
                        this.anim.stop();
                        this.anim = null;
                        return;
                    }
                }
                this.pos += frame.timeDiff / 33;
                this.head.y(this.startheady + this.y * 5);
                this.arm.position({x: this.startarmx + this.y * 5, y: this.startarmy + this.y * 2.5});
            }.bind(this))
            this.anim.start();
            */
        }
    }

    OnMouthOpenFinish() {
        this.loopAnim = false;
    }

}

export {BunnyAnimation};