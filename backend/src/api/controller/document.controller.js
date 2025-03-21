import { Document } from "../../models/models.js";

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
    const { entityId } = req.params; // this represents entity id
    const docs = await Document.find({ _orgId: entityId });
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
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
