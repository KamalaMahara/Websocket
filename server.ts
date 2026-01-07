import app from './src/app.js'
import config from './src/config/config.js'


function startServer() {
  const port = config.port || 6000
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
  })
}

startServer()