import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const app = require('../backend/index.js');

export default app;
