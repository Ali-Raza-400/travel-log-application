import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Formik } from "formik";
import ImageUploader from 'react-images-upload';

const EditExperience = () => {
  const experienceId = useParams().id;
  const [experience, setExperience] = useState({});
  const [pictures, setPictures] = useState([]);
console.log("pictures",pictures);
  const onDrop = (picture) => {
      setPictures([...pictures, picture]);
  };
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

  // Function to format the period field
  const formatDate = (period) => {
    const date = new Date(parseInt(period));
    return date.toISOString().split("T")[0]; // Extract YYYY-MM-DD
  };

  return (
    <div>
      <Formik
        initialValues={{ title: "", description: "", period: "" }}
        onSubmit={(values, { setSubmitting }) => {
          console.log("values", values);
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
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
                period: formatDate(experience.period), // Format the period field
              });
            }
          }, [experience, setValues]);

          return (
            <form onSubmit={handleSubmit}>
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
                <img key={index} src={URL.createObjectURL(picture)} alt={`Image ${index}`} />
              ))}
              <ImageUploader
                withIcon={true}
                buttonText="Choose images"
                onChange={onDrop}
                imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                maxFileSize={5242880}
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
