SHELL := /bin/bash

.PHONY: install install-dev build test format dev build-firefox zip zip-firefox

install:
	bash ./scripts/ubuntu/install.sh

install-dev:
	bash ./scripts/ubuntu/install-dev.sh

build:
	bash ./scripts/ubuntu/build.sh

test:
	bash ./scripts/ubuntu/test.sh

format:
	bash ./scripts/ubuntu/format.sh

dev:
	pnpm dev

build-firefox:
	pnpm build:firefox

zip:
	pnpm zip

zip-firefox:
	pnpm zip:firefox
