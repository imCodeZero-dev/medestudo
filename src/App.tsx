import "./App.css";
import ProjectRoutes from "./Routes";
import { QueryClientProvider } from "react-query";
import { queryClient } from "./config/QueryClient";
import ToastProvider from "./config/toastProvider/ToastProvider";
import { Cloudinary } from "@cloudinary/url-gen";
import { CLOUDINARY_CLOUD_NAME } from "./utils/constants/constants";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./App.css";

function App() {
  // const cld = new Cloudinary({
  //   cloud: {
  //     cloudName: CLOUDINARY_CLOUD_NAME,
  //   },
  // });
  return (
    <>
      <ToastProvider>
        <QueryClientProvider client={queryClient}>
          <GoogleOAuthProvider clientId="<your_client_id>">
            <ProjectRoutes />
          </GoogleOAuthProvider>
        </QueryClientProvider>
      </ToastProvider>
    </>
  );
}

export default App;
