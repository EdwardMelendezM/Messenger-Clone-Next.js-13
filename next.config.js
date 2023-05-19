/** @type {import('next').NextConfig} */
const nextConfig = {
  swcPlugins:[
    ["next-superjson-plugin",{}]
  ],
  images:{
    domains:[
      "res.cloundinary.com",
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com"
    ]
  }
}

module.exports = nextConfig
