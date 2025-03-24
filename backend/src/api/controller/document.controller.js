import { Document } from "../../models/models.js";
import { getOrgId } from "../service/user.service.js";

export const createDocument = async (req, res) => {
  try {
    const org = await Document.create(req.body);
    res.status(200).json(org);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const findDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await Document.findById(id);

    if (!doc) {
      return res.status(404).json({ message: "Document not found" });
    }

    return res.status(200).json(doc);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAllDocuments = async (req, res) => {
  try {
    const doc = await Document.find({});
    return res.status(200).json(doc);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getDocumentsByEntity = async (req, res) => {
  try {
    const _orgId = await getOrgId(req.user._id);
    const { entityId } = req.params; // /url/entityId

    if (!_orgId || !entityId) {
      return res
        .status(404)
        .json({ success: false, message: "Identification Error", error: "NOT_FOUND" });
    }

    const filter = { _orgId, _entityId: entityId };
    const page = req.query.page || 1;
    const limit = req.query.limit || 15;
    const sortBy = req.query.sortBy
      ? JSON.parse(req.query.sortBy)
      : { key: "_documentId", type: "desc" };
    const { searchKeyword } = req.query;

    let sort = {};

    if (isNaN(page) || isNaN(limit)) {
      return res.status(400).json({ message: "Invalid page or limit number" });
    }

    if (searchKeyword) {
      filter.$or = [
        { _documentId: { $regex: searchKeyword, $options: "i" } },
        { memorandum: { $regex: searchKeyword, $options: "i" } },
        // Add other fields if necessary, for example:
        // { description: { $regex: searchKeyword, $options: "i" } },
      ];
    }

    if (sortBy && sortBy.key && sortBy.type) {
      sort[sortBy.key] = sortBy.type === "asc" ? 1 : -1;
    }

    const startIndex = page && limit && (page - 1) * limit;

    const documents = await Document.find(filter).sort(sort).limit(Number(limit)).skip(startIndex);

    const totalDocuments = await Document.countDocuments(filter);

    return res.status(200).json({
      success: true,
      message: "Fetch Successful",
      documents,
      totalPages: Math.max(1, Math.ceil(totalDocuments / limit)),
      totalDocuments: totalDocuments,
      page,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateDocument = async (req, res) => {
  try {
    const { id } = req.params;

    const doc = await Document.findByIdAndUpdate(id, req.body);

    if (!doc) {
      return res.status(404).json({ message: "Document not found" });
    }

    const updatedDocument = await Document.findById(id);
    return res.status(200).json(updatedDocument);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteDocument = async (req, res) => {
  try {
    const { id } = req.params;

    const doc = await Document.findByIdAndDelete(id);

    if (!doc) {
      return res.status(404).json({ message: "Document not found" });
    }

    const updatedDocuments = await User.find({});

    return res.status(200).json(updatedDocuments);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
