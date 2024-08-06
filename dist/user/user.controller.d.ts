import { User } from './schemas/user.schemas';
import { UserService } from './user.service';
import { createUserDto, updateUserDto } from './dto/create-user.dto';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getAllUser(): Promise<User[]>;
    createUser(user: createUserDto): Promise<User>;
    getUserById(id: string): Promise<User>;
    updateUser(id: string, user: updateUserDto): Promise<User>;
    deleteUserById(id: string): Promise<User>;
}
