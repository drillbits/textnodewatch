# textnodewatch

watch text node and notify to slack using electron.

## Requirements

- node
- yarn

## Getting started

```
$ yarn install
$ ./bin/textnodewatch watch \
    --url http://cal.syoboi.jp/ \
    --selector ".curTimeText" --index 0 \
    --webhook https://hooks.slack.com/services/PATH/TO/WEBHOOK \
    --mentionto SLACK_USER_NAME
```
