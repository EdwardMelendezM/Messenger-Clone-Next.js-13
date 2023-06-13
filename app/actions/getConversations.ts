import prisma from "@/app/libs/prismadb"
import getCurrentUser from "./getCurrentUser"

const getConversation = async()=>{
  const currentUser = await getCurrentUser();
  if (!currentUser?.id){
    return[]
  }
  try {
    const conversations = await prisma.conversation.findMany({
      orderBy:{
        lastMessageAt:'desc'
      },
      where:{
        userId:{
          has:currentUser.id
        }
      },
      include:{
        user:true,
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