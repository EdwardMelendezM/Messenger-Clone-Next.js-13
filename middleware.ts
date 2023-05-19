import {withAuth} from 'next-auth/middleware'

// This is for the login, is the route
export default withAuth({
  pages:{
    signIn:'/'
  }
});

//Protected route with this path
export const config = {
  matcher:[
    "/users/:path*"
  ]
}