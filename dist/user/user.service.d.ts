import * as mongoose from 'mongoose';
import { User } from './schemas/user.schemas';
export declare class UserService {
    private userModel;
    constructor(userModel: mongoose.Model<User>);
    findAll(): Promise<User[]>;
    create(user: User): Promise<User>;
    findById(id: string): Promise<User>;
    updateById(id: string, user: User): Promise<User>;
    deleteById(id: string): Promise<User>;
}
