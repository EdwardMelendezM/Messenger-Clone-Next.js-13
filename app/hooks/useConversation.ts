import {useParams} from "next/navigation"
import {useMemo} from 'react'

const useConversation=()=>{
  const params = useParams();
  const conversationId = useMemo(()=>{
    if(!params?.convesationId){
      return ''
    }
    return params.convesationId as string
  },[params?.convesationId])

  const isOpen = useMemo(() => !!conversationId, [conversationId])

  return useMemo(()=>({
    isOpen,
    conversationId,
  }),[isOpen,conversationId])

}