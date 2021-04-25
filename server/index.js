import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import postRoutes from '../server/routes/posts.js';

const app = express();

app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cors());
app.use('/customer',postRoutes);
app.use('/public', express.static('public'))

const CONNECTION_URL = "mongodb+srv://gajanansurwase:gajanan9011@cluster0.w0nbx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>app.listen(PORT,()=>console.log(`server is running on port:${PORT}`)))
.catch((error)=>console.log(error.message));

mongoose.set('useFindAndModify',false);
//https://www.mongodb.com/cloud/atlas;
