# example bazel setup with nestjs + local package import

## Important points

### Should install all `package.json`s in `WORKSPACE` file

```python
# WORKSPACE
yarn_install(
    # Name this npm so that Bazel Label references look like @npm//package
    name = "npm_shared",
    package_json = "//shared:package.json",
    yarn_lock = "//shared:yarn.lock",
)

# customize yarn_install names for each package
yarn_install(
    # Name this npm so that Bazel Label references look like @npm//package
    name = "npm_server_api",
    package_json = "//server/api:package.json",
    yarn_lock = "//server/api:yarn.lock",
)
```

### Imported package should use `ts_library` function, not `ts_project`

- There might be a way using `ts_project`, but it seems that it needs `package.json` containing all dependencies of packages in root directory (See https://github.com/dataform-co/dataform).
- So this example used `ts_library` as imported package.

- **IMPORTANT** You should write `package_name` attribute with the same package name in `package.json`, as `package_name = "shared"` in this example.

- See [shared/BUILD.bazel](shared/BUILD.bazel#L5)

### Importing package should add imported package as `{workspace_name}/{package_name}` in `package.json` dependency

In this example, `server/api` package imported `shared` as below in [package.json](server/api/package.json#L30)
```json
"dependency": {
    ...,
    "bazel_nestjs_with_shared/shared": "file:../../shared",
    ...
}
```

### Importing package should use `ts_project` and import bazel package properly

See [server/api/src/BUILD.bazel](server/api/src/BUILD.bazel#L17).

You can import in both ways as `//shared` or `//shared:shared`.


### Should sync `Incremental` and `SourceMap` option in `tsconfig.json` and `ts_project` in `BUILD.bazel`

### Should use `ts_config` function in `BUILD.bazel` to use NestJS's tsconfig extending feature - `tsconfig.build.json` -> `tsconfig.json`

- See [ts_config](server/api/src/BUILD.bazel#L8) and [import as :tsconfig](server/api/src/BUILD.bazel#L24)