require('dotenv').config();
const app=require('./app');

PORT=process.env.PORT || 4000

app.listen(PORT,()=>{
    console.log(`App is running on http://localhost:${PORT}`);
});