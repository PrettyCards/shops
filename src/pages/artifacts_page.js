
import { Shop } from "../shop_layout";
import { us_loaded, addSetting } from "../underscript_checker";

var art_setting = addSetting({
    'key': 'artifacts_shops_toggle',
    'name': 'Enable Artifacts Shop Override', // Name in settings page
    'type': 'boolean',
    'refresh': true, // true to add note "Will require you to refresh the page"
    'default': true, // default value
});

if (us_loaded && art_setting.value() && underscript.onPage('Artifacts')) {
    var shop = new Shop();
    shop.AddMenuOption("Buy", "pc-shops-gerson-dial-buy");
    shop.AddMenuOption("Check", "pc-shops-gerson-dial-check");
    shop.AddMenuOption("Talk", "pc-shops-gerson-dial-talk");
    shop.AddMenuOption("Exit", "pc-shops-gerson-dial-exit");
    document.getElementsByClassName("mainContent")[0].prepend(shop.container);
    shop.SetDialogue("[instant]Hi![w:500] I'm [style:red]Gerson[style:]![speed:500] [instant:off][style:cyan]\rNice to meet you![speed:33] \nNow I will have an insanely long monologue for testing purposes!");
}