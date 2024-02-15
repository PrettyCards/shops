
import { Shop } from "../shop_layout";
import { StandardTalkScreen } from "../screens/standard_talk_screen";
import { us_loaded, addSetting, plugin } from "../underscript_checker";
import { ArtifactsScreen } from "../screens/artifacts_screen";
import { GersonAnimation } from "../shopkeeper_anims/gerson_anim";
import { CosmeticsShopScreen } from "../screens/cosmetics_shop_screen";

import css from "../css/Cosmetics.css";
plugin.events.on("PrettyCards:cssLoaderReady", () => {
    window.prettycards.loadCSS(css);
})

var cosm_setting = addSetting({
    'key': 'cosmetics_shop_toggle',
    'name': 'Enable Cosmetics Shop Override', // Name in settings page
    'type': 'boolean',
    'refresh': true, // true to add note "Will require you to refresh the page"
    'default': true, // default value
    'category': "Page Specific",
});

if (us_loaded && cosm_setting.value() && underscript.onPage('CosmeticsShop')) {
    underscript.utils.compoundEvent("PrettyCards:TranslationExtReady", function () {
        window.prettycards.cosmeticShop.GetData().then((cosmeticsData) => {
            var shop = new Shop("swatch");
            shop.RemoveEverythingElse();
            document.getElementsByClassName("mainContent")[0].appendChild(shop.container); // The order here is important, as the entire thing MUST be a part of the document before playing the song, as it may need the button, which needs tippy, and tippy doesn't like elements that are not part of the document.
            shop.SetupBackgroundAndMusic();
            shop.SetShopkeeperAnim(GersonAnimation);
            shop.AddMenuOption("buy");
            shop.AddMenuOption("wish");
            shop.AddMenuOption("talk");
            shop.AddDefaultExitPage();

            var shopScreen = new CosmeticsShopScreen(cosmeticsData, shop.GetPageElement(0));
            shopScreen.Render();

            plugin.events.on("PrettyCardsShops:CosmeticBuySuccess", function() {
                shop.SetDialogue(window.$.i18n("pc-shops-swatch-dial-bought"));
            })

            plugin.events.on("PrettyCardsShops:CosmeticBuyError", function() {
                shop.SetDialogue(window.$.i18n("pc-shops-swatch-dial-buyerror"));
            })

            /*
            var checkScreen = new CosmeticsShopScreen(cosmeticsData, shop.GetPageElement(1), true);
            checkScreen.Render();
            */

            var talkScreen = new StandardTalkScreen(shop);
            talkScreen.AddTalkFast("aboutyou", false, "unlocktest");
            talkScreen.AddTalkFast("emblem");
            talkScreen.AddTalkFast("unlocktest", true);

            var talkBase = shop.GetPageElement(2);
            talkBase.appendChild(talkScreen.container);
            talkScreen.Render();
            /*
            setTimeout(function() {
                shop.SetDialogue("[instant]Hi![w:500] I'm [style:red]Gerson[style:]![speed:500] [instant:off][style:cyan]\rNice to meet you![speed:33] \nNow I will have an insanely long monologue for testing purposes!");
            }, 500);
            */

        });

        window.prettycards.cosmeticShop.shopPlaySoundEvent = function(/**@type {HTMLButtonElement}*/ button, emoteName) {
            window.prettycards.playEmoteSound(emoteName, () => {
                button.setAttribute("disabled", true);
                button.classList.remove("btn-primary");
                button.classList.add("btn-danger");
            }, true);
        }
        
    })
}