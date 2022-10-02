
import { CategorizedFlexListScreen } from "./categorized_flex_list_screen";

class CosmeticsShopScreen extends CategorizedFlexListScreen {

    RenderCategoryHeader(category_id) {
        var div = document.createElement("DIV");
        div.style = "width: 100%; padding: 0.8em;"
        div.innerHTML = `<span style="font-size: 2em;">${window.$.i18n(category_id)}</span>`;
        return div;
    }

    RenderEntry(entry) {
        var COSMETIC_TYPES = window.prettycards.cosmeticShop.COSMETIC_TYPES;
        if (entry.type === COSMETIC_TYPES.AVATAR) {
            var img = document.createElement("IMG");
            img.src = entry.imageSrc;
            img.className = "avatar " + entry.rarity;
            img.style = "margin: 5px;";
            return img;
        }
        if (entry.type === COSMETIC_TYPES.EMOTE) {
            var img = document.createElement("IMG");
            img.src = entry.imageSrc;
            img.className = "emote-bordered";
            img.style = "margin: 5px;";
            return img;
        }
        if (entry.type === COSMETIC_TYPES.PROFILE_SKIN) {
            var img = document.createElement("IMG");
            img.src = entry.imageSrc;
            img.className = "profileSkin";
            img.style = "margin: 5px; height: 18px;";
            return img;
        }

        // Fallback, IG.
        var testP = document.createElement("P");
        testP.innerHTML = entry.name;
        return testP;
    }

}

export {CosmeticsShopScreen}