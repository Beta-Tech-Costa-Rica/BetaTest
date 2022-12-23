require('dotenv').config()

export const port = process.env.PORT || 3000
export const secretToken = process.env.ACCESS_TOKEN_SECRET
export const jwt = require('jsonwebtoken')
export const bcrypt = require('bcrypt')