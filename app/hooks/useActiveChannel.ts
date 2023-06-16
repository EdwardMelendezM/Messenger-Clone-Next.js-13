import { useEffect, useState } from "react";
import useActiveList from "./useActiveList";
import { pusherClient } from "../libs/pusher";
import {Channel,Members } from 'pusher-js'

const useActiveChannel =()=>{
  const {set,add,remove} = useActiveList();
  const [activeChannel,setActivChannel] = useState<Channel | null>(null);

  useEffect(()=>{
    let channel = activeChannel;
    if(!channel){
      channel = pusherClient.subscribe('presence-messenger');
      setActivChannel(channel)
    }

    channel.bind('pusher:subcription_succeeded',(members:Members)=>{
      const initialMembers :string[]=[]
      members.each((member:Record<string,any>)=>initialMembers.push(member.id))
      set(initialMembers)
    })

    channel.bind('pusher:member_added',(member:Record<string,any>)=>{
      add(member.id)
    })

    channel.bind('pusher:member_removed',(member:Record<string,any>)=>{
      remove(member.id)
    })

    return ()=>{
      if(activeChannel){
        pusherClient.unsubscribe('presence-messenger');
        setActivChannel(null);
      }
    }

  },[activeChannel,set,add,remove])
}

export default useActiveChannel;