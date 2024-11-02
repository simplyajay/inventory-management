import Organization from "../../models/organization.model.js";

export const createOrganization = async (req, res) => {
  try {
    const org = await Organization.create(req.body);
    res.status(200).json(org);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const findOrganization = async (req, res) => {
  try {
    const { id } = req.params;
    const org = await Organization.findById(id);

    if (!org) {
      return res.status(404).json({ message: "Organization not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllOrganization = async (req, res) => {
  try {
    const org = await Organization.find({});
    res.status(200).json(org);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateOrganization = async (req, res) => {
  try {
    const { id } = req.params;

    const org = await Organization.findByIdAndUpdate(id, req.body);

    if (!org) {
      return res.status(404).json({ message: "Organization not found" });
    }

    const updatedOrg = await Organization.findById(id);
    res.status(200).json(updatedOrg);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteOrganization = async (req, res) => {
  try {
    const { id } = req.params;

    const org = await Organization.findByIdAndDelete(id);

    if (!org) {
      return res.status(404).json({ message: "Organization not found" });
    }

    const updatedOrgs = await User.find({});

    res.status(200).json(updatedOrgs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
