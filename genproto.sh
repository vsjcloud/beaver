#!/usr/bin/env bash
shopt -s globstar nullglob

PROTOC_GEN_TS_PATH="$HOME/.npm-global/bin/protoc-gen-ts"

PROTO_DIR="proto"
CATHEDRAL_DIR="cathedral/generated/proto"
HORNERO_DIR="hornero/src/generated/proto"

function removeAndCreate() {
  rm -rf "$1"
  mkdir -p "$1"
}

function generateGoCode() {
  removeAndCreate "$2"
  for file in "$1"/**/*.proto; do
    protoc -I="$1" --go_out=plugins=grpc:"$GOPATH/src" "$file"
  done
}

function generateJSCode() {
  removeAndCreate "$2"
  for file in "$1"/**/*.proto; do
    protoc \
      -I="$1" \
      --plugin="protoc-gen-ts=$PROTOC_GEN_TS_PATH" \
      --js_out="import_style=commonjs,binary:$2" \
      --ts_out="service=grpc-web:$2" \
      "$file"
  done

  for file in "$2"/**/*.js; do
    sed -i "1s/^/\/* eslint-disable *\/\n/" "$file"
  done
}

generateGoCode $PROTO_DIR $CATHEDRAL_DIR
generateJSCode $PROTO_DIR $HORNERO_DIR
