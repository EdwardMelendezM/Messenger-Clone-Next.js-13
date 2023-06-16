import prisma from "@/app/libs/prismadb";
import getSession from "./getSession";

const getCurrentUser = async () => {
  try {
    //Obtenemos la session
    const session = await getSession();

    //Verificamos si existe el usuario de session
    if (!session?.user?.email) {
      return null;
    }

    //Buscamos el actual usuario
    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string
      }
    });

    if (!currentUser) {
      return null;
    }

    return currentUser;
  } catch (error: any) {
    return null;
  }
};

export default getCurrentUser;