import { useEffect, useState } from "react";
import { pusherClient } from "../libs/pusher";
import { Channel, Members } from "pusher-js";
import useActiveList from "./useActiveList";

const useActiveChannel = () => {

  // Obtenemos los members y sus metodos
  const { set, add, remove } = useActiveList();
  const [activeChannel, setActiveChannel] = useState<Channel | null>(null);

  useEffect(() => {
    let channel = activeChannel;

    if (!channel) {
      //Si no existe un canal lo creamos y lo almacenanos en activeChannel
      channel = pusherClient.subscribe('presence-messenger');
      setActiveChannel(channel);
    }

    // El evento se dispara cuando la suscripcion al canal ha sido exitosa
    // Creamos una lista de miembros como lista vacia
    // Agregamos a todos los id de los miembros y actualizamos con el set
    channel.bind("pusher:subscription_succeeded", (members: Members) => {
      const initialMembers: string[] = [];

      members.each((member: Record<string, any>) => initialMembers.push(member.id));
      set(initialMembers);
    });

    // Este evento llamado pusher:member_added se dispara cuando un miembro se une al canal de precencia
    channel.bind("pusher:member_added", (member: Record<string, any>) => {
      add(member.id)
    });

    // Este evento se dispara cuando un miembro se retira de un canal
    channel.bind("pusher:member_removed", (member: Record<string, any>) => {
      remove(member.id);
    });

    //Esto se ejecuta cuando el componente se actualize o desmonte
    return () => {
      if (activeChannel) {
        pusherClient.unsubscribe('presence-messenger');
        setActiveChannel(null);
      }
    }
  }, [activeChannel, set, add, remove]);
}

export default useActiveChannel;