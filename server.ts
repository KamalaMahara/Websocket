import app from './src/app.js'
import config from './src/config/config.js'
import connectDB from './src/config/db.js'
import { Server } from 'socket.io';

let io: Server | undefined;
function startServer() {
  connectDB(config.mongoUri as string)
  const port = config.port || 6000
  const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
  })
  io = new Server(server)

}

function getSocketIo() {
  if (!io) {
    throw new Error(" Socketio not initialized");
  }
  return io;
}

startServer()
export { getSocketIo }