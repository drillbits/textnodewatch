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

const watch = require('./watch');

require('yargs')
    .usage('Usage: textnodewatch command [options]')
    .command('watch', 'watch dom text', {
        url: {
            desc: 'The URL to watch',
            required: true,
        },
        selector: {
            desc: 'The selector for querySelector',
            required: true,
        },
        index: {
            desc: 'The index of selections',
            required: true,
        },
        webhook: {
            desc: 'The incoming-webhook URL of slack',
            required: true,
        },
        mentionto: {
            desc: 'The username that will be mentioned',
            required: true,
        },
        show: {
            desc: 'The option for nightmare.js',
            default: false,
        },
    }, watch)
    .demandCommand(1, 'Use "textnodewatch help [command]" for more information about a command.')
    .help()
    .argv;