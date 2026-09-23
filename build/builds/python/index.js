import { createEditorView } from "../base/index.js";
import { python } from "@codemirror/lang-python";

const language = python();

window.CMEditor = {
    createEditorView: function(doc, options) {
        return createEditorView(doc, language, options);
    }
};