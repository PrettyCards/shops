
import { Shop } from "../shop_layout";
import { StandardTalkScreen } from "../screens/standard_talk_screen";
import { us_loaded, addSetting, plugin } from "../underscript_checker";
import { ArtifactsScreen } from "../screens/artifacts_screen";
import { ShopkeeperAnimBase } from "../shopkeeper_anims/shopkeep_anim_base";
import { GersonAnimation } from "../shopkeeper_anims/gerson_anim";

var art_setting = addSetting({
    'key': 'artifacts_shops_toggle',
    'name': 'Enable Artifacts Shop Override', // Name in settings page
    'type': 'boolean',
    'refresh': true, // true to add note "Will require you to refresh the page"
    'default': true, // default value
    'category': "Page Specific",
});

if (us_loaded && art_setting.value() && underscript.onPage('Artifacts')) {
    underscript.utils.compoundEvent("PrettyCardsShops:CSSReady", "PrettyCards:TranslationExtReady", "PrettyCards:onArtifacts", function () {
    //plugin.events.on("PrettyCardsShops:CSSReady PrettyCards:TranslationExtReady", function() {
        //plugin.events.emit.singleton("PrettyCards:customCards");
        var shop = new Shop("gerson");
        shop.RemoveEverythingElse();
        document.getElementsByClassName("mainContent")[0].appendChild(shop.container);
        shop.SetupBackgroundAndMusic();
        shop.SetShopkeeperAnim(GersonAnimation);
        shop.AddMenuOption("buy");
        shop.AddMenuOption("check");
        shop.AddMenuOption("talk");
        shop.AddMenuOption("exit", function() {
            shop.lastDialogue.onremove = function(source) {
                if (source == "END_OF_TEXT") {
                    window.location.href = '/';
                }
            }
        });
        

        var shopScreen = new ArtifactsScreen(window.prettycards.artifactDisplay.artifacts, shop.GetPageElement(0));
        shopScreen.DisplayFewItemsInMiddle();
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
        shopScreen.Render();

        var checkScreen = new ArtifactsScreen(window.prettycards.artifactDisplay.artifacts, shop.GetPageElement(1), true);
        checkScreen.DisplayFewItemsInMiddle();
        checkScreen.Render();

        window.prettycards.artifactDisplay.artifacts.forEach((artifact) => {
            window.tippy(`[artid="${artifact.id}"]`, {
                content: `<span class="${artifact.rarity}">${window.$.i18n("artifact-name-" + artifact.id)}</span>`,
                allowHTML: true,
                arrow: true,
                inertia: true,
                placement: "top",
                appendTo: window.document.body,
                boundary: 'window',
                getReferenceClientRect: window.document.body.getBoundingClientRect
            });
        })
        

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