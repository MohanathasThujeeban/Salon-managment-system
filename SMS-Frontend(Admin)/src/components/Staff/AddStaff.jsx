import {
  Alert,
  Autocomplete,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  TextareaAutosize,
} from "@mui/material";

import Lottie from "lottie-react";
import React, { useEffect, useState } from "react";

import circleloader from "../../assets/circle-loader.json";
import useInputHandler from "../../hooks/InputHandler";
import { useAddStaff } from "../../hooks/Staff/useAddStaff";
import { colors } from "../../styles/colors";
import ImageUplod from "../ImageUpload/ImageUplod";

import styled from "styled-components";
import {
  AddServiceContainer,
  FormFields,
  FormInputWrapper,
  ServiceImages,
  UploadedImages,
} from "../Services/service.styles";

const AddComp = ({ setIsOpen, isOpen }) => {
  const [imageURLS, setImageURLs] = useState([]);
  const top100Films = [
    "The Shawshank Redemption",
    "The Godfather",
    // Add more film titles or replace with actual service specialties
  ];

  const [service_special, setServiceSpecial] = React.useState([...top100Films]);
  const { handleInput, formInput, handleFileChange, images, setImages } =
    useInputHandler({
      name: "",
      about: "",
      experience: "",
      email: "",
      working_time: "",
    });

  const { loading, addNewStaff, errors } = useAddStaff(
    { ...formInput, service_special },
    images,
    {
      setIsOpen,
      isOpen,
    }
  );

  // Generate image URLs for preview
  useEffect(() => {
    if (images.length < 1) return;
    const newImageUrls = images.map((image) => URL.createObjectURL(image));
    setImageURLs(newImageUrls);
  }, [images]);

  return (
    <React.Fragment>
      <AddServiceContainer onSubmit={addNewStaff}>
        {/* Image Upload Section */}
        <ServiceImages>
          <ImageUplod
            handleFileChange={handleFileChange}
            imageURLS={imageURLS}
            setImages={setImages}
          />

          <UploadedImages>
            {imageURLS.length > 3 ? (
              <React.Fragment>
                {imageURLS.slice(0, 3).map((item, index) => (
                  <img key={index} src={item} alt="Uploaded Images" />
                ))}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "20px",
                    opacity: 0.9,
                    borderRadius: "5px",
                    background: `${colors.colorBlack}`,
                    color: `${colors.colorWhite}`,
                  }}
                >
                  +{imageURLS.length - 3}
                </div>
              </React.Fragment>
            ) : (
              imageURLS.map((item, index) => (
                <img key={index} src={item} alt="Uploaded Image" />
              ))
            )}
          </UploadedImages>
        </ServiceImages>

        {/* Form Fields */}
        <FormFields>
          <TextField
            fullWidth
            name="name"
            size="medium"
            label="Stylist Name"
            variant="outlined"
            value={formInput.name}
            onChange={handleInput}
          />
          <TextField
            fullWidth
            name="email"
            margin="dense"
            size="medium"
            label="Email"
            variant="outlined"
            value={formInput.email}
            onChange={handleInput}
          />
          <FormInputWrapper>
            <FormControl fullWidth>
              <InputLabel id="work-type-label">Work Type</InputLabel>
              <Select
                labelId="work-type-label"
                size="medium"
                value={formInput.working_time}
                name="working_time"
                onChange={handleInput}
              >
                <MenuItem value="Part Time">Part Time</MenuItem>
                <MenuItem value="Full Time">Full Time</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              type="number"
              size="medium"
              name="experience"
              label="Experience (Years)"
              variant="outlined"
              value={formInput.experience}
              onChange={handleInput}
            />
          </FormInputWrapper>

          <Autocomplete
            id="service-specialties"
            multiple
            sx={{ width: "100%" }}
            value={service_special}
            onChange={(event, newValue) => setServiceSpecial(newValue)}
            options={top100Films}
            getOptionLabel={(option) => option}
            renderInput={(params) => (
              <TextField {...params} label="Service Specialties" placeholder="Specialty" />
            )}
          />

          <TextareaAutosize
            aria-label="About Stylist"
            value={formInput.about}
            name="about"
            onChange={handleInput}
            placeholder="About Stylist"
            style={{
              width: "100%",
              height: "150px",
              resize: "none",
              outline: "none",
              border: "1px solid black",
              borderRadius: "5px",
              padding: "10px",
              margin: "10px 0",
            }}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            style={{
              background: "#101727",
              borderRadius: "25px",
              height: "40px",
              padding: "10px",
              fontSize: "14px",
              fontWeight: "bold",
              textTransform: "capitalize",
            }}
          >
            {!loading ? (
              <span>Add Staff</span>
            ) : (
              <Lottie
                size={30}
                style={{ height: "100%" }}
                animationData={circleloader}
              />
            )}
          </Button>
        </FormFields>
      </AddServiceContainer>

      {/* Error Messages */}
      <ErrorContiner>
        {errors.length > 0 &&
          errors.map((item, id) => (
            <Alert key={id} severity="error" sx={{ margin: "5px 0" }}>
              {item.message}
            </Alert>
          ))}
      </ErrorContiner>
    </React.Fragment>
  );
};

export default AddComp;

// Styled Components
export const ErrorContiner = styled.div`
  position: fixed;
  bottom: 0px;
  left: 0px;
`;