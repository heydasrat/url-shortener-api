import connectDB from './db/index.js'
import app from './app.js'
import config from './config/config.js'

connectDB().then(() => {
    app.listen(config.port, () => {
        console.log(`Server is runing on http://localhost:${config.port}`)
    })
}).catch((mongodbError) => {
    console.error("Mongodb Connection failed. ", mongodbError)
})