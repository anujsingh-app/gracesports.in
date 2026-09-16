import { InquiryItem, Product } from '../types';

export const PHONE_NUMBER = '+918791864565';
export const DISPLAY_PHONE = '+91 8791864565';
export const OFFICIAL_EMAIL = 'info@gracesports.in';
export const FACTORY_ADDRESS = 'Kanker Khera, Meerut Cantt, Meerut, Uttar Pradesh 250001';

export function createProductWhatsAppUrl(product: Product, quantity = 1): string {
  const cleanNumber = '918791864565';
  const text = `*Inquiry from Grace Sports Catalogue*\n\n` +
    `Hello Grace Sports Team,\n` +
    `I am interested in:\n` +
    `🏓 *Product:* ${product.name}\n` +
    `📦 *Category:* ${product.category.toUpperCase()}\n` +
    `💰 *Price:* ₹${product.price.toLocaleString('en-IN')}${quantity > 1 ? ` (Qty: ${quantity})` : ''}\n` +
    `${product.badge ? `⭐ *Series:* ${product.badge}\n` : ''}` +
    `\nPlease share availability, bulk/academy discount rates, and shipping details to my location.`;

  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`;
}

export function createBulkInquiryWhatsAppUrl(items: InquiryItem[], customNotes?: string): string {
  const cleanNumber = '918791864565';
  const totalAmount = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  let text = `*Grace Sports - Custom Order / Quotation Request*\n\n` +
    `Hello Grace Sports Team,\n` +
    `I would like an official quotation for the following items:\n\n`;

  items.forEach((item, index) => {
    text += `${index + 1}. *${item.product.name}*\n` +
      `   • Qty: ${item.quantity}\n` +
      `   • Price: ₹${(item.product.price * item.quantity).toLocaleString('en-IN')}\n`;
  });

  text += `\n📊 *Total Estimated Value:* ₹${totalAmount.toLocaleString('en-IN')}\n`;

  if (customNotes && customNotes.trim()) {
    text += `📝 *Notes/City:* ${customNotes.trim()}\n`;
  }

  text += `\nPlease provide shipping timeframe, dispatch cost, and invoice terms. Thank you!`;

  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`;
}

export function createGeneralWhatsAppUrl(message?: string): string {
  const cleanNumber = '918791864565';
  const text = message || `Hello Grace Sports, I am contacting you regarding your Table Tennis products & academy equipment. Please share your latest catalogue and pricing.`;
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`;
}
