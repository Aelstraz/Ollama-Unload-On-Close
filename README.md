# ollama-stop-on-close README
Automatically unloads any loaded ollama models when VSCode is closed, with a few configurations.

## Requirements

Requires Ollama.

## Extension Settings

* `ollamaUnloadOnClose.onlyCloseSessionModels`: Set to `true` to only unload models that were opened/loaded during this session.
* `ollamaUnloadOnClose.ignoreModels`: A list of models to ignore when unloading.

## Release Notes

### 1.0.0

Initial release of Ollama Stop on Close extension for VSCode.