import necklacePremium from '@/assets/images/necklace_premium.png';
import earringsPremium from '@/assets/images/earrings_premium.png';
import jewelrySetPremium from '@/assets/images/jewelry_set_premium.png';
import braceletPremium from '@/assets/images/bracelet_premium.png';
import ringPremium from '@/assets/images/ring_premium.png';
import najarbattuPremium from '@/assets/images/najarbattu_premium.png';
import hairpinPremium from '@/assets/images/hairpin_premium.png';
import necklace2Premium from '@/assets/images/necklace_2_premium.png';
import earrings2Premium from '@/assets/images/earrings_2_premium.png';
import ring2Premium from '@/assets/images/ring_2_premium.png';
import productChandbali from '@/assets/images/product_chandbali.png';
import necklessJpg from '@/assets/images/neckless.jpg';
import heroBannerPng from '@/assets/images/hero_banner.png';
import productAntiqueBox from '@/assets/images/product_antique_box.png';
import lampJpg from '@/assets/images/lamp.jpg';
import antiquePng from '@/assets/images/antique.png';
import artworkRicha from '@/assets/images/artwork_richa.png';
import bridalCollection from '@/assets/images/bridal_collection.png';
import productGoldPayal from '@/assets/images/product_gold_payal.png';
import productKundanSet from '@/assets/images/product_kundan_set.png';
import productMeenakariBangle from '@/assets/images/product_meenakari_bangle.png';
import productTempleNecklace from '@/assets/images/product_temple_necklace.png';
import necklacePremiumCloseup from '@/assets/images/necklace_premium_closeup.png';
import necklacePremiumSide from '@/assets/images/necklace_premium_side.png';
import necklacePremiumDisplay from '@/assets/images/necklace_premium_display.png';

export const products = [
  // --- EARRINGS ---
  {
    id: 'premium-kundan-disc-earrings',
    name: 'Premium Kundan Disc Earrings',
    category: 'Earrings',
    subcategory: 'Disc',
    price: '24,999.00',
    originalPrice: '28,999.00',
    rating: '4.9',
    reviews: '124',
    img: earringsPremium,
    description: 'Bespoke Kundan Disc Earrings, handcrafted in 22k gold plated brass, showcasing exquisite glass stone detailing and drop bead finishes. Inspired by Mughal court ornaments.',
    craftsmanship: 'Hand-set by master artisans using the traditional Kundan setting technique. Each glass stone is carefully framed in gold foil, requiring over 18 hours of precise handcrafting.',
    materials: ['22k Gold Plated Brass', 'Premium Kundan Stones', 'Natural Seed Pearls', 'Semi-precious Ruby Beads'],
    specifications: {
      Weight: '18.4 grams',
      Dimensions: '2.5 inches length, 1.2 inches width',
      Closure: 'Push Back post with security latch',
      Finish: 'Antique Gold Polish'
    }
  },
  {
    id: 'royal-ruby-signature-earrings',
    name: 'Royal Ruby Signature Earrings',
    category: 'Earrings',
    subcategory: 'Signature',
    price: '32,500.00',
    originalPrice: '36,000.00',
    rating: '4.8',
    reviews: '89',
    img: earrings2Premium,
    description: 'Signature Royal Earrings featuring teardrop synthetic rubies surrounded by uncut CZ diamonds. Designed to elevate bridal and festive ensembles with unmatched royal grandeur.',
    craftsmanship: 'Crafted using fine filigree wirework, with hand-selected pear-cut rubies positioned at the heart of an intricate floral arrangement.',
    materials: ['Sterling Silver base', '22k Gold Gilding', 'Synthetic Drop Rubies', 'Cubic Zirconia (CZ) Polki'],
    specifications: {
      Weight: '22.1 grams',
      Dimensions: '3.1 inches length',
      Closure: 'Screw back',
      Finish: 'High-polish Royal Gold'
    }
  },
  {
    id: 'classic-gold-jhumka',
    name: 'Classic Gold Jhumka',
    category: 'Earrings',
    subcategory: 'Jhumka',
    price: '18,500.00',
    originalPrice: '21,000.00',
    rating: '4.7',
    reviews: '210',
    img: productChandbali,
    description: 'A timeless silhouette, this classic dome-shaped Jhumka is finished with delicate hanging pearls and antique gold embossing. Perfect for traditional celebrations.',
    craftsmanship: 'Formed using ancient repoussé metalworking techniques to create a hollow, lightweight dome structure, detailed with hand-soldered wire loops.',
    materials: ['22k Gold Plated Silver', 'Natural Freshwater Pearl drops', 'CZ accents'],
    specifications: {
      Weight: '14.2 grams',
      Dimensions: '2.2 inches length',
      Closure: 'Post with butterfly clutch',
      Finish: 'Brushed Antique Gold'
    }
  },
  {
    id: 'heritage-meenakari-jhumki',
    name: 'Heritage Meenakari Jhumki',
    category: 'Earrings',
    subcategory: 'Jhumki',
    price: '15,999.00',
    originalPrice: '18,999.00',
    rating: '4.9',
    reviews: '156',
    img: productChandbali,
    description: 'Charming mini jhumki detailed with vibrant pink and green hand-painted Meenakari enamel work, capturing the heritage art of Jaipur.',
    craftsmanship: 'Each piece undergoes fine enameling, where glass powder is painted into hand-etched channels and fired in a high-temperature kiln for lasting brilliance.',
    materials: ['Jaipur Enamel (Meenakari)', '22k Gold Plated Copper', 'Faceted Emerald beads'],
    specifications: {
      Weight: '11.5 grams',
      Dimensions: '1.8 inches length',
      Closure: 'Wire hook',
      Finish: 'Enamel Lustre'
    }
  },
  {
    id: 'evil-eye-artisan-earrings',
    name: 'Evil Eye Artisan Earrings',
    category: 'Earrings',
    subcategory: 'Evil Eye',
    price: '9,500.00',
    originalPrice: '12,000.00',
    rating: '4.8',
    reviews: '312',
    img: earringsPremium,
    description: 'Artisan protective amulets reimagined as luxury earrings, featuring turquoise inlay and a central sapphire CZ eye motif.',
    craftsmanship: 'Micro-paved by hand using premium turquoise chips and faceted cubic zirconia in a modern circular frame.',
    materials: ['Turquoise stone inlay', 'Sapphire CZ', '18k Gold Plated Brass'],
    specifications: {
      Weight: '8.5 grams',
      Dimensions: '1.2 inches diameter',
      Closure: 'Hinged hoop clicker',
      Finish: 'High Polish Gold'
    }
  },
  {
    id: 'diamond-stud-bridal-set',
    name: 'Diamond Stud Bridal Set',
    category: 'Earrings',
    subcategory: 'Stud',
    price: '28,000.00',
    originalPrice: '32,000.00',
    rating: '5.0',
    reviews: '78',
    img: earrings2Premium,
    description: 'Magnificent oversized stud earrings detailed with brilliant-cut diamonds in an ornate floral frame. A perfect statement stud for brides.',
    craftsmanship: 'Engineered with custom back-support columns to distribute weight comfortably while keeping the stud flush against the ear lobe.',
    materials: ['Faceted CZ Polki', 'White Gold plating', 'Sterling Silver core'],
    specifications: {
      Weight: '16.8 grams',
      Dimensions: '1.5 inches diameter',
      Closure: 'Heavy-duty post with screw-on disc',
      Finish: 'Rhodium plating'
    }
  },
  {
    id: 'festive-kundan-chandbali',
    name: 'Festive Kundan Chandbali',
    category: 'Earrings',
    subcategory: 'Festive',
    price: '22,000.00',
    originalPrice: '26,000.00',
    rating: '4.7',
    reviews: '195',
    img: productChandbali,
    description: 'Iconic crescent-shaped Chandbali earrings adorned with Kundan work, emerald drops, and fine pearl clustering. Exemplifies festive luxury.',
    craftsmanship: 'The crescent shape is cut using traditional metal shears and finished with hand-wired dangling pearl tassels (piroi work).',
    materials: ['22k Gold Plated Silver', 'Uncut CZ Polki', 'Hydro Emerald beads', 'Freshwater Pearls'],
    specifications: {
      Weight: '24.0 grams',
      Dimensions: '3.0 inches length, 2.0 inches width',
      Closure: 'Push back post with omega clip',
      Finish: 'Yellow Gold Polish'
    }
  },
  {
    id: 'beaded-loops-hoops',
    name: 'Beaded Loops & Hoops',
    category: 'Earrings',
    subcategory: 'Loops & Hoops',
    price: '6,500.00',
    originalPrice: '8,000.00',
    rating: '4.6',
    reviews: '423',
    img: earringsPremium,
    description: 'Modern bohemian hoops wrapped with fine seed pearls and faceted ruby beads. Versatile everyday statements.',
    craftsmanship: 'Hand-wrapped with fine metallic wires to secure over 60 individual micro-beads along the hoop circumference.',
    materials: ['18k Gold Plated Brass', 'Natural Red Coral beads', 'Micro seed pearls'],
    specifications: {
      Weight: '6.2 grams',
      Dimensions: '1.7 inches diameter',
      Closure: 'Latch back',
      Finish: 'Satin Gold'
    }
  },

  // --- NECKLACES ---
  {
    id: 'temple-lakshmi-necklace',
    name: 'Temple Lakshmi Necklace',
    category: 'Necklaces',
    price: '45,999.00',
    originalPrice: '49,999.00',
    rating: '4.9',
    reviews: '1,204',
    img: necklacePremium,
    description: 'An absolute masterpiece of heritage temple jewelry, featuring a hand-carved pendant of Goddess Lakshmi seated on a lotus, flanked by peacocks.',
    craftsmanship: 'Crafted using the ancient Nakshi repoussé technique, where design is embossed from the reverse side of a solid metal sheet to give a 3D structural finish.',
    materials: ['22k Gold Plated Sterling Silver', 'Natural Rubies', 'Faceted Emerald beads', 'South Sea Pearls'],
    specifications: {
      Weight: '78.5 grams',
      Length: '18 inches (adjustable dori)',
      PendantSize: '3.5 inches length, 2.8 inches width',
      Closure: 'Adjustable silk cord thread (Dori)'
    }
  },
  {
    id: 'emerald-choker-masterpiece',
    name: 'Emerald Choker Masterpiece',
    category: 'Necklaces',
    price: '75,000.00',
    originalPrice: '82,000.00',
    rating: '5.0',
    reviews: '67',
    img: necklace2Premium,
    description: 'A luxurious choker necklace detailed with large faceted emerald cabochons and surrounded by brilliant-cut cubic zirconia.',
    craftsmanship: 'Individually prong-set gemstones in a flexible link network that contours smoothly around the neck for a comfortable, flush fit.',
    materials: ['Premium Russian Emeralds', 'VVS-grade CZ Diamonds', 'Rhodium Plated Silver'],
    specifications: {
      Weight: '64.2 grams',
      Length: '14 inches with 2-inch extension chain',
      Closure: 'Secure fold-over clasp',
      Finish: 'Rhodium White Gold'
    }
  },
  {
    id: 'antique-gold-harram',
    name: 'Antique Gold Harram',
    category: 'Necklaces',
    price: '55,500.00',
    originalPrice: '60,000.00',
    rating: '4.8',
    reviews: '312',
    img: productTempleNecklace,
    description: 'Long traditional coin necklace (Kasulaperu) decorated with antique gold beads and a central deity pendant. A classic south Indian bridal favorite.',
    craftsmanship: 'Die-stamped gold coins are hand-linked to a heavy braided chain, with detailed wire-wrap spacing between each motif.',
    materials: ['22k Gold Plated Brass', 'Cabochon Ruby drops', 'Rice Pearls'],
    specifications: {
      Weight: '92.0 grams',
      Length: '24 inches',
      Closure: 'Adjustable thread cord',
      Finish: 'Dull Antique Polish'
    }
  },
  {
    id: 'classic-kundan-necklace',
    name: 'Classic Kundan Necklace',
    category: 'Necklaces',
    price: '38,999.00',
    originalPrice: '42,999.00',
    rating: '4.7',
    reviews: '189',
    img: necklace2Premium,
    description: 'Elegant Kundan choker detailing with hanging glass beads and gold foil setting, offering the classic royal Rajasthani look.',
    craftsmanship: 'Hand-pressed gold foil (Kundan) setting with red enamel coating (Meenakari) on the reverse side.',
    materials: ['Kundan Jadau', 'Glass stones', 'Green Quartz beads', '22k Gold Plating'],
    specifications: {
      Weight: '52.4 grams',
      Length: '15 inches',
      Closure: 'Adjustable thread drawstring',
      Finish: 'Enamelled Reverse'
    }
  },

  // --- BRACELETS ---
  {
    id: 'royal-heritage-kada',
    name: 'Royal Heritage Kada',
    category: 'Bracelets',
    price: '16,500.00',
    originalPrice: '19,500.00',
    rating: '4.9',
    reviews: '142',
    img: braceletPremium,
    description: 'An openable royal Kada bangle with tiger-head terminations, embellished with fine ruby carving and traditional gold etching.',
    craftsmanship: 'Carved using hand-graving chisels (chasing) to create intricate details on the metal surface, followed by acid-bath antiquing.',
    materials: ['Solid Silver base', '22k Gold Gilding', 'Natural Ruby stone eyes'],
    specifications: {
      Weight: '38.6 grams',
      Size: '2.4 to 2.8 adjustable openable',
      Closure: 'Hinged with screw pin lock',
      Finish: 'Distressed Gold'
    }
  },
  {
    id: 'emerald-cuff-bangle',
    name: 'Emerald Cuff Bangle',
    category: 'Bracelets',
    price: '21,000.00',
    originalPrice: '24,000.00',
    rating: '4.8',
    reviews: '96',
    img: productGoldPayal,
    description: 'A solid gold-plated cuff bangle showcasing three brilliant oval-cut emeralds in a raised filigree framework.',
    craftsmanship: 'Formed from sheet silver and decorated with fine twisted wire filigree overlays, polished to a bright yellow gold sheen.',
    materials: ['Faceted Emeralds', 'Sterling Silver', '22k Gold Plating'],
    specifications: {
      Weight: '29.5 grams',
      Size: 'Fits wrist up to 7.2 inches',
      Closure: 'Slip-on open cuff',
      Finish: 'High Polish Gold'
    }
  },
  {
    id: 'classic-kundan-kada',
    name: 'Classic Kundan Kada',
    category: 'Bracelets',
    price: '18,999.00',
    originalPrice: '21,999.00',
    rating: '4.7',
    reviews: '118',
    img: productMeenakariBangle,
    description: 'Jaipur enamel work Kada with inner floral Meenakari work and outer Kundan stone setting.',
    craftsmanship: 'A dual-sided masterpiece with traditional glass stone setting on the exterior and hand-painted floral enamel inside.',
    materials: ['Sterling Silver core', 'Jaipur Meenakari enamel', 'Kundan stones'],
    specifications: {
      Weight: '42.2 grams',
      Size: '2.6 (Medium)',
      Closure: 'Hinged with safety clasp',
      Finish: 'Dual-sided Artisan'
    }
  },

  // --- RINGS ---
  {
    id: 'royal-solitaire-ring',
    name: 'Royal Solitaire Ring',
    category: 'Rings',
    price: '12,500.00',
    originalPrice: '15,000.00',
    rating: '4.9',
    reviews: '235',
    img: ringPremium,
    description: 'An elegant statement ring showcasing a brilliant cushion-cut CZ solitaire sitting on a micro-paved band. Pure royal simplicity.',
    craftsmanship: 'Four-prong elevated basket setting to maximize light refraction through the central stone.',
    materials: ['Cushion-cut CZ', 'Sterling Silver core', 'Platinum plating'],
    specifications: {
      Weight: '4.8 grams',
      RingSize: 'US 7 (Resizable)',
      Width: '2.2mm band',
      Finish: 'Platinum Polish'
    }
  },
  {
    id: 'emerald-halo-ring',
    name: 'Emerald Halo Ring',
    category: 'Rings',
    price: '14,000.00',
    originalPrice: '16,500.00',
    rating: '4.8',
    reviews: '174',
    img: ring2Premium,
    description: 'A striking oval-cut emerald centerpiece surrounded by a double halo of brilliant CZ diamonds in a vintage milgrain setting.',
    craftsmanship: 'Hand-milgrained edges create a detailed beaded texture around the halos, reminiscent of Edwardian jewelry.',
    materials: ['Natural Emerald', 'CZ diamonds', '18k Yellow Gold Plating'],
    specifications: {
      Weight: '5.4 grams',
      RingSize: 'US 6.5 (Resizable)',
      Finish: 'Milgrain Vintage'
    }
  },

  // --- JEWELRY SETS (Handmade) ---
  {
    id: 'kundan-heritage-bridal-set',
    name: 'Kundan Heritage Bridal Set',
    category: 'Sets',
    price: '1,25,000.00',
    originalPrice: '1,45,000.00',
    rating: '5.0',
    reviews: '42',
    img: productKundanSet,
    description: 'A heavy bridal set comprising a grand choker, matching long necklace, jhumka earrings, and a mathapatti, detailed with Kundan and hanging pearls.',
    craftsmanship: 'Over 120 hours of collaborative work. Features intricate gold foil settings and hand-braided silk cords.',
    materials: ['22k Yellow Gold base', 'VVS Uncut Polki CZ', 'Freshwater Seed Pearls', 'Natural Ruby drops'],
    specifications: {
      Weight: '245 grams total set weight',
      ChokerLength: '12-16 inches adjustable',
      Earrings: '3.5 inches drop length',
      Closure: 'Heavy-duty adjustable silk cord'
    }
  },
  {
    id: 'deluxe-royal-choker-set',
    name: 'Deluxe Royal Choker Set',
    category: 'Sets',
    price: '95,000.00',
    originalPrice: '1,10,000.00',
    rating: '4.9',
    reviews: '31',
    img: jewelrySetPremium,
    description: 'Classic choker jewelry set showing beautiful teardrop pearls, rubies, and emeralds set in gold-plated brass framework.',
    craftsmanship: 'Hand-woven using micro-wire threads to link individual gemstone sections into a flexible, solid neckpiece.',
    materials: ['Gold Plated Sterling Silver', 'Hydro emerald beads', 'Natural Ruby cabochons'],
    specifications: {
      Weight: '168 grams total set weight',
      NecklaceLength: '14-18 inches adjustable',
      Closure: 'Adjustable drawstring cord'
    }
  },

  // --- NAJARBATTU ---
  {
    id: 'traditional-gold-najarbattu',
    name: 'Traditional Gold Najarbattu with Black Beads',
    category: 'Najarbattu',
    price: '8,500.00',
    originalPrice: '10,000.00',
    rating: '4.8',
    reviews: '412',
    img: najarbattuPremium,
    description: 'A traditional gold-beaded protective amulet (Najarbattu) with black onyx beads to ward off negative energies and bring prosperity.',
    craftsmanship: 'Hand-strung with high-tension jeweler wire and solid 22k gold plated accents, using hand-burnished protective motifs.',
    materials: ['22k Gold Plated Brass', 'Natural Black Onyx beads', 'Handcrafted spacer beads'],
    specifications: {
      Weight: '6.5 grams',
      Length: '16 inches with 2-inch extension',
      Closure: 'Lobster claw clasp',
      Finish: 'High Polish Gold'
    }
  },
  {
    id: 'silver-evil-eye-najarbattu',
    name: 'Silver Evil Eye Najarbattu',
    category: 'Najarbattu',
    price: '4,500.00',
    originalPrice: '5,500.00',
    rating: '4.6',
    reviews: '230',
    img: najarbattuPremium,
    description: 'Sterling silver evil eye protective necklace with turquoise inlay and a central sapphire cubic zirconia.',
    craftsmanship: 'Micro-paved and cast in high-quality silver with hand-applied blue resin enamel work.',
    materials: ['925 Sterling Silver', 'Turquoise Resin Enamel', 'Sapphire CZ'],
    specifications: {
      Weight: '4.8 grams',
      Length: '15 inches',
      Closure: 'Spring ring clasp',
      Finish: 'Rhodium plating'
    }
  },
  {
    id: 'premium-gold-beaded-najarbattu',
    name: 'Premium Gold Beaded Najarbattu',
    category: 'Najarbattu',
    price: '12,000.00',
    originalPrice: '14,500.00',
    rating: '4.9',
    reviews: '180',
    img: najarbattuPremium,
    description: 'Luxury interpretation of the classic protective amulet, featuring solid gold-plated filigree beads and micro black pearls.',
    craftsmanship: 'Ornate filigree beads individually hand-carved and spaced with hand-selected small black freshwater pearls.',
    materials: ['22k Gold Plated Silver', 'Black Freshwater Pearls', 'CZ diamonds'],
    specifications: {
      Weight: '9.2 grams',
      Length: '18 inches',
      Closure: 'S-hook clasp',
      Finish: 'Antique Gold Polish'
    }
  },
  {
    id: 'kundan-pearl-najarbattu',
    name: 'Kundan & Pearl Najarbattu Pendant',
    category: 'Najarbattu',
    price: '9,999.00',
    originalPrice: '11,500.00',
    rating: '4.7',
    reviews: '315',
    img: najarbattuPremium,
    description: 'A striking Kundan pendant with protective black glass beads and hanging pearl drop tassels.',
    craftsmanship: 'Hand-set using traditional Rajasthani jadau methods with detailed reverse enameling.',
    materials: ['Kundan Jadau', 'Glass stones', 'Freshwater Pearls', 'Black Spinel beads'],
    specifications: {
      Weight: '8.0 grams',
      Dimensions: '1.2 inches pendant diameter',
      Closure: 'Adjustable thread cord',
      Finish: 'Mughal Antique'
    }
  },

  // --- HAIRPIN ---
  {
    id: 'bridal-pearl-gold-hairpin',
    name: 'Bridal Pearl & Gold Juda Hairpin',
    category: 'Hairpin',
    price: '12,999.00',
    originalPrice: '15,500.00',
    rating: '4.9',
    reviews: '156',
    img: hairpinPremium,
    description: 'A beautiful oversized bridal hairpin designed for traditional hair buns, decorated with cluster pearls and gold-plated floral branches.',
    craftsmanship: 'Metal wire-shaping technique where each pearl is hand-twisted onto gold plated branches to form a natural blooming shape.',
    materials: ['Gold Plated Copper wire', 'Natural Freshwater Pearls', 'CZ crystal drops'],
    specifications: {
      Weight: '24 grams',
      Dimensions: '4.5 inches length, 2.5 inches width',
      Prongs: 'Double-pronged hairpin',
      Finish: 'Polished Gold'
    }
  },
  {
    id: 'antique-gold-temple-hairpin',
    name: 'Antique Gold Temple Hairpin',
    category: 'Hairpin',
    price: '18,500.00',
    originalPrice: '21,000.00',
    rating: '4.8',
    reviews: '98',
    img: hairpinPremium,
    description: 'Heritage temple style hair accessory (Juda pin) showing embossed designs of peacocks in antique gold finish.',
    craftsmanship: 'Repoussé sheet metal stamping, manually carved and assembled onto a heavy brass hair prong.',
    materials: ['Brass base', '22k Antique Gold Plating', 'Cabochon Ruby accents'],
    specifications: {
      Weight: '28 grams',
      Dimensions: '5.0 inches length',
      Prongs: 'Single heavy-duty prong',
      Finish: 'Antique Gold Polish'
    }
  },
  {
    id: 'ruby-embedded-juda-pin',
    name: 'Ruby Embedded Juda Pin',
    category: 'Hairpin',
    price: '14,000.00',
    originalPrice: '16,000.00',
    rating: '4.7',
    reviews: '210',
    img: hairpinPremium,
    description: 'Stunning floral hairpin featuring a central cabochon synthetic ruby surrounded by leaf-shaped Kundan stones.',
    craftsmanship: 'Intricate metal filigree layout with prong-set rubies and jadau foil-backed glass stones.',
    materials: ['Sterling Silver base', 'Synthetic Rubies', 'Uncut CZ Polki'],
    specifications: {
      Weight: '18 grams',
      Dimensions: '4.0 inches length',
      Prongs: 'Double-pronged',
      Finish: 'Yellow Gold Gilding'
    }
  },
  {
    id: 'floral-polki-hair-accessory',
    name: 'Floral Polki Hair Accessory',
    category: 'Hairpin',
    price: '22,000.00',
    originalPrice: '25,500.00',
    rating: '4.9',
    reviews: '142',
    img: hairpinPremium,
    description: 'A premium bridal hair accessory detailed with sparkling Polki diamonds in a gorgeous blooming flower configuration.',
    craftsmanship: 'Crafted using hand-set glass stones in foil frames, soldered onto a strong hair comb attachment.',
    materials: ['CZ Polki stones', 'Copper alloy base', 'Gold plating'],
    specifications: {
      Weight: '32 grams',
      Dimensions: '3.8 inches width',
      Attachment: 'Wire hair comb slide',
      Finish: 'Antique Gold'
    }
  },

  // --- ANTIQUE ITEMS ---
  {
    id: 'mughal-peacock-box',
    name: 'Mughal Peacock Box - Heritage Artifact',
    category: 'Antique',
    price: '15,999.00',
    originalPrice: '18,500.00',
    rating: '4.9',
    reviews: '89',
    img: productAntiqueBox,
    description: 'An authentic brass jewelry box from Rajasthan, hand-embossed with classic Mughal floral creepers and Peacock iconography.',
    craftsmanship: 'Hand-hammered and sheet-worked by family blacksmiths in Jodhpur, featuring detailed manual chisel stamping.',
    materials: ['Solid Brass sheet', 'Velvet inner lining', 'Antique patina lacquer'],
    specifications: {
      Weight: '1.2 kg',
      Dimensions: '8 x 6 x 4 inches',
      Age: 'Replica of 19th Century royal boxes',
      Origin: 'Jodhpur, Rajasthan'
    }
  },
  {
    id: 'meenakari-royal-bangles',
    name: 'Meenakari Royal Bangles - Jaipur Enamel Work',
    category: 'Antique',
    price: '18,999.00',
    originalPrice: '22,000.00',
    rating: '4.8',
    reviews: '412',
    img: lampJpg,
    description: 'Rare Jaipuri enamelled antique bangles showing vibrant color palettes and hand-painted bird motifs.',
    craftsmanship: 'Intricate fire-kilned glass enamelling on hand-cast copper bangles, polished to a dull antique shine.',
    materials: ['Jaipur Glass Enamel', 'Recycled Copper core', 'Gold gilding'],
    specifications: {
      Weight: '62 grams pair weight',
      Size: '2.4 Bangle size',
      Finish: 'Jaipuri Meenakari Enamelled'
    }
  },
  {
    id: 'vintage-brass-ganesha-idol',
    name: 'Vintage Brass Ganesha Idol - 19th Century Style',
    category: 'Antique',
    price: '24,500.00',
    originalPrice: '28,000.00',
    rating: '4.9',
    reviews: '124',
    img: antiquePng,
    description: 'An elegant solid brass Ganesha idol in dhyana mudra (meditating posture), detailed with a gorgeous dark antique green-brown patina.',
    craftsmanship: 'Cast using the lost-wax method (Cire Perdue), where each mold is destroyed to create a single unique statue, followed by hand-carving.',
    materials: ['Pure Brass alloy', 'Dark Antique Lacquer finish'],
    specifications: {
      Weight: '3.4 kg',
      Dimensions: '9.5 inches height, 6.0 inches width',
      Origin: 'Aligarh casting hubs'
    }
  },
  {
    id: 'mughal-peacock-jewelry-casket',
    name: 'Mughal Peacock Casket Box',
    category: 'Antique',
    price: '12,500.00',
    originalPrice: '14,999.00',
    rating: '4.8',
    reviews: '56',
    img: productAntiqueBox,
    description: 'Small solid brass jewelry casket with peacock hinges and fine hand-etched floral scrolls. Perfect for storing heirloom rings.',
    craftsmanship: 'Lid is individually cast and hinged to a hand-soldered rectangular casket body.',
    materials: ['Cast Brass', 'Polished velvet tray'],
    specifications: {
      Weight: '750 grams',
      Dimensions: '5 x 4 x 3 inches',
      Finish: 'Dull Antique Patina'
    }
  },
  {
    id: 'artwork-richa-ganesha',
    name: 'Artwork by Richa - Ganesha Acrylic',
    category: 'Artwork',
    price: '11,999.00',
    originalPrice: '14,500.00',
    rating: '5.0',
    reviews: '28',
    img: artworkRicha,
    description: 'A vibrant modern acrylic painting of Lord Ganesha on stretched canvas, featuring rich textures and warm orange-blue color palettes.',
    craftsmanship: 'Hand-painted by artist Richa using professional-grade acrylic paints and palette knives to create 3D texture.',
    materials: ['Stretched Cotton Canvas', 'Premium Acrylic paints', 'Gloss varnish coat'],
    specifications: {
      Dimensions: '12 x 12 inches square',
      Frame: 'Comes pre-stretched, ready to hang',
      Medium: 'Acrylic on Canvas'
    }
  },
  {
    id: 'bridal-collection-portrait',
    name: 'Bridal Collection Heritage Frame',
    category: 'Bridal',
    price: '95,000.00',
    originalPrice: '1,10,000.00',
    rating: '4.9',
    reviews: '34',
    img: bridalCollection,
    description: 'An elite heritage collection showcasing the finest craftsmanship of Indian bridal jewelry, detailed in a solid gold-plated choker and matching accessories.',
    craftsmanship: 'Custom crafted according to specific neck measurements, linking traditional Kundan with heavy south Indian temple designs.',
    materials: ['22k Gold', 'Natural Uncut Diamonds', 'Freshwater pearls'],
    specifications: {
      SetWeight: '190 grams total',
      Components: 'Choker and Jhumki set'
    }
  }
];

// Inject default multi-view images for all products to keep data store clean but fully featured
products.forEach(p => {
  if (p.id === 'temple-lakshmi-necklace') {
    p.images = [p.img, necklacePremiumCloseup, necklacePremiumSide, necklacePremiumDisplay];
  } else {
    // Category fallbacks
    if (p.category === 'Earrings') {
      p.images = [p.img, earringsPremium, earrings2Premium, productChandbali];
    } else if (p.category === 'Necklaces') {
      p.images = [p.img, necklacePremium, necklace2Premium, productTempleNecklace];
    } else if (p.category === 'Bracelets') {
      p.images = [p.img, braceletPremium, productGoldPayal, productMeenakariBangle];
    } else if (p.category === 'Rings') {
      p.images = [p.img, ringPremium, ring2Premium, ringPremium];
    } else if (p.category === 'Sets') {
      p.images = [p.img, jewelrySetPremium, productKundanSet, jewelrySetPremium];
    } else if (p.category === 'Antique') {
      p.images = [p.img, productAntiqueBox, antiquePng, productAntiqueBox];
    } else if (p.category === 'Najarbattu') {
      p.images = [p.img, najarbattuPremium, najarbattuPremium, najarbattuPremium];
    } else if (p.category === 'Hairpin') {
      p.images = [p.img, hairpinPremium, hairpinPremium, hairpinPremium];
    } else {
      p.images = [p.img, p.img, p.img, p.img];
    }
  }
});

export const getProductById = (id) => {
  return products.find(p => p.id === id);
};

export const getRelatedProducts = (product, limit = 4) => {
  return products
    .filter(p => p.id !== product.id && (p.category === product.category || p.subcategory === product.subcategory))
    .slice(0, limit);
};
