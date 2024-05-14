import mongoose from "mongoose";

const connect = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/menuManagementDB')
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