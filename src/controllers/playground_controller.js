import CodeMirror from "codemirror";
import dedent from "dedent";
import { transpile } from "../transpiler";

import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";

import { Controller } from "stimulus";
import { macroImports } from "../macro-import-mapping";
import sidebarTmpl from "../templates/sidebar.hbs";

export default class PlaygroundController extends Controller {
  constructor(...args) {
    super(...args);
    this.activeMacros = {
      "@ts-delight/pipe.macro": macroImports["@ts-delight/pipe.macro"]
    };
    this.computeInjectedImports();
    this.didTouch = false;
  }

  static get targets() {
    return [
      "sidebar",
      "editable",
      "editorPreview",
      "babelrcFile",
      "injectedImports",
      "editorPane"
    ];
  }

  connect() {
    this.previewEditor = CodeMirror(this.editorPreviewTarget, {
      mode: "javascript",
      readOnly: true
    });
    this.primaryEditor = CodeMirror(this.editableTarget, {
      mode: "javascript"
    });
    this.populatedInjectedImports();

    this.primaryEditor.on("change", () => {
      if (!this.isUpdating) {
        this.didTouch = true;
      }
      this.populateComputedOutput();
    });

    this.editorPaneTarget.addEventListener("click", () => {
      this.primaryEditor.focus();
    });
    this.populateSidebar();
    this.populateExampleContent();
  }

  populateSidebar() {
    this.sidebarTarget.innerHTML = sidebarTmpl({
      macroImports
    });
    Object.keys(this.activeMacros).forEach(key => {
      const checkBox = this.sidebarTarget.querySelector(
        `input[value="${key}"]`
      );
      if (checkBox) checkBox.setAttribute("checked", true);
    });
  }

  toggleSidebar() {
    if (this.sidebarTarget.classList.contains("hidden")) {
      this.sidebarTarget.classList.remove("hidden");
    } else {
      this.sidebarTarget.classList.add("hidden");
    }
    this.primaryEditor.refresh();
    this.previewEditor.refresh();
  }

  populateComputedOutput() {
    const content = this.primaryEditor.getValue();
    const finalContent = `${this.injectedImports}\n${content}`;
    try {
      const output = transpile(finalContent);
      this.previewEditor.setValue(output);
    } catch (e) {
      console.error(e);
      this.previewEditor.setValue(e.toString());
    }
  }

  toggleMacro(e) {
    const key = e.target.value;
    if (e.target.checked) {
      this.activeMacros[key] = macroImports[key];
    } else {
      delete this.activeMacros[key];
    }
    this.computeInjectedImports();
    this.populatedInjectedImports();
    if (!this.didTouch) {
      this.populateExampleContent();
    }
  }

  populateExampleContent() {
    this.isUpdating = true;
    this.primaryEditor.setValue(
      Object.entries(this.activeMacros)
        .map(([, macro]) => dedent(macro.example))
        .join("\n")
    );
    this.isUpdating = false;
  }

  populatedInjectedImports() {
    this.injectedImportsTarget.innerHTML = this.injectedImports;
  }

  computeInjectedImports() {
    this.injectedImports = Object.entries(this.activeMacros)
      .map(([key, macro]) => `import ${macro.const} from "${key}"`)
      .join("\n");
  }
}
