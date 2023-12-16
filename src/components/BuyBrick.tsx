import { Box, Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import React, { useState } from "react";

function BuyBrick() {
  const [showBuyModal, setShowBuyModal] = useState(false);

  function handleClose(): void {
    setShowBuyModal(false);
  }

  return (
    <>
      <Box>
        <span>1 $BRICK = 1€ &nbsp;</span>
        <Button onClick={() => setShowBuyModal(true)} variant="outlined">
          BUY $BRICK
        </Button>
      </Box>
      {showBuyModal && (
        <Dialog
          fullWidth={true}
          maxWidth="md"
          open={true}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">Title</DialogTitle>
          <DialogContent>Content</DialogContent>
        </Dialog>
      )}
    </>
  );
}

export default BuyBrick;
