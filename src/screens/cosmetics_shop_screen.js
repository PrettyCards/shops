
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

    
    PostRenderEntity(entry, ele) {
        console.log(entry);
        var COSMETIC_TYPES = window.prettycards.cosmeticShop.COSMETIC_TYPES;
        var content = document.createElement("DIV");
        content.style = "text-align: left;";

        var discountedPrice = entry.cost;
        var originalPrice = entry.cost;
        if (entry.discountPercent) {
            originalPrice = entry.cost / (entry.discountPercent/100);
        }

        var priceString = window.$.i18n("pc-shops-cosmetic-price", originalPrice, window.$.i18n("item-ucp"));
        if (entry.discountPercent) {
            priceString = window.$.i18n("pc-shops-cosmetic-price-discount", discountedPrice, window.$.i18n("item-ucp"), originalPrice);
        }

        if (entry.type === COSMETIC_TYPES.AVATAR) {
            content.innerHTML = `
                <div class="PrettyCards_ShopCosmeticsHover_Title ${entry.rarity}">${entry.name}</div>
                <div class="PrettyCards_ShopCosmeticsHover_Subtitle ${entry.rarity}">${window.$.i18n("pc-shops-avatar-rarity", window.$.i18n(`rarity-${entry.rarity.toLowerCase()}`))}</div>
                <div class="PrettyCards_ShopCosmeticsHover_Price">${priceString}</div>
                <div class="PrettyCards_ShopCosmeticsHover_Buttons">
                    <button class="btn btn-success"></button>
                    <button class="btn btn-primary">Favorite</button>
                </div>
            `;
        }
        if (entry.type === COSMETIC_TYPES.EMOTE) {
            content.innerHTML = "EMOTE";
        }
        if (entry.type === COSMETIC_TYPES.PROFILE_SKIN) {
            content.innerHTML = "PROFILE_SKIN";
        }

        window.tippy(ele, {
            content: content,
            allowHTML: true,
            arrow: true,
            inertia: true,
            placement: "right",
            interactive: true,
            appendTo: window.document.body,
            boundary: 'window',
            getReferenceClientRect: window.document.body.getBoundingClientRect
        });
    }

}

export {CosmeticsShopScreen}