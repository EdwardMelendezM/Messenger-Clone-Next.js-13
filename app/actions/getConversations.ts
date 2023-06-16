import prisma from "@/app/libs/prismadb"
import getCurrentUser from "./getCurrentUser"

const getConversation = async()=>{

  //Obtener actual 
  const currentUser = await getCurrentUser();
  if (!currentUser?.id){
    return []
  }
  try {
    //Buscamos todos las conversaciones por el id de un usuario
    const conversations = await prisma.conversation.findMany({
      orderBy:{
        lastMessageAt:'desc'
      },
      //Usuarios que tienen (has) el current user
      where:{
        userIds:{
          has:currentUser.id
        }
      },
      //A esta consulta le agregamos la tabla user, de ahi los mensajes, y de los mensajes enviamos el sender y seen
      include:{
        users:true,
        messages:{
          include:{
            sender:true,
            seen:true
          }
        }
      }
    })
    return conversations;
  } catch (error:any) {
    return [] 
  }
}
export default getConversation;