import CircularProgress from "@material-ui/core/CircularProgress";
import "./Loader.scss";

function Loader() {
  return (
    <div className="loader">
      <CircularProgress color="secondary" />
    </div>
  );
}
export default Loader;
