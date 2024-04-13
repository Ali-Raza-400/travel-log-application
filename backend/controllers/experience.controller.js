import Experience from "../models/experience.model.js";

const CreateExperience = async (req, res, next) => {
  try {
    console.log("req.body", req.body);
    const exp = await Experience.create(req.body);
    console.log("created user",exp);

    res
      .status(201)
      .json({ message: "experience created successfully", exp });
    next();

  } catch (error) {
      console.error(error);
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
