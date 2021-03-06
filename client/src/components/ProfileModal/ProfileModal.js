import { Avatar, Button, Divider, IconButton, Popover } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { useState, memo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { logout } from '../../redux/reducers/appAuthReducer';
import { useStyles } from "./ProfileModalClasses";

function ProfileModal() {
  const user = useSelector(store => store.appUser);
  const dispatch = useDispatch();
  const [modalAnchor, setModalEnchor] = useState(null);
  const classes = useStyles();
  const history = useHistory();
  
  const handleOpenModal = useCallback(event => setModalEnchor(event.currentTarget), [setModalEnchor]);

  const handleCloseModal = useCallback(() => setModalEnchor(null), [setModalEnchor]);

  const handleLogout = () => {
    history.push('/');
    dispatch( logout() );
  }

  let profileModal = null;
  if (!user.status.isSuccess) {
    profileModal = (
      <Skeleton variant="circle">
        <Avatar />
      </Skeleton>
    )
  } else {
    profileModal = (<>
      <IconButton
        color="inherit"
        onClick={handleOpenModal}
        className={classes.avatarButton}
      >
        <Avatar src={user.avatar && `/images/avatars/${user.avatar}`} alt="avatar">
          {user.firstName && user.firstName[0]}
        </Avatar>
      </IconButton>
      <Popover
        onClose={handleCloseModal}
        open={Boolean(modalAnchor)}
        anchorEl={modalAnchor}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <div className={classes.modal}>
          <Button component={NavLink} to="/profile" onClick={handleCloseModal} className={classes.button}>View Profile</Button>
          <Divider />
          <Button onClick={handleLogout} className={classes.button}>Log out</Button>
        </div>
      </Popover>
    </>)
  }

  return profileModal;
}

export default memo(ProfileModal);