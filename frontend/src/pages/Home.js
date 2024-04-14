  import React, { useEffect, useState } from "react";
  import { useNavigate } from "react-router-dom";
  import { useCookies } from "react-cookie";
  import axios from "axios";
  import { ToastContainer, toast } from "react-toastify";
  import Card from "@mui/material/Card";
  import CardActions from "@mui/material/CardActions";
  import CardContent from "@mui/material/CardContent";
  import CardMedia from "@mui/material/CardMedia";
  import Button from "@mui/material/Button";
  import Typography from "@mui/material/Typography";
  import { Box, CircularProgress } from "@mui/material";

  const Home = () => {
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(true);
    const [experience, setExperience] = useState([]);
    const [expLoading, setExpLoading] = useState(false);
    useEffect(() => {
      if (!cookies.token) {
        navigate("/");
      } else {
        setLoading(false); // Set loading to false once cookies are available
      }
    }, [cookies.token, navigate]);
    useEffect(() => {
      const fetchExperiences = async () => {
        try {
          setExpLoading(true)
          // await axios.get("/experience/list").then((res) => {
          //   setExperience(res.data.exp);
          // });
          const response = await axios.get("/experience/list");
          setExpLoading(false);
          console.log("response",response);
          setExperience(response.data.exp);
        } catch (error) {
          console.log("I am here");
          setExpLoading(false)
          console.log(error.message);
        }
      };
    
      fetchExperiences(fetchExperiences);
    }, []);
    useEffect(() => {
      if (!loading) {
        const verifyCookie = async () => {
          try {
            const { data } = await axios.post(
              "/user-verification",
              {},
              { withCredentials: true }
            );
            const { status, user } = data;
            setUsername(user);
            if (status) {
              toast(`Hello ${user}`, {
                position: "top-right",
              });
            } else {
              removeCookie("token");
              navigate("/login");
            }
          } catch (error) {
            console.error(error);
            removeCookie("token");
            navigate("/login");
          }
        };
        verifyCookie();
      }
    }, [loading, cookies.token, removeCookie, navigate]);

    const logout = () => {
      removeCookie("token");
      navigate("/signup");
    };

    if (loading) {
      return <div>Loading...</div>; // Display a loading indicator while cookies are being initialized
    }
    if (expLoading) {
      return <div><CircularProgress/></div>; // Display a loading indicator while cookies are being initialized
    }
  console.log("experience",experience);
    return (
      <>
        <div className="home_page">
          <h4>
            {" "}
            Welcome <span>{username}</span>
          </h4>
          <Box sx={{ display: "flex", gap: 2 }}>
            { experience.map((experience, index) => {
              return (
                <Card key={index} sx={{ maxWidth: 345 }}>
                  <CardMedia
                    sx={{ height: 140 }}
                    image={experience.imageUrl}
                    title="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {experience?.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {experience?.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Edit</Button>
                    {/* <Button size="small">Learn More</Button> */}
                  </CardActions>
                </Card>
              );
            })}
          </Box>

          {/* <button onClick={logout}>LOGOUT</button> */}
        </div>
        <ToastContainer />
      </>
    );
  };

  export default Home;
