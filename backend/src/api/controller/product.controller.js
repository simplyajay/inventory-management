import Product from "../../models/product.model.js";
import { getOrgId } from "../service/user.service.js";

export const createProduct = async (req, res) => {
  try {
    const orgId = await getOrgId(req.user._id);
    const prod = { ...req.body, _orgId: orgId };
    const product = await Product.create(prod);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const findProduct = async (req, res) => {
  try {
    const orgId = await getOrgId(req.body._id);
    const product = await Product.find({ _orgId: orgId });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const orgId = await getOrgId(req.user._id);

    const { page, limit, sortBy } = req.query;

    if (isNaN(page) || isNaN(limit)) {
      return res.status(400).json({ message: "Invalid page or limit number" });
    }
    const filter = { _orgId: orgId };
    if (sortBy) {
      filter[sortBy] = { $exists: true };
    }

    const startIndex = page && limit && (page - 1) * limit;

    const products = await Product.find(filter)
      .limit(Number(limit))
      .skip(startIndex);

    const totalProducts = await Product.countDocuments(filter);

    return res.status(200).json({
      products,
      totalPages: Math.ceil(totalProducts / limit),
      totalProducts,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { _id } = req.body;
    const product = await Product.findByIdAndUpdate(_id, req.body);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const updatedProduct = await Product.findById(_id);
    return res.status(200).json(updatedProduct);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const updatedProducts = await Product.find({});

    return res
      .status(200)
      .json({ message: "Delete Successful", updatedProducts });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
