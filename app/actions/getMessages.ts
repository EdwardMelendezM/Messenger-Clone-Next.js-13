import prisma from '@/app/libs/prismadb';

const getMessages = async(conversationId:string)=>{

  try {
    // Por medio del Id de la conversacion obtenermos los mensajes
    const messages = await prisma.message.findMany({
      where:{
        conversationId:conversationId
      },
      // Dentro de ellas que no incluya sender y seen
      include:{
        sender:true,
        seen:true
      },
      orderBy:{
        createdAt:'asc'
      }
    })
    return messages;

  } catch (error:any) {
    return [];
  }
}
export default getMessages;