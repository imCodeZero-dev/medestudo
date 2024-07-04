import { useNavigate, useSearchParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

const AuthVerification = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();
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
            token: decodedToken?.token,
            student: decodedToken?.user,
          };
          const updatedProfessor = {
            token: decodedToken?.token,
            professor: decodedToken?.user,
          };
          if (decodedToken?.user?.role === "student") {
            setCookie("student", updatedStudent, { maxAge: 86400 });
            navigate("/student");
          } else {
            setCookie("professor", updatedProfessor, { maxAge: 86400 });
            navigate("/professor");
          }
        } else {
          console.error("Login failed: ", decodedToken.message);
          // Handle error message display here
        }
      } catch (error) {
        console.error("Invalid token: ", error);
        // Handle invalid token error display here
      }
    }
  }, [token, navigate]);

  return (
    <div className="h-full">
      <h1>Successfully redirect to the Auth page</h1>
      <p>Token: {token}</p>
    </div>
  );
};

export default AuthVerification;
