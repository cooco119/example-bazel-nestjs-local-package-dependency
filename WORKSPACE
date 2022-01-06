workspace(
    # How this workspace would be referenced with absolute labels from another workspace
    name = "bazel_nestjs_with_shared",
)

load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")
http_archive(
    name = "build_bazel_rules_nodejs",
    sha256 = "ddb78717b802f8dd5d4c01c340ecdc007c8ced5c1df7db421d0df3d642ea0580",
    urls = ["https://github.com/bazelbuild/rules_nodejs/releases/download/4.6.0/rules_nodejs-4.6.0.tar.gz"],
)

load("@build_bazel_rules_nodejs//:index.bzl", "node_repositories", "yarn_install")

node_repositories(
    # https://github.com/bazelbuild/rules_nodejs/blob/master/internal/node/node_repositories.bzl
    package_json = [
        "//server/api:package.json",
        "//shared:package.json",
    ],
)

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

http_archive(
    name = "io_bazel_rules_docker",
    sha256 = "7863f4fb51e4801b91942ab3cf00a673c53ed555d27a56f4287c2619d13830eb",
    strip_prefix = "rules_docker-86c54e5a3a2a4ae9c0cc39b3af7d94c04ac689ab",
    urls = ["https://github.com/bazelbuild/rules_docker/archive/86c54e5a3a2a4ae9c0cc39b3af7d94c04ac689ab.tar.gz"],
)

load(
    "@io_bazel_rules_docker//repositories:repositories.bzl",
    container_repositories = "repositories",
)

container_repositories()

# Download base image for nodejs
load(
    "@io_bazel_rules_docker//nodejs:image.bzl",
    _nodejs_image_repos = "repositories",
)

_nodejs_image_repos()