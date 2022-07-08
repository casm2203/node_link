import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';

const { Schema, model } = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true
    },
})


//antes del save de authcontroller aquí va a ejecutar esta funcion para validar si es una modificacion y si no hace el hash de la password
userSchema.pre("save", async function (next) {
    const user = this;

    if (!user.isModified('password')) return next()

    try {
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(user.password, salt);
        next();
    } catch (error) {
        console.log(error);
        throw new Error("Falló el hash de contraseña");
    }
});



userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcryptjs.compare(candidatePassword, this.password);
};

// el modelo sirve para que se activen todos los metodos de mongoose y hacer uso de ellos
export const User = model('User', userSchema);