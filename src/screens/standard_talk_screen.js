

class StandardTalkScreen {

    constructor(shop) {
        this.talkOptions = [];
        this.container = document.createElement("DIV");
        this.shop = shop;
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
                self.OnOptionPressed(option);
            };
            this.container.appendChild(ele);
        });
    }

    OnOptionPressed(option) {
        this.shop.SetDialogue(window.prettycards.translationManager.getStringOrList(option.dialogueKey));
        if (option.unlocks && option.unlocks !== "") {
            for (var i=0; i < this.talkOptions.length; i++) {
                var o = this.talkOptions[i];
                if (o.titleKey === this.unlocks) {
                    o.locked = false;
                    break;
                }
            }
        }
    }

}

export {StandardTalkScreen}