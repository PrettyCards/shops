
import { TypedText } from "./text_engine";
import { plugin, settings } from "./underscript_checker";


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
        this.bgm = new Audio();
        this.bgm.loop = true;

        this.SetUpEvents();
        setTimeout(function() {
            if (!this.lastDialogue) {
                this.SetDialogue(translate(`pc-shops-${this.id}-dial-intro`));
            }
        }.bind(this), 500);
    }

    /*
    SetShopkeeperAnim(c) {
        this.shopkeeperAnim = new c(this);
        if (this.shopkeeperAnim.stage) {
            var urls = this.shopkeeperAnim.GetImagesToPreload();
            if (urls.length <= 0) {
                this.shopkeeperAnim.InitAnimations();
                return;
            }
            var sprites_left = urls.length;
            var return_array = [];
            for (var i=0; i < sprites_left; i++) {
                const url = urls[i];
                const index = i;
                window.prettycards.utility.preloadImage(url).then((img) => {
                    sprites_left--;
                    return_array[index] = img;
                    if (sprites_left <= 0) {
                        this.shopkeeperAnim.PopulateLoadedImages(return_array);
                        this.shopkeeperAnim.InitAnimations();
                    }
                }).catch((err) => {
                    console.error("Image Unable To Load: " + url, err);
                })
            }
        }
    }
    */

    SetShopkeeperAnim(c) {
        this.shopkeeperAnim = new c(this);
        if (this.shopkeeperAnim.stage) {
            window.prettycards.utility.preloadImage(this.shopkeeperAnim.spritesheetAddress).then((img) => {
                this.shopkeeperAnim.spritesheet = img;
                this.shopkeeperAnim.InitAnimations();
            }).catch((err) => {
                console.error("Image Unable To Load: " + url, err);
            })
        }
    }

    SetUpEvents() {
        
    }

    SetupBackgroundAndMusic() {
        if (settings.change_background.value()) {
            document.body.style.backgroundImage = `url("https://raw.githubusercontent.com/PrettyCards/shops/main/img/shopkeeper_backgrounds/${this.id}.png")`;
        }

        if (settings.background_music.value()) {
            this.bgm.src = `https://raw.githubusercontent.com/PrettyCards/shops/main/audio/bgm/${this.id}.ogg`;
            //this.bgm.preload = true;
            this.bgm.play().catch((err) => {
                console.log(err);
                if (err.name === "NotAllowedError") {
                    var elem = document.createElement("DIV");
                    elem.className = "glyphicon glyphicon-volume-up PrettyCards_ShopManualAudio";
                    this.right.appendChild(elem);
                }
            });

            plugin.events.on("PrettyCards:pauseBGM", function() {
                this.bgm.pause();
            }.bind(this));

            plugin.events.on("PrettyCards:resumeBGM", function() {
                this.bgm.play();
            }.bind(this));
        }
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

    SetDialogue(text, important = false) {
        if (settings.mute_dialogue.value() && !important) {
            return;
        }
        if (this.lastDialogue) {
            this.lastDialogue.Remove("SWITCH_MENU");
        }
        this.lastDialogue = new TypedText(text, this.dialogueContainer, this.shopkeeperAnim);
        //console.log("NEW TEXT", this.lastDialogue, this);
    }

}

export {Shop};