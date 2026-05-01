import dotenv from "dotenv";
import express from "express";  
import connectDB from "./Database/index.js";    



dotenv.config()


connectDB()