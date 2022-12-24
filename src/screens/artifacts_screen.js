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
        if (this.displayBought) {
            return false;
        }
        return entry.collection || entry.owned || entry.unavailable;
    }

    RenderEntry(entry) {
        var ele = document.createElement("DIV");
        ele.setAttribute("artid", entry.id);
        ele.className = (entry.soul ? `PrettyCards_ShopArtifactDisplay PrettyCards_ShopSoulArtifact ${entry.soul}` : `PrettyCards_ShopArtifactDisplay ${entry.rarity}`);
        // ele.className = "PrettyCards_ShopArtifactDisplay PrettyCards_ShopArtifactStyle_" + settings.artifact_style.value() + " " + entry.rarity; // For testing phase poll only.
        ele.onclick = function() {
            // console.log(entry, this, this.viewFunc);
            this.viewFunc(entry.id);
        }.bind(this);
        var img = document.createElement("IMG");
        img.src = window.prettycards.utility.getArtifactImageLink(entry.image);
        ele.appendChild(img);
        return ele;
    }

}

export {ArtifactsScreen};