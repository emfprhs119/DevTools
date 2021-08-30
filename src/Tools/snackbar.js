
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

export default function SnackbarMessage(props){
  return <Snackbar open={props.open}>
        <Alert severity="success">
          {props.message}
        </Alert>
      </Snackbar>
}