import { Supplier } from "../../models/models.js";
import { getOrgId } from "../service/user.service.js";

export const createSupplier = async (req, res) => {
  try {
    try {
      const _orgId = await getOrgId(req.user._id);
      const s = { ...req.body, _orgId };
      const supplier = await Supplier.create(s);
      res.status(200).json({ message: `New supplier created: [${supplier.name}]` });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const findSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    const _orgId = await getOrgId(req.user._id);

    if (id && _orgId) {
      const supplier = await Supplier.findOne({ _orgId, _id: id });

      if (!supplier) {
        return res.status(404).json({ message: "Supplier not found" });
      }

      return res.status(200).json(supplier);
    } else {
      return res.status(400).json({ message: "Id or orgId is missing" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAllSuppliers = async (req, res) => {
  try {
    const _orgId = await getOrgId(req.user._id);

    const filter = { _orgId };

    const page = req.query.page || 1;
    const limit = req.query.limit || 15;
    const sortBy = req.query.sortBy ? JSON.parse(req.query.sortBy) : { key: "name", type: "asc" };
    const { searchKeyword } = req.query;

    let sort = {};

    if (isNaN(page) || isNaN(limit)) {
      return res.status(400).json({ message: "Invalid page or limit number" });
    }

    if (searchKeyword) {
      filter.$or = [
        { name: { $regex: searchKeyword, $options: "i" } },
        { email: { $regex: searchKeyword, $options: "i" } },
        // Add other fields if necessary, for example:
        // { description: { $regex: searchKeyword, $options: "i" } },
      ];
    }

    if (sortBy && sortBy.key && sortBy.type) {
      sort[sortBy.key] = sortBy.type === "asc" ? 1 : -1;
    }

    const startIndex = page && limit && (page - 1) * limit;

    const suppliers = await Supplier.find(filter).sort(sort).limit(Number(limit)).skip(startIndex);

    const totalSuppliers = await Supplier.countDocuments(filter);

    return res.status(200).json({
      suppliers,
      totalPages: Math.max(1, Math.ceil(totalSuppliers / limit)),
      totalSuppliers,
      page,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateSupplier = async (req, res) => {
  try {
    const { _id } = req.body;
    const supplier = await Supplier.findByIdAndUpdate(_id, req.body, {
      returnOriginal: false,
    });
    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }
    return res.status(200).json({ message: `Successfully updated ${supplier.name}` });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    const supplier = await Supplier.findByIdAndDelete(id);
    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    return res.status(200).json({
      message: `Supplier deleted successfully`,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
