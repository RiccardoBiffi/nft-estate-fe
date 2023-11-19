import { useState } from "react";
import styled from "@emotion/styled";
import { Snackbar } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";

export function Hash({ hash }: { hash: string | undefined }) {
  const [copy, setCopy] = useState(false);
  const hashProp = hash ? hash : "";
  const reducedHash = hashProp?.slice(0, 6) + "..." + hashProp?.slice(-4);

  const Hash = styled.span`
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  `;

  const handleClick = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    event.stopPropagation();
    if (hash) {
      navigator.clipboard.writeText(hash);
      setCopy(true);
    }
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setCopy(false);
  };

  return (
    <>
      <Hash title={hash} onClick={(event) => handleClick(event)}>
        {reducedHash}&nbsp;
        <FontAwesomeIcon icon={faCopy} />
      </Hash>
      <Snackbar
        open={copy}
        message="Hash copied!"
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />
    </>
  );
}
