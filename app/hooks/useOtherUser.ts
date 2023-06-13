import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { FullConversationType } from "../types";
import { User } from "@prisma/client";

const useOtherUser = (conversation: FullConversationType | {
  user: User[]
}) => { 
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const session = useSession();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const otherUser = useMemo(() => {
    const currentUserEmail = session?.data?.user?.email;

    const otherUser = conversation.user.filter((_user) => _user.email !== currentUserEmail)

    return otherUser[0];

  }, [session?.data?.user?.email, conversation.user])
  return otherUser;
}

export default useOtherUser;