import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb';


export async function POST(
  request:Request
){
  try {
    
    //Obtenemos el usuario actual
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const {
      name,
      image
    } = body;

    if(!currentUser?.id){
      return new NextResponse('Unauthorized',{status:401})
    }

    //Actualizamos el usuario
    const updateUser = await prisma.user.update({
      where:{
        id:currentUser.id
      },
      data:{
        image:image,
        name:name
      }
    })

    return NextResponse.json(updateUser)

  } catch (error:any) {
    console.log(error,'ERROR_SETTING');
    return new NextResponse('Internal Error',{status:500})
  }


}