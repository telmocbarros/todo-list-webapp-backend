require('dotenv').config({ path: './config.env' });
const app = require('./config/express')();
const PORT = process.env.PORT || 5000;


// starting application on the defined port
app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`);
})