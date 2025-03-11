import { useState } from "react";
import { useNavigate } from "react-router";
import { Popover, Typography, Button, Box } from "@mui/material";
import { Error } from "@mui/icons-material";
import { useDeleteArticleMutation } from "shared/api/blogApi";
import { toast } from "react-toastify";
import { toastSuccess, toastError } from "shared/ui/toasts/toastNotifications";

const DeleteButton = ({ slug }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const navigate = useNavigate();

  const [deleteArticle, { error }] = useDeleteArticleMutation();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteArticle(slug).unwrap();
      handleClose();
      toast.success("Article has been deleted", toastSuccess);
      navigate("/");
    } catch {
      toast.error(`Couldn't delete the article: ${Object.entries(error.data.errors).join(" ")}`, toastError);
    }
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <Button variant="outlined" color="error" onClick={handleClick}>
        Delete
      </Button>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
          <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Error sx={{ color: "orange" }} />
            Are you sure to delete this article?
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "end", alignItems: "center", gap: 1 }}>
            <Button variant="outlined" size="small" color="info" onClick={handleClose}>
              No
            </Button>
            <Button variant="contained" size="small" color="primary" onClick={handleConfirmDelete}>
              Yes
            </Button>
          </Box>
        </div>
      </Popover>
    </>
  );
};

export default DeleteButton;
