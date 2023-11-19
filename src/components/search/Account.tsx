import { Utils } from "alchemy-sdk";
import { useAccountInfo } from "../../services";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { Skeleton } from "@mui/material";

export default function Account({ address }: { address: string }) {
  const accountInfo = useAccountInfo(address);

  const columns: GridColDef[] = [
    { field: "id", headerName: "Token address", flex: 2 },
    {
      field: "logo",
      headerName: "Logo",
      width: 55,
      renderCell: (img) =>
        img.value.src === undefined ? null : (
          <img src={img.value.src} alt={img.value.alt} width={40} height={40} />
        ),
    },
    { field: "name", headerName: "Name", width: 150, flex: 2 },
    { field: "balance", headerName: "Balance", width: 250, flex: 2 },
    { field: "symbol", headerName: "Symbol", width: 250, flex: 1 },
  ];

  const rows: GridRowsProp = accountInfo?.tokens.map((t) => {
    return {
      id: t.contractAddress,
      logo: { src: t.logo, alt: t.name },
      name: t.name,
      balance: t.balance?.substring(0, 7),
      symbol: t.symbol,
    };
  }) as GridRowsProp;

  return (
    <>
      {!accountInfo ? (
        <Skeleton variant="rounded" height={369} sx={{ width: "100%" }} />
      ) : (
        <>
          <h3>
            This is{" "}
            <u>{accountInfo.isContract ? "a smart-contract" : "an EOA"}</u> with
            a balance of{" "}
            {Utils.formatEther(accountInfo.balance.toString()).substring(0, 7)}{" "}
            ETH
          </h3>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: { paginationModel: { pageSize: 10 } },
              columns: { columnVisibilityModel: { id: false } },
            }}
            pageSizeOptions={[10, 25]}
            sx={{
              "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
                outline: "none !important",
              },
              width: "100%",
            }}
          />
        </>
      )}
    </>
  );
}
