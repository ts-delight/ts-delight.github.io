import { Controller } from "stimulus";

export class TabController extends Controller {
  static get targets() {
    return ["tabThumb", "tabBody"];
  }

  activateTabThumb(tabId) {
    this.tabThumbTargets.forEach(t => {
      if (t.dataset.tabId === tabId) {
        t.classList.add("active");
      } else {
        t.classList.remove("active");
      }
    });
  }

  activateTabBody(tabId) {
    this.tabBodyTargets.forEach(t => {
      if (t.dataset.tabId === tabId) {
        t.classList.remove("hidden");
      } else {
        t.classList.add("hidden");
      }
    });
  }

  switchTab(event) {
    const { tabId } = event.target.dataset;
    this.activateTabThumb(tabId);
    this.activateTabBody(tabId);
  }
}
