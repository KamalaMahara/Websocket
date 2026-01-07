import app from './src/app.js'
import config from './src/config/config.js'
import connectDB from './src/config/db.js'
import { Server } from 'socket.io';

async function startServer() {
  await connectDB(config.mongoUri as string)
  const port = config.port || 6000
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
  })
}

startServer()