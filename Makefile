SHELL := /bin/bash

.PHONY: install install-dev build test format dev build-firefox zip zip-firefox

install:
	./scripts/ubuntu/install.sh

install-dev:
	./scripts/ubuntu/install-dev.sh

build:
	./scripts/ubuntu/build.sh

test:
	./scripts/ubuntu/test.sh

format:
	./scripts/ubuntu/format.sh

dev:
	pnpm dev

build-firefox:
	pnpm build:firefox

zip:
	pnpm zip

zip-firefox:
	pnpm zip:firefox
