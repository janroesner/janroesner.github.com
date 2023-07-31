# HELP
# This will output the help for each task
.PHONY: help

help: ## This help.
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

.DEFAULT_GOAL := help

# HUGO TASKS

server: ## start the development server including drafts
	hugo server -D

clean: ## clean the hugo cache
	rm -rf public/*

build: ## build the static site
	hugo

deploy: ## deploy the static site to github pages
	git push origin main
