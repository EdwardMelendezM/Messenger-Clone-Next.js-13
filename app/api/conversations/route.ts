import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb';

export async function POST(request: Request){
  try {
    //Obtenemos el usuario actual
    const currentUser = await getCurrentUser();

    //Traer datos de body
    const body = await request.json();

    //Desestructuramos
    const {
      userId,
      isGroup,
      members,
      name
    } = body;

    //Verificamos que exista un usuario actual con su id y su email
    if(!currentUser?.id || !currentUser?.email){
      return new NextResponse('Unauthorized',{status:401})
    }

    //Verificamos que sea un grupo y mas de 2 miembros con nombre
    //Esto es para las conversaciones grupales
    if(isGroup && (!members || members.length<2 || !name)){
      return new NextResponse('Invalid data',{status:400})
    }

    //Si es un grupo entonces crea un grupo con los id's de los miembros
    if(isGroup){
      const newConversation = await prisma.conversation.create({
        data:{
          name,
          isGroup,
          user:{
            connect:[
              ...members.map((member: { value:string})=>({
                id:member.value
              })),
              {
                id:currentUser.id
              }
            ]
          }
        },
        include:{
          user:true
        }
      })
      //Retorno como json la nueva conversacion
      return NextResponse.json(newConversation);
    }
    //En el caso que exista la conversacion la buscamos
    const existingConversation = await prisma.conversation.findMany({
      where:{
        OR:[
          {
            userId:{
              equals:[currentUser.id,userId]
            }
          },
          {
            userId:{
              equals:[userId,currentUser.id]
            }
          }
        ]
      }
    })

    //Si tenemos una conversacion (solo una a una) la retornamos
    const singleConversatino = existingConversation[0];
    if(singleConversatino){
      return NextResponse.json(singleConversatino)
    }

    //Si no existe la conversacion una a una entonces la creamos
    const newConversation = await prisma.conversation.create({
      data:{
        user:{
          connect:[
            {
              id: currentUser.id
            },
            {
              id:userId
            }
          ]
        }
      },
      include:{
        user:true
      }
    })

    //Retornamos la nueva conversacion uno a uno
    return NextResponse.json(newConversation)

  } catch (error:any) {
    return new NextResponse('Internal Error',{status:500})
  }
}