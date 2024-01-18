import { connectToDB } from "./utils";

const { User, Product } = require("./models");

export const fetchUsers = async (q, page) => {
    const regex = new RegExp(q, "i");

    const ITEM_PER_PAGE = 2;

    try {
        connectToDB();
        const count = await User.find({ username: { $regex: regex } }).count();
        const users = await User.find({ username: { $regex: regex } }).limit(ITEM_PER_PAGE).skip((page - 1) * ITEM_PER_PAGE);
        return {count, users};
    } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch users");
    }
};


export const fetchProducts = async (q, page) => {
    const regex = new RegExp(q, "i");

    const ITEM_PER_PAGE = 2;

    try {
        connectToDB();
        const count = await Product.find({ title: { $regex: regex } }).count();
        const products = await Product.find({ title: { $regex: regex } }).limit(ITEM_PER_PAGE).skip((page - 1) * ITEM_PER_PAGE);
        return {count, products};
    } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch products");
    }
};