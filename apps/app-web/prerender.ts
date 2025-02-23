import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import {renderModuleFactory} from '@angular/platform-server';
import {writeFileSync} from 'fs';

const {AppServerModuleNgFactory} = require('./dist-server/main.js');


renderModuleFactory(AppServerModuleNgFactory, {
    document: '<personalizados-lopes-root></personalizados-lopes-root>',
    url: '/'
})
.then(html => {
    console.log('Pre-rendering successful, saving prerender.html');
    writeFileSync('./prerender.html', html);
})
.catch(error =>  console.error('Error occurred:', error));
