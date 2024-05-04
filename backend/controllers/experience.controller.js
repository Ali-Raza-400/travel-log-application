import Experience from "../models/experience.model.js";

const CreateExperience = async (req, res, next) => {
  console.log("I am hit");
  try {
    console.log("req.body", req.body);
    let exp;
    if (req.body._id) {
      // If _id is provided, update the existing record
      exp = await Experience.findByIdAndUpdate(req.body._id, req.body, { new: true });
    } else {
      // If _id is not provided, create a new record
      exp = await Experience.create(req.body);
    }

    console.log("updated/created experience:", exp);
    res.status(200).json({ message: "Experience saved successfully", exp });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


const ListExperience = async (req, res, next) => {
  try {
    const exp = await Experience.find();
    console.log("get all experice",exp);

    res
      .status(200)
      .json({ message: "experience created successfully", exp });
    next();

  } catch (error) {
      console.error(error);
    }
};
const ListExperienceById = async (req, res, next) => {
    const experienceId = req.params.id;
  try {
    const exp = await Experience.findById({ _id: experienceId});
    console.log("get Single experience",exp);

    res
      .status(200)
      .json({ message: "experience By id ", exp });
    next();

  } catch (error) {
      console.error(error);
    }
};
const RemoveExperienceById = async (req, res, next) => {
    const experienceId = req.params.id;
  try {
    const exp = await Experience.findByIdAndDelete({ _id: experienceId});
    console.log("Delete Single experience",exp);

    res
      .status(200)
      .json({ message: "Delete experience By id ", exp });
    next();

  } catch (error) {
      console.error(error);
    }
};

export { CreateExperience,ListExperience,ListExperienceById,RemoveExperienceById };
