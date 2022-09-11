

class StandardTalkScreen {

    constructor(shop) {
        this.talkOptions = [];
        this.container = document.createElement("DIV");
        this.container.className = "PrettyCards_SimpleTalkScreen";
        this.shop = shop;
    }

    AddTalkFast(id, locked = false, unlocks = []) {
        if (typeof(unlocks) == "string") {
            unlocks = [unlocks];
        }
        unlocks = unlocks.map((u) => `pc-shops-${this.shop.id}-talk-title-${u}`);
        this.AddTalkOption(`pc-shops-${this.shop.id}-talk-title-${id}`, `pc-shops-${this.shop.id}-talk-${id}`, locked, unlocks);
    }

    AddTalkOption(titleKey, dialogueKey, locked = false, unlocks = []) {
        if (typeof(unlocks) == "string") {
            unlocks = [unlocks];
        }
        var option = {
            titleKey : titleKey,
            dialogueKey : dialogueKey,
            locked: locked,
            unlocks: unlocks,
            classes : []
        }
        this.talkOptions.push(option);
        return option;
    }

    Render() {
        const self = this;
        this.container.innerHTML = "";
        this.talkOptions.forEach((option) => {
            if (option.locked) {
                return;
            }
            var ele = document.createElement("DIV");
            ele.className = "PrettyCards_ShopTalkOption " + option.classes.join(" ");
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

        var refreshPage = false;
        var index = option.classes.indexOf("PrettyCards_ShopDialogueNew");
        if (index > -1) {
            refreshPage = true;
            option.classes.splice(index, 1);
        }

        if (option.unlocks && option.unlocks.length > 0) {
            refreshPage = true;
            for (var i=0; i < this.talkOptions.length; i++) {
                var o = this.talkOptions[i];
                if (option.unlocks.includes(o.titleKey)) {
                    o.classes.push("PrettyCards_ShopDialogueNew");
                    o.locked = false;
                }
            }
        }

        dialogue.onremove = function() {
            this.shop.UnlockButtons();
            this.UnlockButtons();
            if (refreshPage) {
                this.Render();
            }
        }.bind(this);
    }

}

export {StandardTalkScreen}