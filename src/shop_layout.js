import { TypedText } from "./text_engine";
import { plugin } from "./underscript_checker";

var translate;

plugin.events.on("PrettyCards:onPageLoad", function() {
    window.prettycards.utility.loadCSSFromGH("Shop", "shops").then(plugin.events.emit("PrettyCardsShops:CSSReady"));
    translate = window.prettycards.translationManager.getStringOrList.bind(window.prettycards.translationManager);
})

class Shop {

    constructor(id) {
        this.id = id;
        this.pages = [];
        this.InitShopBase();
        setTimeout(function() {
            if (!this.lastDialogue) {
                this.SetDialogue(translate(`pc-shops-${this.id}-dial-intro`));
            }
        }.bind(this), 500);
    }

    SetupBackgroundAndMusic() {
        document.body.style.backgroundImage = `url("https://raw.githubusercontent.com/PrettyCards/shops/main/img/shopkeeper_backgrounds/${this.id}.png")`
    }

    RemoveEverythingElse(transpMainContent = true) {
        window.prettycards.utility.hideUglyPage();
        if (transpMainContent) {
            document.getElementsByClassName("mainContent")[0].style.background = "none";
        }
    }

    AddMenuOption(transKey, action = function() {}) {
        const page = document.createElement("DIV");
        page.className = "PrettyCards_Hidden";
        this.buyContainer.appendChild(page);
        this.pages.push(page);

        var option = document.createElement("BUTTON");
        option.className = "PrettyCards_ShopMenu_Option";
        option.innerHTML = window.$.i18n(`pc-shops-option-${transKey}`);
        option.onclick = function() {
            this.pages.forEach((p) => {
                p.classList.add("PrettyCards_Hidden");
            })
            page.classList.remove("PrettyCards_Hidden");
            this.SetDialogue(translate(`pc-shops-${this.id}-dial-${transKey}`));
            action();
        }.bind(this);
        this.menuContainer.appendChild(option);
        return option;
    }

    GetPageElement(nr) {
        return this.pages[nr];
    }

    LockButtons() {
        var children = this.menuContainer.children;
        for (var i=0; i < children.length; i++) {
            var child = children[i];
            child.setAttribute("disabled", true);
        }
    }

    UnlockButtons() {
        var children = this.menuContainer.children;
        for (var i=0; i < children.length; i++) {
            var child = children[i];
            child.removeAttribute("disabled");
        }
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
        this.dialogueContainer.onclick = function() {
            //console.log("AREA PRESSED!", this.lastDialogue);
            if (this.lastDialogue) {
                if (this.lastDialogue.IsPageDone()) {
                    this.lastDialogue.NextPage();
                } else {
                    this.lastDialogue.UserSkip();
                }
            }
        }.bind(this);
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
        this.lastDialogue = new TypedText(text, this.dialogueContainer);
        //console.log("NEW TEXT", this.lastDialogue, this);
    }

}

export {Shop};