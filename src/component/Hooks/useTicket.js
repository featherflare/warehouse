import { useState } from 'react';

export default function useTicket() {
  const getTicket= () => {
    const ticketString = sessionStorage.getItem('ticket');
    const userTicket = JSON.parse(ticketString);
    return userTicket?.ticket
  };

  const [ticket, setTicket] = useState(getTicket());

  const saveTicket = userTicket => {
    sessionStorage.setItem('ticket', JSON.stringify(userTicket));
    setTicket(userTicket.ticket);
  };

  return {
    setTicket: saveTicket,
    ticket
  }
}