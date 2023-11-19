import { Utils } from "alchemy-sdk";
import { useTransactions } from "../../services";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { Skeleton } from "@mui/material";
import { useState } from "react";
import TransactionInfo from "./TransactionInfo";

export default function Transactions({ blockNumber }: { blockNumber: number }) {
  const transactions = useTransactions(blockNumber);
  const [selectedTransaction, setSelectedTransaction] = useState<string | null>(
    null
  );

  function handleRowClick(params: any) {
    setSelectedTransaction(params.row.id);
  }

  const rows: GridRowsProp = transactions?.map((t, i) => {
    const gasPrice = t.gasPrice ? t.gasPrice.toBigInt() : BigInt(0);
    const gasFee = t.gasLimit.toBigInt() * gasPrice;

    return {
      id: t.hash,
      hash: t.hash,
      from: t.from,
      to: t.to,
      value: Utils.formatEther(t.value.toString()).substring(0, 7) + " ETH",
      fee: Utils.formatEther(gasFee).substring(0, 7) + " ETH",
      gas: t.gasLimit,
      gasPrice: t.gasPrice + " wei",
      nonce: t.nonce,
    };
  }) as GridRowsProp;

  const columns: GridColDef[] = [
    { field: "id", headerName: "Tx hash", flex: 1 },
    { field: "from", headerName: "From", width: 150, flex: 2 },
    { field: "to", headerName: "To", width: 150, flex: 2 },
    { field: "value", headerName: "Value sent", width: 250, flex: 1 },
    { field: "fee", headerName: "Fee", width: 250, flex: 1 },
  ];

  return (
    <>
      {!rows ? (
        <Skeleton variant="rounded" height={369} />
      ) : (
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
            columns: { columnVisibilityModel: { id: false } },
          }}
          pageSizeOptions={[5, 10, 25]}
          onRowClick={handleRowClick}
          sx={{
            "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
              outline: "none !important",
            },
          }}
        />
      )}
      {selectedTransaction && transactions && (
        <TransactionInfo
          key={selectedTransaction}
          transaction={transactions.find((t) => t.hash === selectedTransaction)}
          onModalCLose={() => setSelectedTransaction(null)}
        />
      )}
    </>
  );
}
