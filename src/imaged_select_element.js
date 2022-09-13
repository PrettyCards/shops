import { plugin } from "./underscript_checker";

plugin.events.on("PrettyCards:onPageLoad", function() {
    window.prettycards.utility.loadCSSFromGH("ImageSelect", "shops")//.then(plugin.events.emit("PrettyCardsShops:CSSReady"));
})

class ImagedSelect {

    construstor() {
        this.button = document.createElement("DIV");
        this.button.className = "PrettyCards_ImagedSelectButton";

        this.dropdown = document.createElement("DIV");
        this.dropdown.className = "PrettyCards_ImagedSelectDropdown";

        this.button.appendChild(dropdown);

        this.value = null;
        this.onchange = function() {};
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
        }.bind(this);

        this.dropdown.appendChild(optionEle);
        if (this.value == null) {
            this.SetValue(value, false);
        }
        return optionEle;
    }

    SetValue(value, updateEvents = true) {
        var option = this.dropdown.querySelector(`.PrettyCards_ImagedSelectOption[value="${value}"]`);
        if (!option) {
            return;
        }
        var imageUrl = option.getAttribute("imageUrl");
        this.value = value;
        this.button.style.backgroundImage = `url("${imageUrl}")`;
        if (updateEvents) {
            this.onchange(value, imageUrl);
        }
    }

}

export {ImagedSelect}