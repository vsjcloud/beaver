#!/usr/bin/env bash
shopt -s globstar nullglob

PROTOC_GEN_TS_PATH="$HOME/.npm-global/bin/protoc-gen-ts"

PROTO_DIR="proto"

CATHEDRAL_SOURCE_DIRS=(
  "model"
  "rpc/common"
  "rpc/photo"
  "rpc/project"
  "rpc/sagrada"
)
CATHEDRAL_TARGET_DIR="cathedral/generated/proto"

HORNERO_SOURCE_DIRS=(
  "model"
  "rpc/common"
  "rpc/photo"
  "rpc/project"
)
HORNERO_TARGET_DIR="hornero/src/generated/proto"

SAGRADA_SOURCE_DIRS=(
  "model"
  "rpc/sagrada"
)
SAGRADA_TARGET_DIR="sagrada/common/generated/proto"

function removeAndCreate() {
  rm -rf "$1"
  mkdir -p "$1"
}

function generateGoCode() {
  for file in "$1"/**/*.proto; do
    protoc -I="$2" --go_out=plugins=grpc:"$GOPATH/src" "$file"
  done
}

function generateJSCode() {
  for file in "$1"/**/*.proto; do
    protoc \
      -I="$2" \
      --plugin="protoc-gen-ts=$PROTOC_GEN_TS_PATH" \
      --js_out="import_style=commonjs,binary:$3" \
      --ts_out="service=grpc-web:$3" \
      "$file"
  done

  for file in "$3"/**/*.js; do
    sed -i "1s/^/\/* eslint-disable *\/\n/" "$file"
  done
}

function generateCathedral() {
  removeAndCreate $CATHEDRAL_TARGET_DIR
  for srcDir in "${CATHEDRAL_SOURCE_DIRS[@]}"; do
    generateGoCode "$PROTO_DIR/$srcDir" $PROTO_DIR
  done
}

function generateHornero() {
  removeAndCreate $HORNERO_TARGET_DIR
  for srcDir in "${HORNERO_SOURCE_DIRS[@]}"; do
    generateJSCode "$PROTO_DIR/$srcDir" $PROTO_DIR $HORNERO_TARGET_DIR
  done
}

function generateSagrada() {
  removeAndCreate $SAGRADA_TARGET_DIR
  for srcDir in "${SAGRADA_SOURCE_DIRS[@]}"; do
    generateJSCode "$PROTO_DIR/$srcDir" $PROTO_DIR $SAGRADA_TARGET_DIR
  done
}

generateCathedral
generateHornero
generateSagrada
