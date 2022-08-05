import CardStatus from "./comps/CardStatus/CardStatus";
import Footer from "./comps/Footer/Footer";
import Header from "./comps/Header/Header";

const StatusDashboardApp: React.FC = () => {
  return (
    <>
      <Header />
      <CardStatus />
      <Footer />
    </>
  );
};
export default StatusDashboardApp;
