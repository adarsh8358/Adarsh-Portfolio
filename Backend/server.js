import app from './src/app.js';
import config from './src/config/config.js';
import connect from './src/db/db.js';

connect();









app.listen(config.PORT, () => {
    console.log(`Server is running on port ${config.PORT}`);
});