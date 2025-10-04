import { Department } from "../models/department-model.js";

const addDepartment = async (req, res) => {
  try {
    const { dep_name, description } = req.body;
    const newDepartment = await Department({ dep_name, description });
    await newDepartment.save();
    return res.status(200).json({ success: true, department: newDepartment });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: "Add Department server error" });
  }
};

const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find();

    return res.status(200).json({ success: true, departments: departments });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Get Department Server Error" });
  }
};
const getDepartmentById = async (req, res) => {
  const id = req.params.id;
  try {
    const department = await Department.findOne({ _id: id });
    return res.status(200).json({ success: true, department });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Get Department By ID Server Error" });
  }
};

const editDepartment = async (req, res) => {
  try {
    const id = req.params.id;
    const { dep_name, description } = req.body;
    const updateDep = await Department.findByIdAndUpdate(
      { _id: id },
      { dep_name: dep_name, description: description }
    );
    return res.status(200).json({ success: true, department: updateDep });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: "Edit Department server error" });
  }
};
const deleteDepartment = async (req, res) => {
  try {
    const id = req.params.id;
   const delDep = await Department.findOne({_id: id });
  //  console.log(delDep)
   await delDep.deleteOne()
    return res
      .status(200)
      .json({ success: true, delDep });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: "Delete Department Server Srror" });
  }
};

export {
  addDepartment,
  getDepartments,
  getDepartmentById,
  editDepartment,
  deleteDepartment,
};
