import app from "./app.js";

import { config } from "./config/config.js";

const {port} = config;

app.listen(port, () => {
    console.log(`listening on: http://localhost:${port}`)
});