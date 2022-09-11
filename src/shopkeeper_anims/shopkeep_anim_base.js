
import Konva from "konva";
import { settings } from "../underscript_checker";

class ShopkeeperAnimBase {

    constructor(shop) {
        this.shop = shop;
        this.spritesheetAddress = "INSERT_URL_HERE";
        this.spritesheet = null;
        this.inited = false;

        if (!settings.animated_shopkeepers.value()) {
            var div = document.createElement("DIV");
            div.style.width = "100%;"
            div.style.position = "relative";
            var img = document.createElement("IMG");
            img.style.width = "100%";
            img.src = `https://raw.githubusercontent.com/PrettyCards/shops/main/img/shopkeeper_fallbacks/${this.shop.id}.png`;
            div.appendChild(img);
            this.shop.shopkeeperContainer.appendChild(div);
            return;
        }

        // Anything below this point shouyld ONLY be for animated shopkeepers!
        this.stage = new Konva.Stage({
            container: this.shop.shopkeeperContainer,   // id of container <div>
            width: 600,
            height: 650
        });

        this.bgLayer = new Konva.Layer();
        this.mainLayer = new Konva.Layer();
        this.stage.add(this.bgLayer);
        this.stage.add(this.mainLayer);

        this.PixelateCanvases();
        /*
        var anim = new Konva.Animation(function(frame) {

        })
        // Maybe each expression can be a separate animation?
        anim
        */
    }

    PixelateCanvases() {
        var list = this.shop.shopkeeperContainer.querySelectorAll("canvas");
        console.log(list);
        for (var i=0; i < list.length; i++) {
            list[i].style.imageRendering = "pixelated";
        }
    }

    GetImageFromCanvas(x, y, width, height) {
        return new Konva.Image({
            x: 0,
            y: 0,
            image: this.spritesheet,
            width: width,
            height: height,
            crop: {x: x, y: y, width: width, height: height},
            shadowForStrokeEnabled: false,
            shadowEnabled: false
        });
    }

    // DO NOT OVERRIDE!
    ChangeExpression(name) {
        if (!this.stage) {
            return;
        }
        this.OnChangeExpression(name);
    }

    InitAnimations() {

    }

    // Override this instead!
    OnChangeExpression(name) {

    }

    OnMouthOpenLetter() {

    }

    OnMouthOpenStart() {

    }

    OnMouthOpenFinish() {

    }

}

export {ShopkeeperAnimBase};