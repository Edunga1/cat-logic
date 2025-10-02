# Introduction

My personal knowledge base.

publish on:
* site: https://edunga1.github.io/cat-logic/
* legacy: https://edunga1.gitbooks.io/catlogic/content/

## Features

[Hosted site on github pages](https://edunga1.github.io/cat-logic/) has some features.

1. Each wiki page contains related documents. This is calculated by the cosine similarity of the document embeddings using the OpenAI API.
1. The logo is touchable. it's minor but I like it.
1. The Search feature is implemented using fuse.js. not good but it works.

## Modules

- `docs/` contains my knowledge base in markdown format. no any dependencies on any other module.
- `embeddings/` is a python module to generate document embeddings from `docs/` and is used by `sites/`.
