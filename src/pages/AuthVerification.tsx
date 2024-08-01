import { useNavigate, useSearchParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Loader from "../components/LVL1_Atoms/Loader";

const AuthVerification = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const errorParam = searchParams.get("error");
  const navigate = useNavigate();
  const [message, setMessage] = useState("Verifying...");

  const [cookies, setCookie, removeCookie] = useCookies([
    "professor",
    "student",
    "admin",
  ]);

  useEffect(() => {
    if (errorParam) {
      if (errorParam.includes("User does not exist")) {
        console.log("not exist", errorParam);
        setMessage("User Does not Exist, Redirecting to sign-up...");
        setTimeout(() => {
          navigate("/student");
        }, 2000);
      } else if (errorParam.includes("Email_belongs_to_a_professor")) {
        console.log("Email_belongs_to_a_professor", errorParam);
        setMessage(
          "Email Belongs to Professor. try another one, Redirecting..."
        );
        setTimeout(() => {
          navigate("/student");
        }, 2000);
      } else {
        console.log("alreadyRegistered", errorParam);
        setMessage("User Already Registered. try login, Redirecting...");
        setTimeout(() => {
          navigate("/student");
        }, 2000);
      }
    } else {
      if (token) {
        try {
          const decodedToken: any = jwtDecode(token);
          const cookieOptions = {};
          debugger;
          removeCookie("professor", cookieOptions);
          removeCookie("student", cookieOptions);
          removeCookie("admin", cookieOptions);

          if (
            decodedToken.message === "Login successful" ||
            decodedToken.message === "Account created successfully"
          ) {
            const updatedStudent = {
              token: `Bearer ${decodedToken?.token}`,
              student: decodedToken?.user,
            };
            const updatedProfessor = {
              token: `Bearer ${decodedToken?.token}`,
              professor: decodedToken?.user,
            };
            if (decodedToken?.user?.role === "student") {
              setCookie("student", updatedStudent, { maxAge: 86400 });
              navigate("/student");
            } else {
              setCookie("professor", updatedProfessor, { maxAge: 86400 });
              navigate("/professor");
            }
            setMessage("Login successful! Redirecting...");
          } else {
            console.error("Login failed: ", decodedToken.message);
            setMessage("Login failed. Please try again.");

            navigate(-1);
            // Handle error message display here
          }
        } catch (error) {
          console.error("Invalid token: ", error);
          setMessage("Invalid token. Please try again.");
          navigate(-1);
          // Handle invalid token error display here
        }
      }
    }
  }, [token, navigate]);

  return (
    <div className="h-lvh flex justify-between items-center flex-col py-8">
      <h1 className="animate-bounce">{message}</h1>
      <Loader />
      <div></div>
    </div>
  );
};

export default AuthVerification;
