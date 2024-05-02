import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entity/user.entity";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { BadRequestException } from "src/exception/BadRequestException";

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository : Repository<User>) {}

    async findAll() : Promise<User[]> {
        return await this.userRepository.find()
    }

    async findOne(id : number) : Promise<User> {
        const user =  await this.userRepository.findOneBy({id})
        if(user) {
            return user
        } else{
            throw new BadRequestException()
        }
    }

    async findByEmail(email : string) {
        const user = await this.userRepository.findOne({where: {email:email}})
        return user
    }
    async findByUsername(username : string) {
        const user = await this.userRepository.findOne({where: {username : username}})
        return user
    }
    async saveUser(user : User) : Promise<User> {
        return this.userRepository.save(user)
    }

    async deleteUser(id : number) : Promise<void> {
        await this.userRepository.delete(id)
    }
}