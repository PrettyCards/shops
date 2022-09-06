
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

    addSetting({
        'key': 'animated_shopkeepers',
        'name': 'Animated Shopkeepers', // Name in settings page
        'type': 'boolean',
        'note': 'When on, shopkeepers will be animated in real time. If off, shopkeepers will only be represented by a still image.',
        'refresh': true, // true to add note "Will require you to refresh the page"
        'default': true, // default value
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
			eventName: "PrettyCardsShops:CommitCSSLoad",
			apiLink: "https://api.github.com/repos/PrettyCards/shops/commits",
			urlLinkFunc: (data, name) => `https://cdn.jsdelivr.net/gh/PrettyCards/shops@${data}/css/${name}.css`
		})
    })

} else {
    
}

console.log(settings);

export {us_loaded, settings, plugin, addSetting}