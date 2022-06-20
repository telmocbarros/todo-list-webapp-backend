const app = require('./config/express')();
const port = app.get('port');

// starting application on the defined port
app.listen(port, () =>{
    console.log(`Server running on port ${port}`);
})