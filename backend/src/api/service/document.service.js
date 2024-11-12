import Document from "../../models/document.model.js";

export const generateDocumentID = async (user) => {
  try {
    const docs = await Document.find(
      { _orgId: user._orgId },
      { documentId: 1 }
    ).lean();
    const ids = docs
      .map((doc) => parseInt(doc.documentId.split("-")[1], 10))
      .filter((num) => !isNaN(num));

    const nextId = ids.length > 0 ? Math.max(...ids) + 1 : 1;
    if (!nextId) {
      throw new Error("Document Error");
    }

    const docId = `pdoc-${nextId}`;

    return docId;
  } catch (error) {
    throw new Error("Server Error: ", error);
  }
};
