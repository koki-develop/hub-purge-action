# Hub Purge Action

[![GitHub release (latest by date)](https://img.shields.io/github/v/release/koki-develop/hub-purge-action)](https://github.com/koki-develop/hub-purge-action/releases/latest)
[![GitHub](https://img.shields.io/github/license/koki-develop/hub-purge-action)](./LICENSE)
[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/koki-develop/hub-purge-action/release.yml)](https://github.com/koki-develop/hub-purge-action/actions/workflows/release.yml)

Action to clear GitHub image caches.

# Usage

```yaml
- uses: koki-develop/hub-purge-action@main
  with:
    # Repository name with owner.
    # default - current repository
    repository: koki-develop/koki-develop

    # Branch name.
    # default - default branch
    branch: main

    # The path to the file containing the images for which you want to clear the cache.
    # Multiple paths can also be specified by separating them with a newline.
    # default - "README.md"
    path: path/to/README.md
    # path: |
    #   path/to/README.md
    #   path/to/README.ja.md
```

# LICENSE

[MIT](./LICENSE)
