import { Routes, Route } from "react-router-dom";
import { UserPosts, UsersDashboard } from "../pages";

const RoutePage = () => {
  return (
    <Routes>
      <Route path="/" element={<UsersDashboard />} />
      <Route path="/user/:userId/posts" element={<UserPosts />} />
    </Routes>
  );
};

export { RoutePage };
