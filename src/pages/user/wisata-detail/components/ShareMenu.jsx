import { Menu, MenuItem } from "@mui/material";
import { FaWhatsapp, FaFacebook, FaTwitter } from "react-icons/fa";
import { FiCopy } from "react-icons/fi";

const ShareMenu = ({ anchorEl, open, shareUrl, onClose, onCopyLink }) => {
  return (
    <Menu anchorEl={anchorEl} open={open} onClose={onClose}>
      <MenuItem
        onClick={() =>
          window.open(
            `https://wa.me/?text=${encodeURIComponent(shareUrl)}`,
            "_blank"
          )
        }
      >
        <FaWhatsapp className="mr-2 text-green-500" />{" "}
        <span className="text-sm">WhatsApp</span>
      </MenuItem>
      <MenuItem
        onClick={() =>
          window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              shareUrl
            )}`,
            "_blank"
          )
        }
      >
        <FaFacebook className="mr-2 text-blue-600" />{" "}
        <span className="text-sm">Facebook</span>
      </MenuItem>
      <MenuItem
        onClick={() =>
          window.open(
            `https://twitter.com/intent/tweet?url=${encodeURIComponent(
              shareUrl
            )}`,
            "_blank"
          )
        }
      >
        <FaTwitter className="mr-2 text-blue-400" />{" "}
        <span className="text-sm">Twitter</span>
      </MenuItem>
      <MenuItem onClick={onCopyLink}>
        <FiCopy className="mr-2 text-gray-600" />{" "}
        <span className="text-sm">Salin Link</span>
      </MenuItem>
    </Menu>
  );
};

export default ShareMenu;
