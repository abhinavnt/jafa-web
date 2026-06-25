export const getWhatsAppLink = (message?: string) => {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '917012474579';
  
  if (!message) {
    message = "Hello! I'm interested in exploring Jafa's collections.";
  }
  
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
};
