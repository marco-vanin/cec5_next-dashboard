import { connectToDB } from "./utils";

const { User } = require("./models");

export const fetchUsers = async () => {
    try {
        connectToDB();
        const users = await User.find({});
        return users;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch users");
    }
}