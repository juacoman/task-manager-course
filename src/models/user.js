const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true
    },
    email : {
        type : String,
        required : true,
        trim : true,
        lowercase : true,
        unique: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    age : {
        type: Number,
        default : 0,
        validate (value) {
            if(value < 0) {
              throw new Error('Age must be a positive number')  
            }
        }
    },
    password : {
        type : String,
        required : true,
        trim :  true,
        minlength: 7,
        validate (value) {
            if(value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    tokens : [{
        token: {
            type: String,
            require: true
        }
    }],
    avatar: {
        type: Buffer
    }
}, {
    timestamps : true
})

userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField : 'createdBy'
})


//toJSON -> reemplaza el stringify con lo que quiero mostrar
userSchema.methods.toJSON = function () {
    const user = this
    const userObj = user.toObject()
    delete userObj.password
    delete userObj.tokens
    delete userObj.avatar
    return userObj
}

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString()}, 'thisismynewcourse')
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.statics.findByCredentials = async (email, pass) => {
    const user = await User.findOne({email})
    console.log(user)
    if(!user){
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(pass, user.password)
    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}

//Hash password
userSchema.pre('save', async function(next){
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

userSchema.pre('delete', async function (next) {
    const user = this
    Task.deleteMany({createdBy: user._id})
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User