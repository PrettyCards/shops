
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
    shop.AddMenuOption("Buy");
    shop.AddMenuOption("Check");
    shop.AddMenuOption("Talk");
    shop.AddMenuOption("Exit");
    document.getElementsByClassName("mainContent")[0].prepend(shop.container);
}