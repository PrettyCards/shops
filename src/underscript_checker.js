
var us_loaded = false;
var plugin;
var settings = {};
var page_specific_settings = {};

function addSetting(data) {
    if (data.note && typeof(data.note) != "function") {
        data.note = `<div style="max-width: 600px;">${data.note}</div>`;
    }
    //data.category = categories[data.category || "misc"];
    var setting = plugin.settings().add(data);
    settings[data.key] = setting;
    if (data.category === "Page Specific") {
        page_specific_settings[data.key] = setting;
    }
    return setting;
}

if (underscript) {
    us_loaded = true;
    plugin = window.underscript.plugin("PrettyCards Shops");
}

if (us_loaded) {

    /*
    addSetting({
        'key': 'artifact_style',
        'name': 'Artifact Shop Style', // Name in settings page
        'type': 'select',
        'options': ["Boxes", "Shadow", "Onu", "None"],
        'note': 'When on, shopkeepers will not talk unless you press a Talk option.',
        'refresh': true, // true to add note "Will require you to refresh the page"
        'default': "Boxes", // default value
        'category' : "<span class='MYTHIC'>TEST PHASE</span>"
    });
    */

    addSetting({
        'key': 'animated_shopkeepers',
        'name': 'Animated Shopkeepers', // Name in settings page
        'type': 'boolean',
        'note': 'When on, shopkeepers will be animated in real time. If off, shopkeepers will only be represented by a still image.',
        'refresh': true, // true to add note "Will require you to refresh the page"
        'default': true, // default value
    });

    addSetting({
        'key': 'background_music',
        'name': 'Background Music', // Name in settings page
        'type': 'select',
        'options' : ["Auto", "Manual", "Off"],
        'note': 'Controls when and how to play background music for shops. Manual means that an icon will appear, prompting you to turn it on. If Auto fails due to autoplay prevention policies, Manual will take effect.',
        'refresh': true, // true to add note "Will require you to refresh the page"
        'default': "Auto", // default value
    });

    addSetting({
        'key': 'change_background',
        'name': 'Shopkeeper Background', // Name in settings page
        'type': 'boolean',
        'note': 'When on, shopkeepers will replace the page\'s background with their own background.',
        'refresh': true, // true to add note "Will require you to refresh the page"
        'default': true, // default value
    });

    addSetting({
        'key': 'silent_dialogue',
        'name': 'Silent Dialogue', // Name in settings page
        'type': 'boolean',
        'note': 'When on, shopkeeper dialogue will not have sound. Ever.',
        'refresh': true, // true to add note "Will require you to refresh the page"
        'default': false, // default value
    });

    addSetting({
        'key': 'mute_dialogue',
        'name': 'Mute Dialogue', // Name in settings page
        'type': 'boolean',
        'note': 'When on, shopkeepers will not talk unless you press a Talk option.',
        'refresh': true, // true to add note "Will require you to refresh the page"
        'default': false, // default value
    });

    addSetting({
        'key': 'all_shops_toggle',
        'name': 'Toggle All', // Name in settings page
        'type': 'boolean',
        'note': 'When changed, all other settings will be set to the value of this.',
        'refresh': true, // true to add note "Will require you to refresh the page"
        'default': true, // default value
        'category' : "Page Specific",
        'onChange' : function(newVal, oldVal) {
            for (var key in page_specific_settings) {
                console.log(key);
                var setting = page_specific_settings[key];
                if (key != "all_shops_toggle" && typeof(setting.value()) == "boolean") {
                    page_specific_settings[key].set(newVal);
                }
            }
        }
    });

    plugin.events.on("PrettyCards:onPageLoad", function() {
        window.prettycards.utility.addCSSSourceData("shops", {
            version: GM_info.script.version,
			eventName: "PrettyCardsShops:CommitCSSLoad",
			apiLink: "https://api.github.com/repos/PrettyCards/shops/commits",
			urlLinkFunc: (data, name) => `https://cdn.jsdelivr.net/gh/PrettyCards/shops@${data}/css/${name}.css`
		})
    })

    plugin.events.on("PrettyCards:registerTranslationSources", function() {
        window.prettycards.translationManager.addLanguageSource("PrettyCards:Shops", (lan) => `https://raw.githubusercontent.com/PrettyCards/shops/main/json/translation/${lan}.json`);
    })

} else {
    
}

//console.log(settings);

export {us_loaded, settings, plugin, addSetting}