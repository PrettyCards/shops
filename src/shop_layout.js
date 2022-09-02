import { plugin } from "./underscript_checker";

plugin.events.on("PrettyCards:onPageLoad", function() {
    window.prettycards.utility.loadCSSFromGH("Shop", "shops");
})

class Shop {

    constructor() {
        this.InitShopBase();
    }

    AddMenuOption(text, action = function() {}) {
        var option = document.createElement("BUTTON");
        option.className = "PrettyCards_ShopMenu_Option";
        option.innerHTML = text;
        option.onclick = action;
        this.menuContainer.appendChild(option);
        return option;
    }

    InitShopBase() {
        this.container = document.createElement("DIV");
        this.container.className = "PrettyCards_ShopContainer";

        this.left = document.createElement("DIV");
        this.left.className = "PrettyCards_ShopLeft";
        this.container.appendChild(this.left);

        this.buyContainer = document.createElement("DIV");
        this.buyContainer.className = "PrettyCards_ShopBuyContainer";
        this.left.appendChild(this.buyContainer);

        this.dialogueContainer = document.createElement("DIV");
        this.dialogueContainer.className = "PrettyCards_ShopDialogueContainer";
        this.left.appendChild(this.dialogueContainer);

        this.right = document.createElement("DIV");
        this.right.className = "PrettyCards_ShopRight";
        this.container.appendChild(this.right);

        this.shopkeeperContainer = document.createElement("DIV");
        this.shopkeeperContainer.className = "PrettyCards_ShopkeeperContainer";
        this.right.appendChild(this.shopkeeperContainer);

        this.menuContainer = document.createElement("DIV");
        this.menuContainer.className = "PrettyCards_ShopMenuContainer";
        this.right.appendChild(this.menuContainer);
        return this.container;
    }

}

export {Shop};