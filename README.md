# AI Agent Question and Essay API

This repository houses a question generation tool, enabling users to input a text, from which it generates multiple questions for selection, with one of them being the correct answer.

## Tech

- HoneJS
- OpenAI
- Redis

## Setup

<i>Note: If you don't have redis installed on your machine, you'll have to do so with `brew install redis`</i>

### Install dependencies

- `npm install`

## How to use

### Run locally

#### Start redis server:

In a separate shell: `make redis-start`

#### Start API

Run: `npm run dev`

The API will be accesible on http://localhost:3001

### Shell into Redis Container

`make redis-shell`: This will allow you to shell into the container and run redis CLI commands. Example: List all of the keys: `KEYS *`

### Run with Docker

`make start`

## Configurations

Required Environment Variables

```
OPENAI_API_KEY=
OPENAI_ASSISTANT_ID=
PORT=3001
NODE_ENV=development
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
REDIS_DB=0
OPENAI_ADMISSION_ASSISTANT_ID=asst_LE4iIVogkmBn6meeoJqahXFd
OPENAI_SCHOLARSHIP_ESSAYS_ASSISTANT_ID=asst_V5ZOHgewG3AQlo81l5e89JDY
```
