import { plugin } from "./underscript_checker";

plugin.events.on("PrettyCards:onPageLoad", function() {
    window.prettycards.utility.loadCSSFromGH("Shop", "shops");
})

class Shop {

    constructor() {
        this.InitShopBase();
    }

    InitShopBase() {
        this.container = document.createElement("DIV");
        this.container.className = "PrettyCards_ShopContainer";

        this.left = document.createElement("DIV");
        this.container.appendChild(this.left);

        this.buyContainer = document.createElement("DIV");
        this.left.appendChild(this.buyContainer);

        this.dialogueContainer = document.createElement("DIV");
        this.left.appendChild(this.dialogueContainer);

        this.right = document.createElement("DIV");
        this.container.appendChild(this.right);

        this.shopkeeperContainer = document.createElement("DIV");
        this.right.appendChild(this.shopkeeperContainer);

        this.menuContainer = document.createElement("DIV");
        this.right.appendChild(this.menuContainer);
        return this.container;
    }

}

export {Shop};