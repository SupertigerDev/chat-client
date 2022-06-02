import { useNavigate, useLocation } from "react-router-dom";

export default function useCustomNavigate() {
  const navigate = useNavigate();
  const location = useLocation();

  return (to: string) => {
    if (to === location.pathname) return;
    navigate(to);
  } 
}