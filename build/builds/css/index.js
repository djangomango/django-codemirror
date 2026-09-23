import { createEditorView } from "../base/index.js";
import { css } from "@codemirror/lang-css";

const language = css();

window.CMEditor = {
    createEditorView: function(doc, options) {
        return createEditorView(doc, language, options);
    }
};