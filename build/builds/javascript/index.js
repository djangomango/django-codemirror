import { createEditorView } from "../base/index.js";
import { javascript } from "@codemirror/lang-javascript";

const language = javascript();

window.CMEditor = {
    createEditorView: function(doc, options) {
        return createEditorView(doc, language, options);
    }
};