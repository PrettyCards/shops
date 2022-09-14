
import { ImagedSelect } from "../imaged_select_element";
import { plugin, settings } from "../underscript_checker";
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
        if (this.isPromo) {
            return entry.discount < 1;
        }
        if (entry.unavailable && !entry.owned) {
            return true;
        }
        if (this.authorSelect.GetValue() != "" && entry.authorName != this.authorSelect.GetValue()) {
            return true;
        }
        return false;
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
            if (entry.unavailable) {
                p.innerHTML = `<span class="glyphicon glyphicon-star yellow" title="Legacy"></span> `;
            }
            p.innerHTML += window.$.i18n("cardskins-shop-owned");
        } else {
            p.className = "ucp";
            p.innerHTML = window.$.i18n("pc-shops-clicktobuy");
        }
        hover.appendChild(p);

        ele.appendChild(hover);
        return ele;
    }

    PostRenderEntity(entry, ele) {
        //console.log(entry);
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
        searchBar.onkeyup = this.FiltersAndGoto.bind(this);
        container.appendChild(searchBar);
        // Card
        var cardSelect = document.createElement("SELECT");
        cardSelect.onchange = this.FiltersAndGoto.bind(this);
        cardSelect.className = "form-control white";
        container.appendChild(cardSelect);
        var optionsTxt = `<option value=""></option>`;
        window.cardIds.forEach((id) => {
            optionsTxt += `<option value="${id}">${window.$.i18n("card-name-" + id, 1)}</option>`;
        })
        cardSelect.innerHTML = optionsTxt;

        // Author
        var authorSelect = new ImagedSelect();
        authorSelect.button.classList.add("Artist");
        authorSelect.AddOption("", "https://raw.githubusercontent.com/PrettyCards/shops/main/img/artist_icons/all_artists.png", "All Artists");
        authorSelect.dropdown.classList.add("Artist");

        plugin.events.on("PrettyCardsShop:artistIconsFetched", function(data) {
            data = data[0];
            console.log(data);
            authors.forEach((author) => {
                var image = "";
                if (data[author]) {
                    image = data[author];
                }
                authorSelect.AddOption(author, image, author);
            })
        });
        authorSelect.onchange = this.FiltersAndGoto.bind(this);
        container.appendChild(authorSelect.button);

        // "Show"
        var showCheckbox = document.createElement("INPUT");
        showCheckbox.setAttribute("type", "checkbox");
        showCheckbox.onchange = this.FiltersAndGoto.bind(this);
        showCheckbox.className = "PrettyCards_Hidden";
        showCheckbox.id = "PrettyCards_CardSkinShop_ShowCheckbox";
        container.appendChild(showCheckbox);

        var showCheckboxLabel = document.createElement("LABEL");
        showCheckboxLabel.setAttribute("for", showCheckbox.id);
        showCheckboxLabel.className = "PrettyCards_BigBlockCheckboxLabel";
        showCheckboxLabel.innerHTML = `<span class="glyphicon glyphicon-user"></span>`;
        container.appendChild(showCheckboxLabel);

        this.topContainer.appendChild(container);

        this.filterContainer = container;
        this.searchBar = searchBar;
        this.cardSelect = cardSelect;
        this.authorSelect = authorSelect;
        this.showCheckbox = showCheckbox;
        super.RenderTop();
    }

}

export {CardSkinsScreen};