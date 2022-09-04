import { FlexListScreen } from "./flex_list_screen";

class ArtifactsScreen extends FlexListScreen {

    constructor(data, parent, displayBought = false) {
        super(data, parent);
        this.displayBought = displayBought;
        this.rarityOrder = ["COMMON", "RARE", "EPIC", "LEGENDARY", "TOKEN", "DETERMINATION", "MYTHICAL"]; // Just to be sure, I added a few more.
    }

    OrderLogic(a, b) {
        return this.rarityOrder.indexOf(a.rarity) - this.rarityOrder.indexOf(b.rarity);
    }

    IsHidden(entry) {
        return (!this.displayBought) && entry.owned;
    }

    RenderEntry(entry) {
        var ele = document.createElement("DIV");
        ele.className = "PrettyCards_ShopArtifactDisplay " + entry.rarity;
        var img = document.createElement("IMG");
        img.src = window.prettycards.utility.getArtifactImageLink(entry.image);
        ele.appendChild(img);
        return ele;
    }

}

export {ArtifactsScreen};