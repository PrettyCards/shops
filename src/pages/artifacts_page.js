
import { Shop } from "../shop_layout";
import { StandardTalkScreen } from "../standard_talk_screen";
import { us_loaded, addSetting, plugin } from "../underscript_checker";

var art_setting = addSetting({
    'key': 'artifacts_shops_toggle',
    'name': 'Enable Artifacts Shop Override', // Name in settings page
    'type': 'boolean',
    'refresh': true, // true to add note "Will require you to refresh the page"
    'default': true, // default value
});

if (us_loaded && art_setting.value() && underscript.onPage('Artifacts')) {
    underscript.utils.compoundEvent("PrettyCardsShops:CSSReady", "PrettyCards:TranslationExtReady", function () {
    //plugin.events.on("PrettyCardsShops:CSSReady PrettyCards:TranslationExtReady", function() {
        var shop = new Shop("gerson");
        shop.AddMenuOption("buy");
        shop.AddMenuOption("check");
        shop.AddMenuOption("talk");
        shop.AddMenuOption("exit");
        document.getElementsByClassName("mainContent")[0].prepend(shop.container);

        var talkScreen = new StandardTalkScreen(shop);
        talkScreen.AddTalkOption("pc-shops-gerson-talk-title-aboutyou", "pc-shops-gerson-talk-aboutyou");

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