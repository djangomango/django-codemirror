const codeMirror = (function() {
	'use strict';

	const initCodeMirror = function (textarea) {
		let options = JSON.parse(textarea.dataset.codemirror);
		let view = CMEditor.createEditorView(textarea.value, options)
		textarea.parentNode.insertBefore(view.dom, textarea)
		textarea.style.display = "none"
		if (textarea.form) textarea.form.addEventListener("submit", () => {
			textarea.value = view.state.doc.toString()
		})
		return view
	};

	document.addEventListener('DOMContentLoaded', () => {
		document.querySelectorAll('textarea[data-codemirror]').forEach(initCodeMirror);
	});

	return {
		initMirror: initCodeMirror
	};
})();