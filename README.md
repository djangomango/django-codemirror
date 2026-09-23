# Django-Codemirror

A modern Django integration package providing widgets and ModelAdmin mixins for CodeMirror 6 with support for configurable languages, themes, keymaps, and extensions.

---

## Installation

```bash
pip install git+https://github.com/djangomango/django-codemirror.git@0.1.0
```

Or add to your `requirements.txt`:

```txt
git+https://github.com/djangomango/django-codemirror.git@0.1.0
```

Add `django_codemirror` to your `INSTALLED_APPS` in `settings.py`:

```python
INSTALLED_APPS = [
    ...
    "django_codemirror",
    ...
]
```

---

## Usage

### 1. Form Field Widget

Attach the `CodeMirrorEditor` widget to form fields:

```python
from django import forms
from django_codemirror.widgets import CodeMirrorEditor


class SnippetForm(forms.Form):
    code = forms.CharField(
        widget=CodeMirrorEditor(
            language="python",
            options={"lineNumbers": True},
        )
    )
```

In your template:

```html
<head>
    {{ form.media }}
</head>
<body>
    <form method="post">
        {% csrf_token %}
        {{ form.code }}
        <button type="submit">Save</button>
    </form>
</body>
```

### 2. ModelAdmin Mixin

Automatically render CodeMirror for specified fields in the Django Admin:

```python
from django.contrib import admin
from django_codemirror.adminmixins import CodeMirrorModelAdminMixin
from .models import Snippet


@admin.register(Snippet)
class SnippetAdmin(CodeMirrorModelAdminMixin, admin.ModelAdmin):
    codemirror_fields = ["code"]
```

---

## Build (Optional)

To rebuild bundled CodeMirror 6 assets using Docker:

```bash
docker-compose -f docker-compose.yml run node npm run all
```

---

## License & Credits

- Licensed under the **GNU Lesser General Public License v3 (LGPLv3)**.
- Integrates [CodeMirror 6](https://codemirror.net/).