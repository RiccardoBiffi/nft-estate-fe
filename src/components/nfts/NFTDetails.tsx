import { Dialog, DialogContent, DialogTitle, Stack } from "@mui/material";
import { Nft } from "alchemy-sdk";

interface NFTDetailsProps {
  nft: Nft;
  onModalCLose: () => void;
}

export default function NFTDetails({ nft, onModalCLose }: NFTDetailsProps) {
  const handleClose = () => {
    onModalCLose();
  };
  const dialogContent = [
    nft.contract.name + " " + nft.contract.symbol,
    nft.description
      ? nft.description
      : nft.contract.openSea?.description
      ? nft.contract.openSea.description
      : null,
    `Contract address: ${nft.contract.address}`,
    `Token ID: ${nft.tokenId}`,
    nft.contract.totalSupply
      ? `Total supply: ${nft.contract.totalSupply}`
      : null,
    `Token type: ${nft.tokenType}`,
    nft.contract.openSea?.floorPrice
      ? `OpenSea floor price: ${nft.contract.openSea.floorPrice} ETH`
      : null,
    nft.timeLastUpdated ? `Last update: ${nft.timeLastUpdated}` : null,
    nft.media[0].format ? `Format: ${nft.media[0].format}` : null,
    nft.media[0].bytes ? `Dim: ${nft.media[0].bytes} bytes` : null,
  ];

  return (
    <Dialog
      fullWidth={false}
      maxWidth="md"
      open={true}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        <b>{nft.title}</b>
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2} direction="row">
          <div style={{ display: "inline-block", width: "60%" }}>
            <img
              src={nft.media[0]?.gateway}
              alt={nft.contract.name}
              width={"100%"}
            />
          </div>
          <div
            style={{
              display: "inline-block",
              width: "40%",
              maxHeight: "497px",
              overflowX: "hidden",
              overflowY: "scroll",
            }}
          >
            {dialogContent
              .filter((dc) => dc !== null)
              .map((line, i) => (
                <p key={i}>{line}</p>
              ))}
          </div>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
