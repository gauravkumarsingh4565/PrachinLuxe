import necklacePremium from '@/assets/images/necklace_premium.png';
import earringsPremium from '@/assets/images/earrings_premium.png';
import jewelrySetPremium from '@/assets/images/jewelry_set_premium.png';
import najarbattuPremium from '@/assets/images/najarbattu_premium.png';
import hairpinPremium from '@/assets/images/hairpin_premium.png';
import productKundanSet from '@/assets/images/product_kundan_set.png';

export const products = [];

export const getProductById = (id) => {
  return products.find(p => p.id === id);
};

export const getRelatedProducts = (product, limit = 4) => {
  return products
    .filter(p => p.id !== product.id && (p.category === product.category || p.subcategory === product.subcategory))
    .slice(0, limit);
};

export const jewelryType = [
  { id: 'new-arrivals', name: 'New Arrivals', image: { url: productKundanSet }, path: '/category/new-arrivals' },
  { id: 'sets', name: 'Sets', image: { url: jewelrySetPremium }, path: '/category/sets' },
  { id: 'earrings', name: 'Earrings', image: { url: earringsPremium }, path: '/category/earrings' },
  { id: 'necklaces', name: 'Necklaces', image: { url: necklacePremium }, path: '/category/necklaces' },
  { id: 'najar-battu', name: 'Najar Battu', image: { url: najarbattuPremium }, path: '/category/najar-battu' },
  { id: 'hair-pins', name: 'Hair Pins', image: { url: hairpinPremium }, path: '/category/hair-pins' },
];
