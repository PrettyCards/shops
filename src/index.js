
import { plugin } from "./underscript_checker";
import { Shop } from "./shop_layout";

import {} from "./pages/artifacts_page";
import {} from "./pages/card_skin_shop_page";

plugin.events.on("PrettyCards:onPageLoad", function() {
    window.$.getJSON("https://raw.githubusercontent.com/PrettyCards/shops/main/json/artist_icons.json", {}, function(data) {
        plugin.events.emit.singleton("PrettyCardsShop:artistIconsFetched", data);
    });
});