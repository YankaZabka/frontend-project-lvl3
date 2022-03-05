import 'bootstrap/dist/css/bootstrap.min.css';
import 'regenerator-runtime/runtime.js';
import 'core-js/stable';

const fn = async () => {
  await setTimeout(() => console.log('TIMEOUT!'), 1000);
};

fn().then(() => console.log('FINISHED'));
