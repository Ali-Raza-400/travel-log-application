import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import ImageUploader from "react-images-upload";

const EditExperience = () => {
  const experienceId = useParams().id;
  const [experience, setExperience] = useState({});
  const [pictures, setPictures] = useState([]);
  const nevigate = useNavigate();
  useEffect(() => {
    async function fetchExpById(experienceId) {
      try {
        const response = await axios.get(
          `/experience/Single-experience/${experienceId}`
        );
        setExperience(response.data.exp);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchExpById(experienceId);
  }, []);

  const onDrop = async (file) => {
    try {
      // Upload image to the server
      const formData = new FormData();
      formData.append("image", file);
      const response = await axios.post("/upload-image-endpoint", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // Set the image URL in the state
      setPictures([
        {
          file,
          preview: URL.createObjectURL(file),
          imageUrl: response.data.imageUrl,
        },
      ]);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div>
      <Formik
        initialValues={{ title: "", description: "", period: "", imageUrl: "" }}
        onSubmit={async (values, { setSubmitting }) => {
          console.log("values", values);
          try {
            // Include image URL in the form values
            console.log("pictures", pictures);
            const payload = {
              ...values,
              imageUrl:
                pictures.length > 0
                  ? pictures[0].imageUrl
                  : "https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg",
              _id: experience._id,
            };
            await axios.post("/experience/add", payload);
            nevigate("/");
          } catch (error) {
            console.error("Submission error:", error);
            // setSubmitting(false);
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setValues,
        }) => {
          // eslint-disable-next-line
          useEffect(() => {
            // Set form values once experience data is fetched
            if (experience.description && experience.title) {
              setValues({
                title: experience.title,
                description: experience.description,
                period: experience.period,
                imageUrl: experience.imageUrl || "", // Format the period field
              });
            }
          }, [experience, setValues]);

          return (
            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <input
                type="text"
                name="title"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
              />
              {errors.title && touched.title && errors.title}
              <input
                type="text"
                name="description"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
              />
              {errors.description && touched.description && errors.description}
              <input
                type="date"
                name="period"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.period}
              />
              {errors.period && touched.period && errors.period}
              {pictures.map((picture, index) => (
                <img
                  key={index}
                  src={picture.preview}
                  alt={`Image ${index}`}
                  width={100}
                  height={100}
                />
              ))}
              <ImageUploader
                withIcon={true}
                buttonText="Choose image"
                onChange={onDrop}
                imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                maxFileSize={5242880}
                singleImage={true} // Allow only one image
              />
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

export default EditExperience;
