import { useState } from "react";
import { useTransaction } from "../../services";
import TransactionInfo from "../home/TransactionInfo";

export default function Transaction({
  hash,
  onClose,
}: {
  hash: string;
  onClose: () => void;
}) {
  const transaction = useTransaction(hash);
  const [isVisible, setIsVisible] = useState(true);

  return (
    <>
      {transaction && isVisible && (
        <TransactionInfo
          key={transaction.hash}
          transaction={transaction}
          onModalCLose={() => {
            setIsVisible(false);
            onClose();
          }}
        />
      )}
    </>
  );
}
