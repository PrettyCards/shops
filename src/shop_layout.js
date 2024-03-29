
import { TypedText } from "./text_engine";
import { plugin, settings } from "./underscript_checker";

import css from "./css/Shop.css";
plugin.events.on("PrettyCards:cssLoaderReady", () => {
    window.prettycards.loadCSS(css);
})

var translate;

plugin.events.on("PrettyCards:onPageLoad", function() {
    translate = window.prettycards.translationManager.getStringOrList.bind(window.prettycards.translationManager);
})

class Shop {

    constructor(id) {
        this.id = id;
        this.pages = [];
        this.InitShopBase();
        this.bgm = new Audio();
        this.bgm.loop = true;
        this.dialoguePrefix = "";

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

    StartPlayingMusic() {
        if (!this.isPaused && this.didPlayBefore) {
            this.bgm.play();
        }
    }

    IsBGMPlaying() {
        return this.bgm.duration > 0 && !this.bgm.paused;
    }

    PlayMusicManual(fail) {
        var elem = document.createElement("DIV");
        elem.className = "glyphicon glyphicon-volume-up PrettyCards_ShopManualAudio";
        elem.onclick = function() {
            this.didPlayBefore = true;
            this.StartPlayingMusic();
            elem.remove();
        }.bind(this);
        this.right.appendChild(elem);
        window.tippy(elem, {
            content: `${fail ? "<span class='red'>" + window.$.i18n("pc-shops-playbtn-tip-fail") + "</span><br>" : ""}${window.$.i18n("pc-shops-playbtn-tip")}`,
            allowHTML: true,
            arrow: true,
            inertia: true,
            placement: "bottom-start",
            appendTo: window.document.body,
            boundary: 'window',
            getReferenceClientRect: window.document.body.getBoundingClientRect
        });
    }

    SetupBackgroundAndMusic() {
        if (settings.change_background.value()) {
            document.body.style.backgroundImage = `url("https://raw.githubusercontent.com/PrettyCards/shops/main/img/shopkeeper_backgrounds/${this.id}.png")`;
        }

        if (settings.background_music.value() != "Off") {
            this.bgm.src = `https://raw.githubusercontent.com/PrettyCards/shops/main/audio/bgm/${this.id}.ogg`;
            //this.bgm.preload = true;
            if (settings.background_music.value() == "Auto") {
                this.bgm.play().catch((err) => {
                    console.log(err);
                    if (err.name === "NotAllowedError") {
                        this.PlayMusicManual(true);
                    }
                });
            } else {
                this.PlayMusicManual(false);
            }

            this.isPaused = false;
            this.didPlayBefore = this.IsBGMPlaying();
            plugin.events.on("PrettyCards:pauseBGM", function() {
                if (this.isPaused) {return;}
                this.didPlayBefore = this.IsBGMPlaying();
                this.isPaused = true;
                this.bgm.pause();
            }.bind(this));

            plugin.events.on("PrettyCards:resumeBGM", function() {
                this.isPaused = false;
                this.StartPlayingMusic();
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
        if (typeof(text) === "string") {
            text = [text];
        }
        for (var i=0; i < text.length; i++) {
            text[i] = this.dialoguePrefix + text[i];
        }
        this.lastDialogue = new TypedText(text, this.dialogueContainer, this.shopkeeperAnim);
        //console.log("NEW TEXT", this.lastDialogue, this);
    }

    AddDefaultExitPage() {
        this.AddMenuOption("exit", function() {
            if (!this.lastDialogue || this.lastDialogue.removed) {
                window.location.href = '/';
                return;
            }
            this.lastDialogue.onremove = function(source) {
                if (source == "END_OF_TEXT") {
                    window.location.href = '/';
                }
            }
        }.bind(this));
    }

}

export {Shop};