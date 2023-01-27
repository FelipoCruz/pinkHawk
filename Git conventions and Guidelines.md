# **Git conventions and Guidelines**

## Quick commands:

### Branches

`100-validation-errors`

`101-basic-search`

`102-german-translation`

`103-live-deployment`

`104-url-formatting`


### Commits

`fix:` to fix bugs

`feat:` to introduce new features

`chore:` to make general changes

`refactor:` to improve existing source code


Commit messages should be written in the present form

Commit messages should be written in English

Commit messages should start with a lowercase character

It is advisable to add the issue number to a commit message

Examples:

- `fix: display validation errors properly, refs #100`
- `feat: implement basic search, refs #101`
- `chore: add correct icons in menu bar, refs #102`
- `refactor: change functions to TS, refs #104`

If a commit is a work in progress, it should be marked as such:

- `fix: display validation errors properly (WIP), refs #100`
- `feat: implement basic search (WIP), refs #101`
- `chore: add correct icons in menu bar (WIP), refs #102`
- `refactor: change functions to TS (WIP), refs #104`


## 1. Branch Model

1. Main Branches

We use two main branches to store our project history, these branches have an *infinite lifetime*.

- master (stores the official release history)
- development (serves as an integration branch for features)

It would be convenient to tag all merges to the master branch with a version number eg. 'v1.1.0'

Further we use the following temporary branch types:

*We will use a number prefix for easy identification, **100, 101, 102** and so on.*

- 1***feature/* (Each <u>new feature</u> gets a dedicated feature branch)
- 1***hotfix/* (For fixing bugs in code <u>deployed to production</u> in case taht we have to, but not mandatory)

Temporary branches should always be deleted after completion.


## 2. Feature Branches

New features should reside in its own branch, which can then be pushed to the central repository. Never branch off of master, feature branches use development as their parent. When a feature is completed, it is merged back into development.

**Conventions:**

- branch off: development
- merge into: development
