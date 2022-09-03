import { TypedText } from "./text_engine";
import { plugin } from "./underscript_checker";

plugin.events.on("PrettyCards:onPageLoad", function() {
    window.prettycards.utility.loadCSSFromGH("Shop", "shops");
})

class Shop {

    constructor() {
        this.pages = [];
        this.InitShopBase();
    }

    AddMenuOption(text, dialogueEntry, action = function() {}) {
        const page = document.createElement("DIV");
        page.className = "PrettyCards_Hidden";
        this.buyContainer.appendChild(page);
        this.pages.push(page);

        var option = document.createElement("BUTTON");
        option.className = "PrettyCards_ShopMenu_Option";
        option.innerHTML = text;
        option.onclick = function() {
            this.pages.forEach((p) => {
                p.classList.add("PrettyCards_Hidden");
            })
            page.classList.remove("PrettyCards_Hidden");
            this.SetDialogue(window.$.i18n(dialogueEntry));
            action();
        }.bind(this);
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

    SetDialogue(text) {
        if (this.lastDialogue) {
            this.lastDialogue.Remove();
        }
        this.lastDialogue = new TypedText(text);
        this.dialogueContainer.appendChild(this.lastDialogue.container);
    }

}

export {Shop};