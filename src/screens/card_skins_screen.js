
import { settings } from "../underscript_checker";
import { FlexListScreen } from "./flex_list_screen";
import { PagedFlexListScreen } from "./paged_flex_list_screen";

class CardSkinsScreen extends PagedFlexListScreen {

    constructor(data, parent, isPromo = false) {
        super(data, parent);
        this.entriesPerPage = 15;
        this.isPromo = isPromo;
        if (this.isPromo) {
            this.entriesPerPage = data.length;
        }
        this.viewFunc = window.prettycards.FancyDisplay.ViewArtifactInfo.bind(window.prettycards.FancyDisplay);
    }

    OrderLogic(a, b) {
        return false; // Display things in the order they come up.
    }

    IsHidden(entry) {
        console.log("ISHIDDEN", this, this.isPromo);
        if (this.isPromo) {
            return entry.discount < 1;
        }
        return entry.unavailable && !entry.owned;
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

        var hover = document.createElement("DIV");
        hover.className = "PrettyCards_ShopCardSkinDisplayHover";

        var p = document.createElement("P");
        if (entry.owned) {
            p.innerHTML = window.$.i18n("cardskins-shop-owned");
        } else {
            p.className = "ucp";
            p.innerHTML = window.$.i18n("pc-shops-clicktobuy");
        }
        hover.appendChild(p);

        ele.appendChild(hover);
        return ele;
    }

    PostRenderEntity(entry, ele) {
        console.log(entry);
        var tooltip = document.createElement("DIV");
        tooltip.className = "PrettyCards_CardSkinShopTooltip";
        
        //var left = document.createElement("DIV");
        var card = window.appendCardCardSkinShop(entry, window.frameName);
        tooltip.appendChild(card[0]);
        //tooltip.appendChild(left);
        

        window.tippy(ele, {
            content: tooltip,
            allowHTML: true,
            arrow: true,
            inertia: true,
            placement: "auto",
            appendTo: window.document.body,
            boundary: 'window',
            getReferenceClientRect: window.document.body.getBoundingClientRect
        });
    }

    RenderTop() {
        var container = document.createElement("DIV");
        container.className = "PrettyCards_ShopFilterRow";

        var searchBar = document.createElement("INPUT");
        searchBar.setAttribute("type", "text");
        searchBar.className = "form-control";
        container.appendChild(searchBar);
        // Card
        var cardSelect = document.createElement("SELECT");
        cardSelect.className = "form-control white";
        container.appendChild(cardSelect);
        var optionsTxt = `<option value=""></option>`;
        window.cardIds.forEach((id) => {
            optionsTxt += `<option value="${id}">${window.$.i18n("card-name-" + id, 1)}</option>`;
        })
        cardSelect.innerHTML = optionsTxt;

        // Author

        this.topContainer.appendChild(container);
        super.RenderTop();
    }

}

export {CardSkinsScreen};