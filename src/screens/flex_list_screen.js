
// This is merely a blueprint for future implementations of this kind of screen.

class FlexListScreen {
    
    constructor(data, parent) {
        this.data = data;
        this.outerContainer = document.createElement("DIV");
        this.outerContainer.className = "PrettyCards_ShopFlexList_Outer";
        this.container = document.createElement("DIV");
        this.container.className = "PrettyCards_ShopFlexList";
        this.outerContainer.appendChild(this.container)
        if (parent) {
            parent.appendChild(this.outerContainer);
        }
    }

    // This is also a universal setting function. Once called, it's hard to revert it safely!
    DisplayFewItemsInMiddle() {
        this.outerContainer.className += " PrettyCards_ShopFlexList_OuterTrue";
    }

    // This is the only universal part.
    Render() {
        //console.log("RENDERING!", this.data);
        this.container.innerHTML = "";
        var orderedData = [ ...this.data ];
        orderedData = orderedData.sort(this.OrderLogic.bind(this));
        orderedData.forEach((entry) => {
            if (this.IsHidden(entry)) {
                return;
            }
            //console.log("RENDERING ENTRY!", entry);
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