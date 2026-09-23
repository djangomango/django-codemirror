import {EditorState} from '@codemirror/state';
import {highlightSelectionMatches} from '@codemirror/search';
import {indentWithTab, history, defaultKeymap, historyKeymap} from '@codemirror/commands';
import {
    foldGutter,
    indentOnInput,
    bracketMatching,
    foldKeymap,
    syntaxHighlighting,
    defaultHighlightStyle
} from '@codemirror/language';
import {closeBrackets, autocompletion, closeBracketsKeymap, completionKeymap} from '@codemirror/autocomplete';
import {
    lineNumbers,
    highlightActiveLineGutter,
    highlightSpecialChars,
    drawSelection,
    rectangularSelection,
    crosshairCursor,
    highlightActiveLine,
    keymap,
    EditorView
} from '@codemirror/view';

const optionMappings = {
    'keymaps': {
        'indentWithTab': indentWithTab,
        'closeBracketsKeymap': closeBracketsKeymap,
        'defaultKeymap': defaultKeymap,
        'historyKeymap': historyKeymap,
        'foldKeymap': foldKeymap,
        'completionKeymap': completionKeymap
    },
    'extensions': {
        'highlightSelectionMatches': highlightSelectionMatches(),
        'bracketMatching': bracketMatching(),
        'closeBrackets': closeBrackets(),
        'highlightActiveLine': highlightActiveLine(),
        'lineNumbers': lineNumbers(),
        'highlightActiveLineGutter': highlightActiveLineGutter(),
        'highlightSpecialChars': highlightSpecialChars(),
        'history': history(),
        'foldGutter': foldGutter(),
        'drawSelection': drawSelection(),
        'indentOnInput': indentOnInput(),
        'autocompletion': autocompletion(),
        'rectangularSelection': rectangularSelection(),
        'crosshairCursor': crosshairCursor(),
        'allowMultipleSelections': EditorState.allowMultipleSelections.of(true),
        'defaultHighlightStyle': syntaxHighlighting(defaultHighlightStyle, {fallback: true}),
    }
};

function createEditorState(initialContents, language = null, options = {}) {
    const keymaps = (options.keymaps || []).map(keymapName => optionMappings.keymaps[keymapName]).filter(Boolean);
    const extensions = (options.extensions || []).map(extensionName => optionMappings.extensions[extensionName]).filter(Boolean);

    if (language) {
        extensions.push(language);
    }

    return EditorState.create({
        doc: initialContents,
        extensions: [
            keymap.of(keymaps),
            ...extensions
        ]
    });
}

function createEditorView(doc, language, options) {
    const state = createEditorState(doc, language, options);
    return new EditorView({state});
}

export { createEditorView };