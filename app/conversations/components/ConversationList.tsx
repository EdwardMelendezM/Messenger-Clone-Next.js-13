'use client'

import { FullConversationType } from "@/app/types";

interface ConversationListProsp{
  initialItems: FullConversationType[];
}
const ConversationList:React.FC<ConversationListProsp> = ({
  initialItems
}) => {
  return ( <div>
    ConversationList
  </div> );
}
 
export default ConversationList;