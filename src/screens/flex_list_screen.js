
// This is merely a blueprint for future implementations of this kind of screen.

class FlexListScreen {
    
    constructor(data, parent) {
        this.data = data;
        this.everythingContainer = document.createElement("DIV");
        this.everythingContainer.className = "PrettyCards_ShopFlexList_Every";

        this.topContainer = document.createElement("DIV");
        this.topContainer.className = "PrettyCards_ShopFlexList_Top";
        this.bottomContainer = document.createElement("DIV");
        this.bottomContainer.className = "PrettyCards_ShopFlexList_Bottom";

        this.outerContainer = document.createElement("DIV");
        this.outerContainer.className = "PrettyCards_ShopFlexList_Outer";

        this.everythingContainer.appendChild(this.topContainer);
        this.everythingContainer.appendChild(this.outerContainer);
        this.everythingContainer.appendChild(this.bottomContainer);

        this.container = document.createElement("DIV");
        this.container.className = "PrettyCards_ShopFlexList";
        this.outerContainer.appendChild(this.container);

        if (parent) {
            parent.appendChild(this.everythingContainer);
        }

        this.RenderTop();    // Welp, I'm doing the same mistake again . . .
        this.RenderBottom(); // Whopde-doooooo!
    }

    // This is also a universal setting function. Once called, it's hard to revert it safely!
    DisplayFewItemsInMiddle() {
        this.outerContainer.className += " PrettyCards_ShopFlexList_OuterTrue";
    }

    NoScrollWheel() {
        this.everythingContainer.style.overflowY = "hidden";
    }

    // This is the only universal part.
    Render() {
        //console.log("RENDERING!", this.data);
        this.container.innerHTML = "";
        var orderedData = [ ...this.data ];
        orderedData = orderedData.sort(this.OrderLogic.bind(this));
        orderedData.forEach((entry) => {
            if (!this.IsHidden(entry)) {
                var ele = this.RenderEntry(entry);
                this.container.appendChild(ele);
                this.PostRenderEntity(entry, ele);
            }
        })
    }

    RenderTop() {

    }

    RenderBottom() {

    }

    RenderTopAndBottom() {
        this.RenderTop();
        this.RenderBottom();
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

    PostRenderEntity(entry, ele) {

    }

}

export {FlexListScreen}