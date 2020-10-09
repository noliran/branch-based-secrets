# `branch-based-secrets` GitHub Action

This action makes it easy to use different secrets for different branches.
It relies on the following naming scheme for secrets: `<name>_<branch>`.

## Usage example

In a project with 2 branches, `prod` and `dev`, define the following secrets:
* `SECRET_TOKEN_DEV`
* `SECRET_TOKEN_PROD`

Step configuration:
```yaml
      - uses: noliran/branch-based-secrets@v1
        with:
          secrets: SECRET_TOKEN
```

In turn, when running an action on a push to `dev` or a pull_request targeted at branch `dev`, this will define the following environment variables:
* `SECRET_TOKEN_NAME`=`SECRET_TOKEN_DEV`
* `TARGET_BRANCH`=`dev`
* `TARGET_BRANCH_U`=`DEV`

After the action runs, you can pass the correct secret to other steps:
```yaml
        env:
          SECRET_TOKEN: ${{ secrets[env.SECRET_TOKEN_NAME] }}
```