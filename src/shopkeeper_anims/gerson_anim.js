import Konva from "konva";
import { ShopkeeperAnimBase } from "./shopkeep_anim_base";

class GersonAnimation extends ShopkeeperAnimBase {

    constructor(shop) {
        super(shop);
        this.pos = 0; // I used the same variables name as Toby here.
        this.y = 0;
        this.loopAnim = true;
        this.expressionIds = ["default", "tired", "happy", "sus", "therock"];
        //this.expressions = {};
        this.spritesheetAddress = "https://raw.githubusercontent.com/PrettyCards/shops/main/img/shop_sprites/gerson_spritesheet.png";
    }

    InitAnimations() {
        var stage_size = this.stage.getSize();

        this.torso = this.GetImageFromCanvas(0, 0, 280, 170);
        this.torso.position({x: 280, y: stage_size.height - this.torso.getHeight()});
        this.mainLayer.add(this.torso);

        this.arm = this.GetImageFromCanvas(0, 171, 235, 259);
        this.startarmx = this.torso.x() - this.arm.getWidth() + 1;
        this.startarmy = stage_size.height - this.arm.getHeight();
        this.arm.position({x: this.startarmx, y: this.startarmy});
        this.mainLayer.add(this.arm);

        this.torso.moveToTop();

        this.neck = this.GetImageFromCanvas(0, 430, 130, 145);
        this.neck.position({x: this.torso.x() - 20, y: this.torso.y() - 45});
        this.mainLayer.add(this.neck);

        this.startheady = this.neck.y() - 31*5 + 1;
        this.head = this.GetImageFromCanvas(281, 0, 225, 199);
        this.head.position({x: this.neck.x() - 59, y: this.startheady});
        this.mainLayer.add(this.head);

        this.ResetAnimatedBits();
    }

    OnChangeExpression(name) {
        var index = this.expressionIds.indexOf(name);
        if (index <= -1) {
            console.error(`Invalid expression for ${this.shop.id} "${name}"`)
            return;
        }
        this.head.cropY(index*this.head.cropHeight());
    }

    /*
    Toby's code:

    Draw:
        draw_sprite(spr_shop2_bg, 0, 0, 0)
        draw_sprite(spr_shopkeeper2_arm, 0, ((xstart - 30) + armx), ((ystart + 24) + (armx / 2)))
        draw_sprite(spr_shopkeeper2_body, 0, (xstart + 16), (ystart + 40))
        draw_sprite(spr_shopkeeper2_mouthbottom, 0, (xstart + 12), (ystart + 31))
        draw_sprite(spr_shopkeeper2_mouthtop, 0, x, y)
        draw_sprite(spr_shopkeeper2_eyes, global.faceemotion, x, (y + 15))

    Step:
        d = 0
        go = 0
        if instance_exists(OBJ_WRITER)
        {
            if (OBJ_WRITER.halt == false)
                go = 1
        }
        if (pos >= 6)
            go = 1
        if (go == 1)
        {
            if (pos >= 3)
            {
                y = (ystart + 2)
                armx = 2
            }
            if (pos >= 6)
            {
                y = (ystart + 4)
                armx = 4
            }
            if (pos >= 9)
            {
                y = (ystart + 2)
                armx = 2
            }
            if (pos >= 12)
            {
                y = ystart
                pos = 0
                armx = 0
            }
            pos += 1
        }


    */

    OnMouthOpenStart() {
        if (!this.anim) {
            this.pos = 0;
            this.y = 0;
            this.loopAnim = true;
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
        }
    }

    ResetAnimatedBits() {
        this.head.position({x: this.head.x(), y: this.startheady});
        this.arm.position({x: this.startarmx, y: this.startarmy});
    }

    OnMouthOpenFinish() {
        this.loopAnim = false;
    }

    
    /*
    GetImagesToPreload() {
        var list = ["torso", "arm", "neck", "head"];
        for (var i=0; i < this.expressionIds.length; i++) {
            list.push("eyes" + i);
        }
        return list.map((s) => this.GetSpriteAddress(s));
    }

    PopulateLoadedImages(array) {
        this.torsoImg = array[0];
        this.armImg = array[1];
        this.neckImg = array[2];
        this.headImg = array[3];
        for (var i=4; i < array.length; i++) {
            this.expressions[this.expressionIds[i-4]] = array[i];
        }
        //console.log(this.expressions);
    }
    */

}

export {GersonAnimation};