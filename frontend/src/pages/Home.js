import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Home = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!cookies.token) {
      navigate("/");
    } else {
      setLoading(false); // Set loading to false once cookies are available
    }
  }, [cookies.token, navigate]);

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

  return (
    <>
      <div className="home_page">
        <h4>
          {" "}
          Welcome <span>{username}</span>
        </h4>
        <button onClick={logout}>LOGOUT</button>
      </div>
      <ToastContainer />
    </>
  );
};

export default Home;
