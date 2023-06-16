import prisma from "@/app/libs/prismadb";
import getSession from "./getSession";


const getUsers = async ()=>{
  //Obtenemos la session
  const session = await getSession();
  if(!session?.user?.email){
    return[]
  }

  try {
    //Obtenemos todos los usuarios
    const users = await prisma.user.findMany({
      orderBy:{
        createdAt:'desc',
      },
      //Todos menos el que esta en session actualmente
      where:{
        NOT:{
          email:session.user.email
        }
      }
    })

    return users;

  } catch (error:any) {
    return [];
  }
}

export default getUsers;