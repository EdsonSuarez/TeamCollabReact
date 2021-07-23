import { Alert } from "@material-ui/lab";

export default function Alerts({ show, type, message }) {
  return (
    <>
      {show && (
        <div className="container col-lg-12 mt-3">
          <Alert variant="outlined" severity={type} className="alertaTask">
            {message}
          </Alert>
        </div>
      )}
    </>
  );
}
