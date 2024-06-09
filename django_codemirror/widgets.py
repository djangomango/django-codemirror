import json

from django import forms
from django.conf import settings


class CodeMirrorEditor(forms.Textarea):
    """
    Form widget that renders as a standard <textarea> but also includes the
    relevant static files that convert it into a CodeMirror editor.
    """

    def __init__(self, attrs=None, **kwargs):
        self.config = {}
        if hasattr(settings, 'CODEMIRROR_DEFAULTS'):
            self.config.update(settings.CODEMIRROR_DEFAULTS)

        self.config.update(kwargs)
        self.language = self.config.get('language', 'html')
        self.options = self.config.get('options', {})

        if not attrs:
            attrs = {}
        attrs['data-codemirror'] = json.dumps(self.config)

        super().__init__(attrs)

    @property
    def media(self):
        media = forms.Media(
            js=[f"codemirror/{self.language}/cm.min.js"]
        )

        media += forms.Media(js=['codemirror/init.js'])

        return media
