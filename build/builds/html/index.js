import { createEditorView } from "../base/index.js";
import { html } from "@codemirror/lang-html";

const language = html();

window.CMEditor = {
    createEditorView: function(doc, options) {
        return createEditorView(doc, language, options);
    }
};