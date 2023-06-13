import getConversation from "../actions/getConversations"
import Sidebar from "../components/sidebar/Sidebar"
import ConversationList from "./components/ConversationList"

export default async function ConversationsLayout({
  children
}:{
  children:React.ReactNode
}){

  const convesations = await getConversation();


  return(
    //@ts-expect-error Server Component
    <Sidebar>
      <div className="h-full">
        <ConversationList
          initialItems={convesations}
        />
        {children}
      </div>
    </Sidebar>
  )
}