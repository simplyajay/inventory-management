import { generateDocumentID } from "./api/service/document.service.js";
import initializeDb from "./connection/connection.js";

const test = async () => {
  try {
    const id = await generateDocumentID();

    console.log(id);
    return;
  } catch (error) {
    console.log(error);
  }
};

initializeDb().then(() => test());
