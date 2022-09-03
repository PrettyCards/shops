

class TypedText {

    constructor(text) {
        this.speed = 33; // The miliseconds between displaying letters.
        this.nextWait = this.speed;
        this.container = document.createElement("DIV");
        this.StartNewSpan("");
        this.text = text;
        this.currentPage = 0;
        this.currentLetter = 0;
        if (typeof(text) == "string") {
            this.text = [text];
        }
        this.InitTextCommands();
        this.TimeLoop();
    }

    InitTextCommands() {
        // Returns true if a new iteration of the Progress function should be called immediately after.
        this.textCommands = {
            style: (className) => {
                this.StartNewSpan(className);
                return true;
            },
            speed: (ms) => {
                this.speed = Number(ms);
                return false;
            },
            w: (ms) => {
                this.nextWait += ms;
                return false;
            }
        }
    }

    Remove() {
        clearTimeout(this.lastTimeout);
        this.container.remove();
    }

    StartNewSpan(className) {
        this.currentSpan = document.createElement("SPAN");
        this.currentSpan.className = className;
        this.container.appendChild(this.currentSpan);
        return this.currentSpan;
    }

    Progress() {
        var currStr = this.text[this.currentPage];
        var isSkipped = this.currentLetter > 0 && currStr.charAt(this.currentLetter-1) === "\\";
        var nextChar = currStr.charAt(this.currentLetter);
        // "[" indicated the beginning of a command UNLESS skipped, therefore should be redirected to the outer if's "else" part.
        // "\\" indicates the skipping of a character (unless skipped), but it should not be displayed, therefore nothing should happen in that case.
        if (nextChar !== "[" || isSkipped) {
            if (nextChar !== "\\" || isSkipped) {
                this.currentSpan.innerHTML += nextChar;
            }
            this.currentLetter++;
        } else {
            // Command Code. Buckle up, cuz this will be a wild ride!
            var commandEnd = currStr.indexOf("]", this.currentLetter);
            if (commandEnd < 0) {
                throw "Error in command parsing for string: " + currStr;
            }
            var commandStr = currStr.substring(this.currentLetter, commandEnd + 1);
            console.log(commandStr);
            var argSepPos = commandStr.indexOf(":");
            var cmdName;
            var cmdArg;
            if (argSepPos < 0) {
                cmdName = commandStr.substring(1, commandStr.length-1);
            } else {
                cmdName = commandStr.substring(1, argSepPos);
                cmdArg = commandStr.substring(argSepPos + 1, commandStr.length-1);
            }

            this.currentLetter = commandEnd + 1;

            var cmdFunc = this.textCommands[cmdName];
            if (!cmdFunc) {
                throw `Invalid command name "${cmdName}" in string: ${currStr}`;
            }
            if (cmdFunc(cmdArg)) {
                this.Progress();
            }
        }
        console.log("LETTER: " + this.currentLetter);
    }

    TimeLoop() {
        this.lastTimeout = setTimeout(function() {
            this.nextWait = this.speed;
            this.Progress();
            this.TimeLoop();
        }.bind(this), this.nextWait);
    }

}

export {TypedText};