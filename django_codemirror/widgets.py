import json
from typing import Any

from django import forms
from django.conf import settings


class CodeMirrorEditor(forms.Textarea):
    """Form widget rendering CodeMirror in place of standard textareas."""

    def __init__(self, attrs: dict[str, Any] | None = None, **kwargs: Any) -> None:
        self.config: dict[str, Any] = {}
        if hasattr(settings, "CODEMIRROR_DEFAULTS"):
            self.config.update(settings.CODEMIRROR_DEFAULTS)

        self.config.update(kwargs)
        self.language = self.config.get("language", "html")
        self.options = self.config.get("options", {})

        if not attrs:
            attrs = {}
        attrs["data-codemirror"] = json.dumps(self.config)

        super().__init__(attrs)

    @property
    def media(self) -> forms.Media:
        """Return static JavaScript media required for CodeMirror rendering."""
        media = forms.Media(js=[f"codemirror/{self.language}/cm.min.js"])
        media += forms.Media(js=["codemirror/init.js"])
        return media
