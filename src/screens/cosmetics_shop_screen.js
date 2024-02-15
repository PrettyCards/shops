
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

        var priceString = "";
        if (!entry.owned) {
            priceString = window.$.i18n("pc-shops-cosmetic-price", entry.cost, window.$.i18n("item-ucp"));
            if (entry.discountPercent) {
                priceString += ` <span class="ucp">(-${entry.discountPercent}%)</span>`;
            }
        }

        var hasEnoughUcp = entry.cost <= prettycards.pagegetters.ucp;

        var getUcpLine = "";
        if (!hasEnoughUcp) {
            getUcpLine = `<div style="margin-top: 3px;"><a href="/Shop" class="ucp">Want to buy ${window.$.i18n("item-ucp")}? Click here!</a></div>`;
        }

        var buttonsPart = `
            <div class="PrettyCards_ShopCosmeticsHover_Buttons">
                <button class="btn btn-success PrettyCards_ShopCosmeticsHover_BuyButton" ${hasEnoughUcp ? "" : "disabled"}><span class="glyphicon glyphicon-shopping-cart"></span> Buy</button>
                <button class="btn btn-primary"><span class="glyphicon glyphicon-star"></span> Favorite</button>
            </div>
            ${getUcpLine}
        `;
        if (entry.owned) {
            buttonsPart = `<p>You already own this!</p>`
        }

        // TODO: Add emoute sound button
        if (entry.type === COSMETIC_TYPES.AVATAR) {
            content.innerHTML = `
                <div class="PrettyCards_ShopCosmeticsHover_Title ${entry.rarity}">${entry.name}</div>
                <div class="PrettyCards_ShopCosmeticsHover_Subtitle ${entry.rarity}">${window.$.i18n("pc-shops-avatar-rarity", window.$.i18n(`rarity-${entry.rarity.toLowerCase()}`))}</div>
                <div class="PrettyCards_ShopCosmeticsHover_Price">${priceString}</div>
                ${buttonsPart}
            `;
        }
        if (entry.type === COSMETIC_TYPES.EMOTE) {
            content.innerHTML = `
                <div class="PrettyCards_ShopCosmeticsHover_Title">${entry.name}</div>
                <div class="PrettyCards_ShopCosmeticsHover_Subtitle">${window.$.i18n("pc-shops-emote-rarity", "")}</div>
                <div class="PrettyCards_ShopCosmeticsHover_Price">${priceString}</div>
                ${buttonsPart}
            `;
        }
        if (entry.type === COSMETIC_TYPES.PROFILE_SKIN) {
            content.innerHTML = `
                <div class="PrettyCards_ShopCosmeticsHover_Title">${entry.name}</div>
                <div class="PrettyCards_ShopCosmeticsHover_Subtitle">${window.$.i18n("pc-shops-profile-skin-rarity", "")}</div>
                <div class="PrettyCards_ShopCosmeticsHover_Price">${priceString}</div>
                ${buttonsPart}
            `;
        }

        var buyButton = content.querySelector(".PrettyCards_ShopCosmeticsHover_BuyButton");
        if (buyButton && !buyButton.hasAttribute("disabled")) {
            buyButton.onclick = () => {
                window.prettycards.cosmeticShop.GetData(entry.type, entry.id).then((cosmeticsData) => {
                    console.log(cosmeticsData);
                    this.ReplaceDataAndRerender(cosmeticsData);
                });
            }
        }

        window.tippy(ele, {
            content: content,
            allowHTML: true,
            arrow: true,
            inertia: true,
            placement: "right-start",
            interactive: true,
            appendTo: window.document.body,
            boundary: 'window',
            getReferenceClientRect: window.document.body.getBoundingClientRect
        });
    }

}

export {CosmeticsShopScreen}