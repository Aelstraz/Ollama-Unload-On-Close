# Ollama Unload On Close

Automatically unloads any loaded ollama models when VSCode is closed, with a few configurations.

## Requirements

Requires Ollama.

## Extension Settings

* `ollamaUnloadOnClose.onlyCloseSessionModels`: Set to `true` to only unload models that were opened/loaded during this session.
* `ollamaUnloadOnClose.ignoreModels`: A list of models to ignore when unloading.

## Release Notes

### 0.0.2

Added command to unload models on demand.
Changed the unload session models setting to be on by default

### 0.0.1

Initial release of Ollama Unload on Close extension for VSCode.
