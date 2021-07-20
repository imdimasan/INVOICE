import { Text } from "components";
import { Auth } from "modules";

import "./HomePage.scss";

function HomePage() {
  return (
    <div className="wrapper">
      <Text variant="h1" className="page__title">
        Home Page
      </Text>
      <Auth />
    </div>
  );
}

export default HomePage;
