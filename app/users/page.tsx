'use client'
import { signOut } from "next-auth/react";

const User = () => {
  return ( 
    <button
      onClick={()=>signOut()}>
      Logout
    </button>
   );
}
 
export default User;