import { InquiryItem, Product } from '../types';

export const PHONE_NUMBER = '+918791864565';
export const DISPLAY_PHONE = '+91 8791864565';
export const OFFICIAL_EMAIL = 'info@gracesports.in';
export const FACTORY_ADDRESS = 'Kanker Khera, Meerut Cantt, Meerut, Uttar Pradesh 250001';

export function createProductWhatsAppUrl(
  product: Product,
  quantity = 1,
  variationName?: string,
  effectivePrice?: number
): string {
  const cleanNumber = '918791864565';
  const price = effectivePrice ?? product.price;
  const productName = variationName ? `${product.name} (${variationName})` : product.name;
  const text = `*Inquiry from Grace Sport Catalogue*\n\n` +
    `Hello Grace Sport Team,\n` +
    `I am interested in:\n` +
    `🏓 *Product:* ${productName}\n` +
    `📦 *Category:* ${product.category.toUpperCase()}\n` +
    `💰 *Price:* ₹${price.toLocaleString('en-IN')}${quantity > 1 ? ` (Qty: ${quantity})` : ''}\n` +
    `${product.badge ? `⭐ *Series:* ${product.badge}\n` : ''}` +
    `\nPlease share availability, bulk/academy discount rates, and shipping details to my location.`;

  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`;
}

export function createBulkInquiryWhatsAppUrl(items: InquiryItem[], customNotes?: string): string {
  const cleanNumber = '918791864565';
  const totalAmount = items.reduce((sum, item) => {
    const price = item.variation?.price ?? item.product.price;
    return sum + (price * item.quantity);
  }, 0);

  let text = `*Grace Sport - Custom Order / Quotation Request*\n\n` +
    `Hello Grace Sport Team,\n` +
    `I would like an official quotation for the following items:\n\n`;

  items.forEach((item, index) => {
    const price = item.variation?.price ?? item.product.price;
    const itemName = item.variation ? `${item.product.name} (${item.variation.name})` : item.product.name;
    text += `${index + 1}. *${itemName}*\n` +
      `   • Qty: ${item.quantity}\n` +
      `   • Price: ₹${(price * item.quantity).toLocaleString('en-IN')}\n`;
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
  const text = message || `Hello Grace Sport, I am contacting you regarding your Table Tennis products & academy equipment. Please share your latest catalogue and pricing.`;
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`;
}
