import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const Home = React.lazy(() => import("pages/Home")); // Lazy-loaded
const SignUp = React.lazy(() => import("pages/SignUp")); // Lazy-loaded
const ConfirmSignUp = React.lazy(() => import("pages/ConfirmSignUp")); // Lazy-loaded

const App = () => {
  return (
    <Suspense fallback={<div>...loading</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/confirm-signup" element={<ConfirmSignUp />} />
      </Routes>
    </Suspense>
  );
};

export default App;
