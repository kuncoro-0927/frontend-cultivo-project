import { useState } from "react";
import { showSnackbar } from "../../../../component/CustomSnackbar";
export const useShareMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const shareUrl = window.location.href;

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      showSnackbar("Link berhasil disalin!", "success");
    } catch (error) {
      console.error("Gagal menyalin link:", error);
    }
    handleClose();
  };

  return {
    anchorEl,
    open,
    shareUrl,
    handleClick,
    handleClose,
    handleCopyLink,
  };
};
