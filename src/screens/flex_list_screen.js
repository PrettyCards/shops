
// This is merely a blueprint for future implementations of this kind of screen.

class FlexListScreen {
    
    constructor(data, parent) {
        this.data = data;
        this.container = document.createElement("DIV");
        this.container.className = "PrettyCards_ShopFlexList";
        if (parent) {
            parent.appendChild(this.container);
        }
    }

    // This is the only universal part.
    Render() {
        this.container.innerHTML = "";
        var orderedData = [ ...this.data ];
        orderedData = orderedData.sort(this.OrderLogic.bind(this));
        orderedData.forEach((entry) => {
            if (this.IsHidden(entry)) {
                return;
            }
            this.container.appendChild(this.RenderEntry(entry));
        })
    }

    OrderLogic(a, b) {
        return 0;
    }

    IsHidden(entry) {
        return false;
    }

    RenderEntry(entry) {
        var ele = document.createElement("DIV");
        ele.innerHTML = JSON.stringify(entry);
        return ele;
    } 

}

export {FlexListScreen}