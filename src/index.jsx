import reactDom from "react-dom";

import DbProvider from "./contexts/DbContext";

import AuthProvider from "./contexts/AuthContext";
import { App } from "./App";

const Index = () => {
  return (
    <>
      <AuthProvider>
        <DbProvider>
          <App />
        </DbProvider>
      </AuthProvider>
    </>
  );
};
reactDom.render(<Index />, document.getElementById("root"));
