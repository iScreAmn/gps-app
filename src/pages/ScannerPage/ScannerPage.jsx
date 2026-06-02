import { useLocation } from "react-router-dom";
import Scanner from "./Scanner";

export default function ScannerPage() {
  const { pathname } = useLocation();
  // отдельный маршрут = новый mount: корректные initial state + полный unmount/cleanup сканера
  return <Scanner key={pathname} />;
}
