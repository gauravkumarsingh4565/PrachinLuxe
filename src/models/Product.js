import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name for this product.'],
      maxlength: [100, 'Name cannot be more than 100 characters'],
    },
    category: {
      type: String,
      required: [true, 'Please provide a category.'],
    },
    subcategory: { type: String },
    price: {
      type: Number,
      required: [true, 'Please provide a price for this product.'],
    },
    originalPrice: { type: Number },
    inStock: {
      type: Boolean,
      default: true,
    },
    description: { type: String },
    craftsmanship: { type: String },

    // 4-side product images stored as objects with url and publicKey
    images: {
      front: {
        url: { type: String, default: '' },
        publicKey: { type: String, default: '' },
        publicId: { type: String, default: '' },
      },
      left: {
        url: { type: String, default: '' },
        publicKey: { type: String, default: '' },
        publicId: { type: String, default: '' },
      },
      right: {
        url: { type: String, default: '' },
        publicKey: { type: String, default: '' },
        publicId: { type: String, default: '' },
      },
      back: {
        url: { type: String, default: '' },
        publicKey: { type: String, default: '' },
        publicId: { type: String, default: '' },
      },
    },

    // Story section
    story: {
      title:          { type: String },
      description:    { type: String },
      subDescription: { type: String },
    },

    // Materials section
    material: {
      ingdrients: [
        {
          id:    { type: String },
          label: { type: String },
        },
      ],
      specification: [
        {
          id:  { type: String },
          key: { type: String },
          val: { type: String },
        },
      ],
    },

    // Care & Terms
    care: [
      {
        id:     { type: String },
        tittle: { type: String },
        des:    { type: String },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Prevent compiling model multiple times if it's already compiled
export default mongoose.models.Product || mongoose.model('Product', ProductSchema);

