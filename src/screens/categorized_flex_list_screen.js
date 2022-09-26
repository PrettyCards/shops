import { FlexListScreen } from "./flex_list_screen";

class CategorizedFlexListScreen extends FlexListScreen {

    constructor(data, parent) {
        super(data, parent);
        this.category_objects = {};
        this.categoryFunc = (entry) => entry.category;
    }

    Render() {
        this.container.innerHTML = "";
        var orderedData = [ ...this.data ];
        orderedData = orderedData.sort(this.OrderLogic.bind(this));
        orderedData.forEach((entry) => {
            if (this.IsHidden(entry)) {
                return;
            }
            var category = this.categoryFunc(entry);
            if (!this.category_objects[category]) {
                this.RenderCategory(category);
            } 
            //console.log("RENDERING ENTRY!", entry);
            var ele = this.RenderEntry(entry);
            this.category_objects[category].appendChild(ele);
            this.PostRenderEntity(entry, ele);
        })
    }

    RenderCategory(category) {
        var header = this.RenderCategoryHeader(category);
        this.container.appendChild(header);
        var section = document.createElement("DIV");
        this.section.className = "PrettyCards_CategorizedFlexScreenSection";
        this.container.appendChild(section);
        this.category_objects[category] = section;
    }

    RenderCategoryHeader(category_id) {

    }

}

export {CategorizedFlexListScreen};