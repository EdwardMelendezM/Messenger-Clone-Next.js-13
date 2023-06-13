import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb';

export async function POST(request: Request){
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const {
      userId,
      isGroup,
      members,
      name
    } = body;

    if(!currentUser?.id || !currentUser?.email){
      return new NextResponse('Unauthorized',{status:401})
    }

    if(isGroup && (!members || members.length<2 || !name)){
      return new NextResponse('Invalid data',{status:400})
    }

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
      return NextResponse.json(newConversation);
    }
    
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

    const singleConversatino = existingConversation[0];
    if(singleConversatino){
      return NextResponse.json(singleConversatino)
    }

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

    return NextResponse.json(newConversation)

  } catch (error:any) {
    return new NextResponse('Internal Error',{status:500})
  }
}