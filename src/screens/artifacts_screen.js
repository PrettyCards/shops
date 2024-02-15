import { settings } from "../underscript_checker";
import { FlexListScreen } from "./flex_list_screen";

class ArtifactsScreen extends FlexListScreen {

    constructor(data, parent, displayBought = false) {
        super(data, parent);
        this.displayBought = displayBought;
        this.rarityOrder = ["BASE", "COMMON", "RARE", "EPIC", "LEGENDARY", "TOKEN", "DETERMINATION", "MYTHIC"]; // Just to be sure, I added a few more.
        this.viewFunc = window.prettycards.FancyDisplay.ViewArtifactInfo.bind(window.prettycards.FancyDisplay);
    }

    OrderLogic(a, b) {
        return this.rarityOrder.indexOf(a.rarity) - this.rarityOrder.indexOf(b.rarity);
    }

    IsHidden(entry) {
        if (!entry) {
            return true;
        }
        if (this.displayBought) {
            return false;
        }
        return !window.prettycards.artifactDisplay.IsArtifactPurchasable(entry.id);
    }

    RenderEntry(entry) {
        var ele = document.createElement("DIV");
        ele.setAttribute("artid", entry.id);
        ele.className = (entry.soul ? `PrettyCards_ShopArtifactDisplay PrettyCards_ShopSoulArtifact ${entry.soul}` : `PrettyCards_ShopArtifactDisplay ${entry.rarity}`);
        if (entry.isImageBig) {
            ele.className += " PrettyCards_ShopArtifactDisplay_Big";
        }
        // ele.className = "PrettyCards_ShopArtifactDisplay PrettyCards_ShopArtifactStyle_" + settings.artifact_style.value() + " " + entry.rarity; // For testing phase poll only.
        ele.onclick = function() {
            // console.log(entry, this, this.viewFunc);
            this.viewFunc(entry.id);
        }.bind(this);
        var img = window.prettycards.utility.getArtifactImage(entry.image);
        ele.appendChild(img);
        return ele;
    }

}

export {ArtifactsScreen};