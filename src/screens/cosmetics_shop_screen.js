
import { CategorizedFlexListScreen } from "./categorized_flex_list_screen";

class CosmeticsShopScreen extends CategorizedFlexListScreen {

    RenderCategoryHeader(category_id) {
        var div = document.createElement("DIV");
        div.style = "width: 100%; padding: 0.8em;"
        div.innerHTML = `<span style="font-size: 2em;">${window.$.i18n(category_id)}</span>`;
        return div;
    }

    RenderEntry(entry) {
        var testP = document.createElement("P");
        testP.innerHTML = entry.name;
        return testP;
    }

}

export {CosmeticsShopScreen}