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
        this.torso = new Konva.Image({
            x: 150,
            y: 150,
            image: this.spritesheet,
        });
        this.torso = this.torso.crop({x: 0, y: 0, width: 280, height: 170});
        this.mainLayer.add(this.torso);
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