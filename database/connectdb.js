import mongoose from "mongoose";

try {
    await mongoose.connect(process.env.URI_MONGO);

    console.log("OK conected 😍");

} catch (error) {
    console.log(error);
}