[![TestBuild][generaltest]](https://github.com/Naturalclar/issue-action) [![Assign][assigntest]](https://github.com/Naturalclar/issue-action) [![Label][labeltest]](https://github.com/Naturalclar/issue-action)

# Issue Action

Github action for automatically adding label or setting assignee when a new Issue or PR is opened.

## Usage

#### Title or Body

Choose whether you want to check for a keyword match in the issue `title`, the issue `body`, or `both`.

#### Parameters

Automatically set `BUG` label and assign `@username` when Issue contains `bug` or `error`.
Automatically set `help-wanted` label and assign `@username` when Issue contains `help` or `guidance`.

### Example
```yaml
name: "Set Issue Label and Assignee"
on:
  issues:
    types: [opened]
  pull_requests:
    typed: [opened]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: Naturalclar/issue-action@v1.0.0
        with:
          title-or-body: 'both'
          parameters: '[ {"keywords": ["bug", "error"], "labels": ["BUG"], "assignees": ["username"]}, {"keywords": ["help", "guidance"], "labels": ["help-wanted"], "assignees": ["username"]}]'
          github-token: "${{ secrets.GITHUB_TOKEN }}"
```

# Upgrading this package

When uploading github actions, `node_modules` and `lib` directories need to be commited.

Follow the steps below:

```sh
# create a new release branch
$ git checkout -b release/vX.X.X
```

Commentout the following lines in `.gitignore`

```
# comment this out distribution branches
node_modules/
lib
```

```
$ git add node_modules lib
$ git commit -a -m "release"
$ git push origin release/vX.X.X
```

[generaltest]: https://github.com/Naturalclar/issue-action/workflows/General%20Test/badge.svg
[assigntest]: https://github.com/Naturalclar/issue-action/workflows/Test%20Issue%20Assign/badge.svg
[labeltest]: https://github.com/Naturalclar/issue-action/workflows/Test%20Issue%20Label/badge.svg
