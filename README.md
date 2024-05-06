# Django-Codemirror

This package provides widgets for CodeMirror 6 with ability to configure desired langauge, keymaps, and extensions.

### Installation

1. Pip install or add to your requirements.txt:

    ```bash
    pip install git+https://github.com/djangomango/django-codemirror.git@main
    ```

2. Add to INSTALLED_APPS:

    ```bash
    INSTALLED_APPS = [
        ...
        'django_codemirror',
    ]
    ```

### Build (optional)

Feel free to pull this repository and rebuild the codemirror assets. You can do so using Docker & docker-compose:

```bash
docker-compose -f docker-compose.yml run node npm run all
```