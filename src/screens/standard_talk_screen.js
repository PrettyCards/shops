

class StandardTalkScreen {

    constructor(shop) {
        this.talkOptions = [];
        this.container = document.createElement("DIV");
        this.container.className = "PrettyCards_SimpleTalkScreen";
        this.shop = shop;
    }

    AddTalkFast(id, locked = false, unlocks = "") {
        this.AddTalkOption(`pc-shops-${this.shop.id}-talk-title-${id}`, `pc-shops-${this.shop.id}-talk-${id}`, locked, unlocks);
    }

    AddTalkOption(titleKey, dialogueKey, locked = false, unlocks = "") {
        this.talkOptions.push({
            titleKey : titleKey,
            dialogueKey : dialogueKey,
            locked: locked,
            unlocks: ""
        })
    }

    Render() {
        const self = this;
        this.container.innerHTML = "";
        this.talkOptions.forEach((option) => {
            if (option.locked) {
                return;
            }
            var ele = document.createElement("DIV");
            ele.className = "PrettyCards_ShopTalkOption";
            ele.innerHTML = window.$.i18n(option.titleKey);
            ele.onclick = function() {
                if (this.hasAttribute("disabled")) {
                    return;
                }
                self.OnOptionPressed(option);
            };
            this.container.appendChild(ele);
        });
    }

    LockButtons() {
        var children = this.container.children;
        for (var i=0; i < children.length; i++) {
            var child = children[i];
            child.setAttribute("disabled", true);
        }
    }

    UnlockButtons() {
        var children = this.container.children;
        for (var i=0; i < children.length; i++) {
            var child = children[i];
            child.removeAttribute("disabled");
        }
    }

    OnOptionPressed(option) {
        this.shop.SetDialogue(window.prettycards.translationManager.getStringOrList(option.dialogueKey), true);
        var dialogue = this.shop.lastDialogue;
        this.shop.LockButtons();
        this.LockButtons();

        var unlockedNewDialogue = false;
        if (option.unlocks && option.unlocks !== "") {
            unlockedNewDialogue = true;
            for (var i=0; i < this.talkOptions.length; i++) {
                var o = this.talkOptions[i];
                if (o.titleKey === this.unlocks) {
                    o.locked = false;
                    break;
                }
            }
        }

        dialogue.onremove = function() {
            this.shop.UnlockButtons();
            this.UnlockButtons();
            if (unlockedNewDialogue) {
                this.Render();
            }
        }.bind(this);
    }

}

export {StandardTalkScreen}