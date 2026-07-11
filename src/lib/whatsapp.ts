export type WhatsAppSection = 'dates-nuts' | 'events' | 'gifts' | 'general';

export const getWhatsAppLink = (message?: string, section: WhatsAppSection = 'general') => {
  let number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '917012474579';

  if (section === 'dates-nuts' && process.env.NEXT_PUBLIC_WHATSAPP_NUMBER_DATES_NUTS) {
    number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER_DATES_NUTS;
  } else if (section === 'events' && process.env.NEXT_PUBLIC_WHATSAPP_NUMBER_EVENTS) {
    number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER_EVENTS;
  } else if (section === 'gifts' && process.env.NEXT_PUBLIC_WHATSAPP_NUMBER_GIFTS) {
    number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER_GIFTS;
  }
  
  if (!message) {
    message = "Hello! I'm interested in exploring Jafa's collections.";
  }
  
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
};
