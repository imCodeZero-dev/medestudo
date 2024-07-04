import { useNavigate, useSearchParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const AuthVerification = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();
  const [message, setMessage] = useState("Verifying...");

  const [cookies, setCookie, removeCookie] = useCookies([
    "professor",
    "student",
    "admin",
  ]);

  useEffect(() => {
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);

        const cookieOptions = {};

        removeCookie("professor", cookieOptions);
        removeCookie("student", cookieOptions);
        removeCookie("admin", cookieOptions);

        if (decodedToken.message === "Login successful") {
          console.log("decodedToken", decodedToken);
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
  }, [token, navigate]);

  return (
    <div className="h-full">
      <h1>{message}</h1>
    </div>
  );
};

export default AuthVerification;
