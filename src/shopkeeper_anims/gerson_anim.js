import Konva from "konva";
import { ShopkeeperAnimBase } from "./shopkeep_anim_base";

const ADDRESS_PREFIX = "https://raw.githubusercontent.com/PrettyCards/shops/main/img/shop_sprites/gerson/";

class GersonAnimation extends ShopkeeperAnimBase {

    constructor(shop) {
        super(shop);
        this.expressionIds = ["default", "tired", "happy", "sus", "therock"];
        this.expressions = {};
    }

    InitAnimations() {
        
    }

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
        console.log(this.expressions);
    }

    GetSpriteAddress(spr) {
        return `${ADDRESS_PREFIX}${spr}.png`;
    }

}

export {GersonAnimation};