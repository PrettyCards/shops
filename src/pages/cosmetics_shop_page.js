
import { Shop } from "../shop_layout";
import { StandardTalkScreen } from "../screens/standard_talk_screen";
import { us_loaded, addSetting, plugin } from "../underscript_checker";
import { ArtifactsScreen } from "../screens/artifacts_screen";
import { GersonAnimation } from "../shopkeeper_anims/gerson_anim";

var cosm_setting = addSetting({
    'key': 'cosmetics_shop_toggle',
    'name': 'Enable Cosmetics Shop Override', // Name in settings page
    'type': 'boolean',
    'refresh': true, // true to add note "Will require you to refresh the page"
    'default': true, // default value
    'category': "Page Specific",
});

if (us_loaded && cosm_setting.value() && underscript.onPage('CosmeticsShop')) {
    window.prettycards.cosmeticShop.GetData().then((cosmeticsData) => {
        underscript.utils.compoundEvent("PrettyCardsShops:CSSReady", "PrettyCards:TranslationExtReady", function () {
            var shop = new Shop("swatch");
            shop.RemoveEverythingElse();
            document.getElementsByClassName("mainContent")[0].appendChild(shop.container); // The order here is important, as the entire thing MUST be a part of the document before playing the song, as it may need the button, which needs tippy, and tippy doesn't like elements that are not part of the document.
            shop.SetupBackgroundAndMusic();
            shop.SetShopkeeperAnim(GersonAnimation);
            var buyBtn = shop.AddMenuOption("buy");
            shop.AddMenuOption("check");
            shop.AddMenuOption("talk");
            shop.AddDefaultExitPage();
    
            var artifacts = window.prettycards.artifactDisplay.artifacts;
            var shopScreen = new ArtifactsScreen(artifacts, shop.GetPageElement(0));
    
            var notOwnedArtifactCount = 0;
            for (var i=0; i < artifacts.length; i++) {
                if (!shopScreen.IsHidden(artifacts[i])) {
                    notOwnedArtifactCount++;
                }
            }
    
            shopScreen.DisplayFewItemsInMiddle();
            plugin.events.on("PrettyCards:artBuySuccess", function(data) {
                notOwnedArtifactCount--;
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
    
            var oldOnClick = buyBtn.onclick;
            buyBtn.onclick = function(e) {
                //console.log(notOwnedArtifactCount, oldOnClick);
                if (notOwnedArtifactCount <= 0) {
                    shop.SetDialogue(window.$.i18n("pc-shops-gerson-dial-buyhasall"));
                } else {
                    oldOnClick(e);
                }
            }
    
            var checkScreen = new ArtifactsScreen(artifacts, shop.GetPageElement(1), true);
            checkScreen.DisplayFewItemsInMiddle();
            checkScreen.Render();
    
            artifacts.forEach((artifact) => {
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
    });
}