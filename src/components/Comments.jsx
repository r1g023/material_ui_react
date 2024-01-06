import React from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Paper,
} from "@mui/material";
import { styled } from "@mui/system";

import DeleteIcon from "@mui/icons-material/Delete";

import { UserContext } from "../App";
import SvgIcon from "@mui/material/SvgIcon";
import Modal from "./Modal";

import { GET_USERS } from "../pages/MainPage";

//container for like and edit/delete buttons
const StyledBox = styled(Box)({
  display: "flex",
  justifyContent: "space-around",
});

// container for edit and delete buttons
const StyledDeleteEditBox = styled(Box)({
  display: "flex",
  justifyContent: "flex-end",
});

const Comments = ({
  id,
  comment,
  liked,
  count,
  user,

  handleCommentDelete,
  handleCommentLike,
  handleCommentEdit,
  commentData,
  setEditComment,
  editComment,
  setCommentUpdateToggle,
  commentUpdateToggle,
  date,
  mode,
  userList,
}) => {
  const currentUser = React.useContext(UserContext);

  const isCurrentUser = currentUser.user.username === user;

  const { data } = useQuery(GET_USERS);

  React.useEffect(() => {}, [commentData, data, user]);

  let selectedCommentId = commentData.getComments.find(
    (comment) => comment.id === id
  );

  return (
    <div
      className="commentContainer"
      style={{ maxWidth: "390px", width: "100%" }}>
      {/* form for adding new comment */}

      <div style={{ padding: 14 }}>
        <Paper
          style={{
            padding: "10px 20px",
            background: mode ? "#30475E" : "",
            color: mode ? "white" : "",
            boxShadow: mode ? "0px 0px 7px 0px gray" : "0px 0px 12px 0px gray",
          }}>
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item>
              <Avatar
                alt="Remy Sharp"
                src={
                  data &&
                  data.getUsers.find((item) => {
                    return item.username === user;
                  }).avatar
                }
              />
            </Grid>
            <Grid justifyContent="left" item xs zeroMinWidth>
              <h4
                style={{
                  margin: 0,
                  textAlign: "left",
                  color: isCurrentUser ? "green" : "",
                }}>
                {user}
              </h4>

              {isCurrentUser && commentUpdateToggle && selectedCommentId ? (
                <Modal
                  onCancel={() => setCommentUpdateToggle(false)}
                  style={{
                    border: "5px solid purple",
                    wordBreak: "break-word",
                  }}>
                  {id === selectedCommentId.id && (
                    <textarea
                      style={{
                        resize: "vertical",
                        overflow: "auto",
                      }}
                      name="editComment"
                      placeholder="Edit comment..."
                      value={editComment}
                      onChange={setEditComment}
                    />
                  )}

                  <Button
                    variant="contained"
                    color="success"
                    sx={{ padding: "5px", marginTop: "5px" }}
                    onClick={() => handleCommentEdit(id)}>
                    Update
                  </Button>
                </Modal>
              ) : (
                <p
                  style={{
                    textAlign: "left",
                    color: mode ? "white" : "",
                    marginTop: "20px",
                    padding: "10px",
                    overflow: "hidden",
                    wordWrap: "break-word",
                  }}>
                  {comment}
                </p>
              )}
              <p
                style={{
                  textAlign: "left",
                  color: mode ? "white" : "gray",
                  marginTop: "20px",
                  borderTop: "1px dashed gray",
                }}>
                posted on {date}
              </p>
            </Grid>
          </Grid>
          <Divider variant="fullWidth" style={{ margin: "10px 0" }} />
          {/* container for the like and edit/delete buttons */}
          <StyledBox>
            <Box sx={{ width: "30%" }}>
              {/* if current user has not liked the comment, then show like button,
              else show unlike button
              */}
              {!liked && (
                <span
                  className="material-icons"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleCommentLike(id)}>
                  {" thumb_up_alt"}
                </span>
              )}

              {liked && (
                <span
                  className="material-icons"
                  style={{ color: "green", cursor: "pointer" }}
                  onClick={() => handleCommentLike(id)}>
                  {" thumb_up_alt"}
                </span>
              )}

              <h4>Likes: {count}</h4>
            </Box>

            {/* container for edit and delete buttons */}
            <StyledDeleteEditBox sx={{ width: "70%" }}>
              {/* Edit comment button, only show if the current logged in user made the comment*/}
              {isCurrentUser && (
                <>
                  <i
                    className="fa fa-edit"
                    style={{
                      color: mode ? "white" : "gray",
                      fontSize: "30px",
                      marginTop: "10px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setCommentUpdateToggle(!commentUpdateToggle);
                    }}></i>

                  {/* Delete comment button */}
                  <IconButton
                    aria-label="delete"
                    size="large"
                    color="secondary"
                    onClick={() => handleCommentDelete(id)}>
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
                </>
              )}
            </StyledDeleteEditBox>
          </StyledBox>
        </Paper>
      </div>
    </div>
  );
};

export default Comments;
