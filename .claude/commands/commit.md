Create a git commit following the Conventional Commits specification.

## Steps

1. Run `git status` and `git diff` to understand what changed
2. Stage relevant files with `git add`
3. Write a commit message in this format:

```
<type>[optional scope]: <description>

[optional body]

[optional footer]
```

## Types

| Type | Use when |
|------|----------|
| `feat` | A new feature |
| `fix` | A bug fix |
| `refactor` | Code change that is neither a fix nor a feature |
| `style` | Formatting, missing semicolons, etc — no logic change |
| `chore` | Build process, dependency updates, tooling |
| `docs` | Documentation only |
| `test` | Adding or updating tests |
| `perf` | Performance improvement |
| `ci` | CI/CD configuration changes |
| `revert` | Reverting a previous commit |

## Rules

- Description is lowercase, imperative mood, no trailing period
- Keep the subject line under 72 characters
- Use a scope in parentheses when the change is isolated to one area, e.g. `feat(ImageUploader): add drag and drop`
- Add `BREAKING CHANGE:` in the footer for breaking changes
- Always append the co-author footer:
  ```
  Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
  ```

## Examples

```
feat(ImageUploader): add drag and drop support
fix(App): prevent preview flicker on re-upload
chore: upgrade to yarn 4
refactor(ImageUploader): extract file reading logic
```
