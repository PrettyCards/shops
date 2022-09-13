
import { Shop } from "../shop_layout";
import { StandardTalkScreen } from "../screens/standard_talk_screen";
import { us_loaded, addSetting, plugin } from "../underscript_checker";
import { ArtifactsScreen } from "../screens/artifacts_screen";
import { GersonAnimation } from "../shopkeeper_anims/gerson_anim";
import { CardSkinsScreen } from "../screens/card_skins_screen";

var card_skin_shop_setting = addSetting({
    'key': 'card_skin_shop_toggle',
    'name': 'Enable Card Skin Shop Override', // Name in settings page
    'type': 'boolean',
    'refresh': true, // true to add note "Will require you to refresh the page"
    'default': true, // default value
    'category': "Page Specific",
});

// TODO: Check the events. Replace artifact one with a card skin one.

if (us_loaded && card_skin_shop_setting.value() && underscript.onPage('CardSkinsShop')) {
    underscript.utils.compoundEvent("PrettyCardsShops:CSSReady", "PrettyCards:TranslationExtReady", "PrettyCards:onArtifacts", function () {
    //plugin.events.on("PrettyCardsShops:CSSReady PrettyCards:TranslationExtReady", function() {
        //plugin.events.emit.singleton("PrettyCards:customCards");
        var shop = new Shop("bunny");
        shop.RemoveEverythingElse();
        document.getElementsByClassName("mainContent")[0].appendChild(shop.container); // The order here is important, as the entire thing MUST be a part of the document before playing the song, as it may need the button, which needs tippy, and tippy doesn't like elements that are not part of the document.
        shop.SetupBackgroundAndMusic();
        shop.SetShopkeeperAnim(GersonAnimation);
        shop.AddMenuOption("buy");
        shop.AddMenuOption("promo");
        shop.AddMenuOption("talk");
        shop.AddDefaultExitPage();

        var shopScreen = new CardSkinsScreen(window.cardSkins, shop.GetPageElement(0));
        shopScreen.DisplayFewItemsInMiddle();
        shopScreen.ReorderData();
        shopScreen.data = shopScreen.orderedData; // Filters would not allow any of the new removed items to appear again, anyway.
        shopScreen.Render();
        /*
        plugin.events.on("PrettyCards:artBuySuccess", function(data) {
            shop.SetDialogue(window.$.i18n("pc-shops-gerson-dial-bought"));
            // shopScreen.Render(); // I'm gonna show I'm better than Onu!
            var artEle = shopScreen.container.querySelector(`.PrettyCards_ShopArtifactDisplay[artid="${data.idArtifact}"]`);
            if (artEle) {
                artEle.remove();
            }
        });
        plugin.events.on("PrettyCards:artBuyError", function() {
            shop.SetDialogue(window.$.i18n("pc-shops-gerson-dial-buyerror"));
        })
        */
        

        var checkScreen = new CardSkinsScreen(window.cardSkins, shop.GetPageElement(1), true);
        checkScreen.DisplayFewItemsInMiddle();
        checkScreen.ReorderData();
        checkScreen.Render();

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
        
    })
}