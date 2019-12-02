#!/usr/bin/env bash

PROTOC_GEN_TS_PATH="$HOME/.npm-global/bin/protoc-gen-ts"

PROTO_DIR="proto"
PROTO_MODEL_DIR="$PROTO_DIR/model"
PROTO_RPC_DIR="$PROTO_DIR/rpc"

CATHEDRAL_DIR="cathedral"
CATHEDRAL_MODEL_DIR="$CATHEDRAL_DIR/model"
CATHEDRAL_RPC_DIR="$CATHEDRAL_DIR/rpc"

HORNERO_DIR="hornero/src"
HORNERO_MODEL_DIR="$HORNERO_DIR/model"
HORNERO_RPC_DIR="$HORNERO_DIR/rpc"

shopt -s globstar nullglob

function removeAndCreate() {
  rm -rf "$1"
  mkdir -p "$1"
}

function generateCathedral() {
  removeAndCreate $CATHEDRAL_MODEL_DIR
  for file in "$PROTO_MODEL_DIR"/**/*.proto; do
    protoc -I=$PROTO_MODEL_DIR --go_out=$CATHEDRAL_MODEL_DIR "$file"
  done

  removeAndCreate $CATHEDRAL_RPC_DIR
  for file in "$PROTO_RPC_DIR"/**/*.proto; do
    protoc -I=$PROTO_RPC_DIR --go_out=$CATHEDRAL_RPC_DIR "$file"
  done
}

function generateHornero() {
  removeAndCreate $HORNERO_MODEL_DIR
  for file in "$PROTO_MODEL_DIR"/**/*.proto; do
    protoc \
      --plugin="protoc-gen-ts=$PROTOC_GEN_TS_PATH" \
      --js_out="import_style=commonjs,binary:$HORNERO_MODEL_DIR" \
      --ts_out="$HORNERO_MODEL_DIR" \
      "$file"
  done
  for file in "$HORNERO_MODEL_DIR"/**/*.js; do
    sed -i "1s/^/\/* eslint-disable *\/\n/" "$file"
  done

  removeAndCreate $HORNERO_RPC_DIR
  for file in "$PROTO_RPC_DIR"/**/*.proto; do
    protoc \
      --plugin="protoc-gen-ts=$PROTOC_GEN_TS_PATH" \
      --js_out="import_style=commonjs,binary:$HORNERO_RPC_DIR" \
      --ts_out="$HORNERO_RPC_DIR" \
      "$file"
  done
  for file in "$HORNERO_RPC_DIR"/**/*.js; do
    sed -i "1s/^/\/* eslint-disable *\/\n/" "$file"
  done
}

generateCathedral
generateHornero
