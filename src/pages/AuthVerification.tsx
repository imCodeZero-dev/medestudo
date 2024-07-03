import { useSearchParams } from "react-router-dom";

const AuthVerification = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  return (
    <div className="h-full">
      <h1>Successfully redirect to the Auth page</h1>
      <p>Token: {token}</p>
    </div>
  );
};

export default AuthVerification;
