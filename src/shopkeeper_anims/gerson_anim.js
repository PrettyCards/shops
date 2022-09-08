import Konva from "konva";
import { ShopkeeperAnimBase } from "./shopkeep_anim_base";

const ADDRESS_PREFIX = "https://raw.githubusercontent.com/PrettyCards/shops/main/img/shop_sprites/gerson/";

class GersonAnimation extends ShopkeeperAnimBase {

    constructor(shop) {
        super(shop);
        this.expressionIds = ["default", "tired", "happy", "sus", "therock"];
        this.expressions = {};
        this.spritesheetAddress = "https://raw.githubusercontent.com/PrettyCards/shops/main/img/shop_sprites/gerson_spritesheet.png";
    }

    InitAnimations() {
        console.log("INIT ANIM!");
        //this.torsoImgBig = window.prettycards.utility.resizePixelArt(this.torsoImg, 5);
        //console.log(this.torsoImgBig);
        var stage_size = this.stage.getSize();

        this.torso = this.GetImageFromCanvas(0, 0, 280, 170);
        this.torso.position({x: 250, y: stage_size.height - this.torso.getHeight()});
        this.mainLayer.add(this.torso);

        this.arm = this.GetImageFromCanvas(0, 171, 235, 260);
        this.arm.position({x: this.torso.x() - this.arm.getWidth() + 1, y: stage_size.height - this.arm.getHeight()});
        this.mainLayer.add(this.arm);

        this.neck = this.GetImageFromCanvas(235, 200, 130, 145);
        this.neck.position({x: this.torso.x() - 20, y: this.torso.y() - 45});
        this.mainLayer.add(this.neck);

        this.head = this.GetImageFromCanvas(281, 0, 225, 199);
        this.head.position({x: this.neck.x() - 59, y: this.neck.y() - 31*5 + 1});
        this.mainLayer.add(this.head);

        this.eyes = this.GetImageFromCanvas(381, 200, 125, 59);
        this.eyes.position({x: this.head.x() , y: this.head.y() + 75});
        this.mainLayer.add(this.eyes);
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