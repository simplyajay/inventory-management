import { Product } from "../../models/models.js";
import { getOrgId } from "../service/user.service.js";

export const createProduct = async (req, res) => {
  try {
    const _orgId = await getOrgId(req.user._id);
    const prod = { ...req.body, _orgId };
    const product = await Product.create(prod);
    res.status(200).json({ message: `Successfully added new product: [${product.name}]` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const findProduct = async (req, res) => {
  try {
    const _orgId = await getOrgId(req.user._id);
    const product = await Product.findOne({ _orgId });

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
    const _orgId = await getOrgId(req.user._id);

    const filter = { _orgId };

    const page = req.query.page || 1;
    const limit = req.query.limit || 15;
    const sortBy = req.query.sortBy ? JSON.parse(req.query.sortBy) : { key: "sku", type: "asc" };
    const { searchKeyword } = req.query;

    let sort = {};

    if (isNaN(page) || isNaN(limit)) {
      return res.status(400).json({ message: "Invalid page or limit number" });
    }

    if (searchKeyword) {
      filter.$or = [
        { name: { $regex: searchKeyword, $options: "i" } },
        { sku: { $regex: searchKeyword, $options: "i" } },
        // Add other fields if necessary, for example:
        // { description: { $regex: searchKeyword, $options: "i" } },
      ];
    }

    if (sortBy && sortBy.key && sortBy.type) {
      sort[sortBy.key] = sortBy.type === "asc" ? 1 : -1;
    }

    const startIndex = page && limit && (page - 1) * limit;

    const products = await Product.find(filter).sort(sort).limit(Number(limit)).skip(startIndex);

    const totalProducts = await Product.countDocuments(filter);

    return res.status(200).json({
      products,
      totalPages: Math.max(1, Math.ceil(totalProducts / limit)),
      totalProducts,
      page,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { _id } = req.body;
    const product = await Product.findByIdAndUpdate(_id, req.body, {
      returnOriginal: false,
    });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json({ message: `Successfully updated ${product.name}` });
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

    return res.status(200).json({
      message: `Product deleted successfully`,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const validateSku = async (req, res) => {
  try {
    const _orgId = await getOrgId(req.user._id);
    const product = await Product.findOne({ _orgId, sku: req.body.sku }); // get product that has that sku

    if (product) {
      //if has targetId and matches the product then it an update and should be excluded
      if (req.body.targetId && req.body.targetId === product._id.toString()) {
        return res.status(200).json({ message: "Sku is available", isValid: true });
      }
      return res.status(409).json({
        message: "Sku is already used. Use a different one",
        isValid: false,
      });
    }

    return res.status(200).json({ message: "Sku is available", isValid: true });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
