import argon2 from "argon2"
import { ObjectId } from "mongodb"
import { db } from "../config/database"
import { CreateBody } from "../validations/userValidations"

const userProjection = { name: 1, email: 1 }

/**
 * Create a new user
 * @param user User to create
 */
export const createUser = async (user: CreateBody) => {
  user.password = await argon2.hash(user.password)
  return db.collection("users").insertOne(user)
}

/**
 * Get all users
 */
export const getUsers = async () => {
  return db
    .collection("users")
    .find({}, { projection: userProjection })
    .toArray()
}

/**
 * Get a user by id
 */
export const getUser = async (id: string) => {
  return db
    .collection("users")
    .findOne({ _id: new ObjectId(id) }, { projection: userProjection })
}

/**
 * Get a user by email
 */
export const getUserByEmail = async (email: string) => {
  return db
    .collection("users")
    .findOne({ email }, { projection: userProjection })
}

/**
 * Delete a user by id
 * @param id User id to delete
 */
export const deleteUser = async (id: string) => {
  return db.collection("users").deleteOne({ _id: new ObjectId(id) })
}
