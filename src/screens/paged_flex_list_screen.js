import { FlexListScreen } from "./flex_list_screen";

class PagedFlexListScreen extends FlexListScreen {

    constructor(data, parent) {
        super(data, parent);
        this.page = 0;
        this.entriesPerPage = 4;
        this.orderedData = [ ...this.data ];
        this.ReorderData();
    }

    ReorderData() {
        this.orderedData = this.orderedData.sort(this.OrderLogic.bind(this));
    }

    Render() {
        this.container.innerHTML = "";
        var start = this.page*this.entriesPerPage;
        var end = Math.min((this.page + 1)*this.entriesPerPage, this.orderedData.length);
        for (var i=start; i < end; i++) {
            var entry = this.orderedData[i];
            if (this.IsHidden(entry)) {
                return;
            }
            var ele = this.RenderEntry(entry);
            this.container.appendChild(ele);
            this.PostRenderEntity(entry, ele);
        }
    }

}

export {PagedFlexListScreen};