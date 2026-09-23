from typing import Any

from django.contrib import admin
from django.db import models
from django.forms import Field

from .widgets import CodeMirrorEditor


class CodeMirrorModelAdminMixin(admin.ModelAdmin):
    """Admin mixin replacing text fields with CodeMirror editor widgets."""

    codemirror_fields: str | list[str] | tuple[str, ...] = "__all__"

    def formfield_for_dbfield(
        self, db_field: models.Field, *args: Any, **kwargs: Any
    ) -> Field | None:
        """Attach CodeMirror widget for configured fields."""
        if self.codemirror_fields == "__all__":
            if isinstance(db_field, models.TextField):
                kwargs["widget"] = CodeMirrorEditor()
        elif db_field.name in self.codemirror_fields:
            kwargs["widget"] = CodeMirrorEditor()

        return super().formfield_for_dbfield(db_field, *args, **kwargs)
