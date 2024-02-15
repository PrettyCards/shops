
import { plugin, us_loaded } from "./underscript_checker";
import { Shop } from "./shop_layout";

import {} from "./pages/artifacts_page";
import {} from "./pages/card_skin_shop_page";
import {} from "./pages/cosmetics_shop_page";
import {} from "./pages/packs_page";

import { TypedText } from "./text_engine";

if (us_loaded) {

    var lastPreviewTypedText;

    plugin.events.on("PrettyCards:registerTranslationSources", function() {
        window.prettycards.translationManager.addLanguageSource("PrettyCards:Shops", (lan) => `https://raw.githubusercontent.com/PrettyCards/shops/main/json/translation/${lan}.json`);
        window.prettycards.translationManager.addPreviewType("typed_shop_dialogue", /pc-shops-.*-(dial|(talk(?!-title)))-.+/, (str) => {
            var button = document.createElement("BUTTON");
            button.className = "btn btn-primary";
            button.innerHTML = "Click for preview!";
            button.onclick = function() {
                var parent = document.createElement("DIV");
                parent.style = "width: 500px; background: black; border: 5px solid white; font-size: 1.5em; padding: 0.2em;"
                lastPreviewTypedText = new TypedText(str, parent, null);
                this.parentElement.appendChild(parent);
                this.remove();
            }
            return button;
        }, 5, () => {
            // OnRemove!
            if (lastPreviewTypedText && !lastPreviewTypedText.removed) {
                lastPreviewTypedText.Remove();
            }
        });
    })

    plugin.events.on("PrettyCards:onPageLoad", function() {
        window.$.getJSON("https://raw.githubusercontent.com/PrettyCards/shops/main/json/artist_icons.json", {}, function(data) {
            plugin.events.emit.singleton("PrettyCardsShop:artistIconsFetched", data);
        });
    });
}

