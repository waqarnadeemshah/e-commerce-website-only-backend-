const express = require('express');
const moongoese = require('mongoose')
const cookieParser = require('cookie-parser');
const multer = require('multer')
const path = require('path')
const { authrouter } = require('./routers/loginroute');
const { userRoute } = require('./routers/userrouter');
const { adminroute } = require('./routers/adminroute');
const { cartroute } = require('./routers/cartroute');
const { categoryroute } = require('./routers/Categoryroute');
const { orderroute } = require('./routers/Orderroute');
require('dotenv').config();

const app = express()


app.use(express.json());
app.use(cookieParser())


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/user', userRoute)
app.use('/api/user/cart', cartroute)
app.use('/api/user/category', categoryroute)
app.use('/api/user', orderroute)
app.use('/api/admin', adminroute)
app.use('/api/auth', authrouter);



moongoese.connect(process.env.MONGODBURI).then(() => {
    console.log('mongo connect succesfully')
    app.listen(process.env.PORT, () => {
        console.log(`port connected ${process.env.PORT}`)
    })
})