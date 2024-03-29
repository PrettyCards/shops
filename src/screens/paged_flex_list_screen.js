import { FlexListScreen } from "./flex_list_screen";

class PagedFlexListScreen extends FlexListScreen {

    constructor(data, parent) {
        super(data, parent);
        this.page = 0;
        this.entriesPerPage = 4;
        this.orderedData = [ ...this.data ];
        this.tippys = []; // An array of tippy popups that should be hidden then the page changes. Has to be populated manually :(

        // To anyone reading: DON'T get used to me copying Onu's code!
        window.$(this.everythingContainer).on('mousewheel DOMMouseScroll', function(e) {
            e.preventDefault();
            e.stopPropagation();
            if (typeof e.originalEvent.detail === 'number' && e.originalEvent.detail !== 0) {
                if (e.originalEvent.detail > 0) {
                    this.PageDown();
                } else if (e.originalEvent.detail < 0) {
                    this.PageUp();
                }
            } else if (typeof e.originalEvent.wheelDelta === 'number') {
                if (e.originalEvent.wheelDelta < 0) {
                    this.PageDown();
                } else if (e.originalEvent.wheelDelta > 0) {
                    this.PageUp();
                }
            }
        }.bind(this));
    }

    ReorderData() {
        this.ApplyFilters();
        this.orderedData = this.orderedData.sort(this.OrderLogic.bind(this));
        this.data = this.orderedData;
    }

    ApplyFilters() {
        this.orderedData = [];
        this.data.forEach((entry) => {
            if (!this.IsHidden(entry)) {
                this.orderedData.push(entry);
            }
        })
    }

    PageUp() {
        this.GoToPage(this.page - 1);
    }

    PageDown() {
        this.GoToPage(this.page + 1);
    }

    GoToPage(nr) {
        this.RemoveAllTippys();
        var maxPage = Math.floor(this.orderedData.length/this.entriesPerPage);
        this.page = nr;
        if (this.page < 0) {
            this.page = 0;
        }
        if (this.page > maxPage) {
            this.page = maxPage;
        }

        if (this.topArrow && this.bottomArrow) {
            this.topArrow.disabled = this.page <= 0;
            this.bottomArrow.disabled = this.page >= maxPage;
        }
        this.Render();
    }

    Render() {
        this.container.innerHTML = "";
        var start = this.page*this.entriesPerPage;
        var end = Math.min((this.page + 1)*this.entriesPerPage, this.orderedData.length);
        for (var i=start; i < end; i++) {
            var entry = this.orderedData[i];
            var ele = this.RenderEntry(entry);
            this.container.appendChild(ele);
            this.PostRenderEntity(entry, ele);
        }
    }

    RenderTop() {
        this.topArrow = document.createElement("BUTTON");
        this.topArrow.className = "PrettyCards_PagesFlexList_TopArrow glyphicon glyphicon-chevron-up";
        this.topArrow.onclick = this.PageUp.bind(this);
        // Insert functionality here.

        this.topContainer.appendChild(this.topArrow);
    }

    RenderBottom() {
        this.bottomArrow = document.createElement("BUTTON");
        this.bottomArrow.className = "PrettyCards_PagesFlexList_BottomArrow glyphicon glyphicon-chevron-down";
        this.bottomArrow.onclick = this.PageDown.bind(this);
        // Insert functionality here.

        this.bottomContainer.appendChild(this.bottomArrow);
    }

    // This is to shorten filter button code.
    FiltersAndGoto() {
        this.ApplyFilters();
        this.GoToPage(0);
    }

    RemoveAllTippys() {
        this.tippys.forEach((tippy) => {
            tippy.hide();
        })
    }

    AddTippy(tippy) {
        this.tippys.push(tippy);
    }

}

export {PagedFlexListScreen};