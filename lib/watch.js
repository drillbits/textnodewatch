//    Copyright 2017 drillbits
//
//    Licensed under the Apache License, Version 2.0 (the "License");
//    you may not use this file except in compliance with the License.
//    You may obtain a copy of the License at
//
//        http://www.apache.org/licenses/LICENSE-2.0
//
//    Unless required by applicable law or agreed to in writing, software
//    distributed under the License is distributed on an "AS IS" BASIS,
//    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//    See the License for the specific language governing permissions and
//    limitations under the License.

const Nightmare = require('nightmare');
const vo = require('vo');
const request = require('request');

module.exports = (argv) => {
    let prev = "";
    setInterval(() => {
        const nightmare = Nightmare({
            switches: {
                'ignore-certificate-errors': true
            },
            show: argv.show
        });

        vo(function* () {
            const s = yield nightmare
                .goto(argv.url)
                .wait(3000)
                .evaluate((selector, index) => {
                    return document.querySelectorAll(selector)[index].innerText;
                }, argv.selector, argv.index);
            yield nightmare.end();
            return s
        })((err, result) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
            if (result !== prev) {
                const msg = `${argv.url} "${argv.selector}"[${argv.index}] has changed! ${prev} -> ${result}`;
                console.log(msg);
                request.post({
                    uri: argv.webhook,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    json: {
                        link_names: 1,
                        text: `@${argv.mentionto} ${msg}`
                    }
                });
            }
            prev = result;
        });
    }, 5000)
};