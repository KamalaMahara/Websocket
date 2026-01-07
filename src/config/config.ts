import { config } from 'dotenv'
config()

const envConfig = {
  port: process.env.PORT,
  mongoUri: process.env.MONGO_URI,
}
export default envConfig
