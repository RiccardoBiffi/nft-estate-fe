import { TransactionResponse, Utils } from "alchemy-sdk";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

export default function TransactionInfo({
  transaction,
  onModalCLose,
}: {
  transaction: TransactionResponse | undefined;
  onModalCLose: () => void;
}) {
  const gasPrice = transaction?.gasPrice
    ? transaction.gasPrice.toBigInt()
    : BigInt(0);
  const gasFee = transaction?.gasLimit
    ? transaction.gasLimit.toBigInt() * gasPrice
    : BigInt(0);

  const dialogContent = [
    `Transaction hash: ${transaction?.hash}`,
    `From: ${transaction?.from}`,
    `To: ${transaction?.to}`,
    `Value sent: ${Utils.formatEther(
      transaction ? transaction.value.toString() : 0
    )} ETH`,
    `Confirmations: ${transaction?.confirmations}`,
    `Fee: ${Utils.formatEther(gasFee)} ETH`,
    `Gas limit: ${transaction?.gasLimit} units`,
    `Gas fee: ${gasPrice.toString()} wei`,
    `Max fee per gas: ${transaction?.maxFeePerGas} wei`,
    `Max fee per priority: ${transaction?.maxPriorityFeePerGas} wei`,
    `Nonce: ${transaction?.nonce}`,
    `Chain ID: ${transaction?.chainId === 1 ? "Ethereum Mainnet" : "Unknown"}`,
  ];

  const handleClose = () => {
    onModalCLose();
  };

  return (
    <Dialog
      fullWidth={true}
      maxWidth="md"
      open={true}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        {"Info for transaction " +
          transaction?.hash.slice(0, 6) +
          "..." +
          transaction?.hash.slice(-4)}
      </DialogTitle>
      <DialogContent>
        {dialogContent.map((line, i) => (
          <DialogContentText key={i}>{line}</DialogContentText>
        ))}
      </DialogContent>
    </Dialog>
  );
}
