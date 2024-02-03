import { userDao } from "../daos/index.js";

class userService{
    async create(userData){
        userData.password = hash(userData.password)
        userDao.create(userData)
    }
    async readOne(username, password){
        const user = await userDao.readOne({ email: username })
        if(!compareHash(password, user['password'])){
            throw new Error('Login failed')
        }
        return user
    }
    async readMany(query){
        return await userDao.readMany(query)
    }
    async updateOne(email, password){
        const newPass = hash(password)
        const updated = await userDao.updateOne(
            { email },
            { $set: { password: newPass } },
            { new: true }
        )
        if(!updated){
            throw new Error('Failed resetting password')
        }
        return updated
    }
    async deleteOne(query){
        return await userDao.deleteOne(query)
    }
}

export const service = new userService()
