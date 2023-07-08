
class Voice {

    constructor() {
        this.sources = [];
    }

    AddSourceFast(name) {
        this.AddSource(`https://raw.githubusercontent.com/PrettyCards/shops/main/audio/voices/${name}.ogg`);
    }

    AddSource(src) {
        this.sources.push(src);
    }

    GetRandomSource() {
        //console.log(this.sources);
        return window.prettycards.utility.getRandomFromArray(this.sources);
    }

    Preload() {
        this.sources.forEach((src) => {
            // The error is usually just "yOu ShOuLd NoT pLaY aUdIo BeFoRe InTeRaCtInG wItH tHe PaGe"
            window.prettycards.utility.preloadAudio(src).catch(()=>{});
        })
    }

}

class VoiceDictionary {

    constructor() {
        this.voices = {};
    }

    AddVoice(name = "", sources = [], fast = true) {
        if (this.voices[name]) {
            return;
        }
        var voice = new Voice();
        if (typeof(sources) == "string") {
            sources = [sources];
        }
        var fnc;
        if (fast) {
            fnc = (src) => {voice.AddSourceFast(src)};
        } else {
            fnc = (src) => {voice.AddSource(src)};
        }
        sources.forEach(fnc);
        this.voices[name] = voice;
        voice.Preload();
        return voice;
    }

    GetVoice(name) {
        return this.voices[name];
    }

}

var voiceDictionary = new VoiceDictionary();

export {voiceDictionary};