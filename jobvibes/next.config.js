const { createSecretKey } = require('crypto')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  env: {
    GOOGLE_ID: process.env.GOOGLE_ID,
    GOOGLE_SECRET: process.env.GOOGLE_SECRET,
    SECRET: process.env.SECRET,
    HOST: process.env.HOST,
    USER: process.env.USER,
    PASSWORD: process.env.PASSWORD,
    DATABASE: process.env.DATABASE
  }
}

module.exports = nextConfig
