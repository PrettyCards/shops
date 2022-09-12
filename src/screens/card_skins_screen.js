
import { settings } from "../underscript_checker";
import { FlexListScreen } from "./flex_list_screen";

class CardSkinsScreen extends FlexListScreen {

    constructor(data, parent, isPromo = false) {
        super(data, parent);
        this.isPromo = isPromo;
        this.viewFunc = window.prettycards.FancyDisplay.ViewArtifactInfo.bind(window.prettycards.FancyDisplay);
    }

    OrderLogic(a, b) {
        return false; // Display things in the order they come up.
    }

    IsHidden(entry) {
        if (!this.isPromo) {
            return false;
        }
        return entry.discount <= 0;
    }

    RenderEntry(entry) {
        var ele = document.createElement("DIV");
        ele.setAttribute("skinid", entry.id);
        ele.className = "PrettyCards_ShopCardSkinDisplay";
        ele.style.backgroundImage = `url("${window.prettycards.utility.getCardImageLink(entry.image)}")`
        ele.onclick = function() {
            // console.log(entry, this, this.viewFunc);
            this.viewFunc(entry.id);
        }.bind(this);
        var tooltip = document.createElement("DIV");
        tooltip.className = "PrettyCards_CardSkinShopTooltip";
        
        var left = document.createElement("DIV");
        var card = window.appendCardCardSkinShop(entry, window.frameName);
        left.appendChild(card[0]);
        tooltip.appendChild(left);

        ele.appendChild(tooltip);
        return ele;
    }

}

export {CardSkinsScreen};