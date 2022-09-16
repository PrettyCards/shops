import { plugin } from "./underscript_checker";

plugin.events.on("PrettyCards:onPageLoad", function() {
    window.prettycards.utility.loadCSSFromGH("ImageSelect", "shops")//.then(plugin.events.emit("PrettyCardsShops:CSSReady"));
})

class ImagedSelect {

    constructor() {
        this.button = document.createElement("BUTTON");
        this.button.className = "PrettyCards_ImagedSelectButton";

        this.dropdown = document.createElement("DIV");
        this.dropdown.className = "PrettyCards_ImagedSelectDropdown";

        //this.button.appendChild(this.dropdown);

        this.button.onclick = this.ToggleDropdown.bind(this);
        this.button.onfocusout = function() { // Need to delay it a little so the switching is registered.
            setTimeout(() => {
                this.RemoveDropdown();
            }, 100);
        }.bind(this);

        this.value = null;
        this.onchange = function() {};
    }

    DisplayDropdown() {
        if (this.IsDisplayed()) {
            return;
        }
        var buttonPos = window.prettycards.utility.getCoordsRelativeToDocument(this.button);
        document.body.appendChild(this.dropdown);
        this.dropdown.style.top = (buttonPos.top + buttonPos.height) + "px";
        this.dropdown.style.left = buttonPos.left + "px";
    }

    RemoveDropdown() {
        if (!this.IsDisplayed()) {
            return;
        }
        this.dropdown.remove();
    }

    ToggleDropdown() {
        if (this.IsDisplayed()) {
            this.RemoveDropdown();
        } else {
            this.DisplayDropdown();
        }
    }

    IsDisplayed() {
        return document.body.contains(this.dropdown);
    }

    AddOption(value, imageUrl, displayText = "") {
        var optionEle = document.createElement("DIV");
        optionEle.className = "PrettyCards_ImagedSelectOption";
        optionEle.setAttribute("value", value);
        optionEle.setAttribute("imageUrl", imageUrl);
        if (imageUrl && imageUrl.length > 0) {
            optionEle.innerHTML += `<img src="${imageUrl}">`;
        }
        optionEle.innerHTML += displayText;
        optionEle.onclick = function() {
            this.SetValue(value);
            this.RemoveDropdown();
        }.bind(this);

        this.dropdown.appendChild(optionEle);
        if (this.value == null) {
            this.SetValue(value, false);
        }
        return optionEle;
    }

    SetValue(value, updateEvents = true) {
        var option = this.dropdown.querySelector(`.PrettyCards_ImagedSelectOption[value="${value}"]`);
        //console.log("Setting Value To", option);
        if (!option) {
            return;
        }
        var imageUrl = option.getAttribute("imageUrl");
        this.value = value;
        this.button.style.backgroundImage = `url("${imageUrl}")`;
        if (!imageUrl || imageUrl.length < 0) {
            this.button.innerHTML = option.innerText;
        } else {
            this.button.innerHTML = "";
        }
        if (updateEvents) {
            this.onchange(value, imageUrl);
        }
    }

    GetValue() {
        return this.value;
    }

}

export {ImagedSelect}