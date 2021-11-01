import { EntityRepository, Repository } from "typeorm";
import { User } from "../User";

@EntityRepository()
export class UserRepository extends Repository<User> {

}