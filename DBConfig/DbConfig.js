import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config();
const connect = async () => {
    try {
        const mongoUri = process.env.MONGO_URI
        const localUri = process.env.mongoUri
        await mongoose.connect(localUri)
            .then(() => {
                console.log("DB Connected")
            })
            .catch((e) => {
                console.log("err connecting db => ", e.message)
            })
    } catch (error) {
        console.log("err connecting db => ", error.message)
    }
}

export default connect;