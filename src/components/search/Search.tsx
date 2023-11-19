import { Box, Stack, TextField } from "@mui/material";
import { useState } from "react";
import BlockInfo from "../latest/BlockInfo";
import Transactions from "../latest/Transactions";
import Account from "./Account";
import Transaction from "./Transaction";

export default function Search() {
  const [searchText, setSearchText] = useState("");
  const [search, setSearch] = useState("");
  const [searchItem, setSearchItem] = useState("");
  const blockRex = new RegExp("^[0-9]+$");
  const addressRex = new RegExp("^0x[a-fA-F0-9]{40}$");
  const txRex = new RegExp("^0x[a-fA-F0-9]{64}$");

  let inferredSearchItem = blockRex.test(searchText)
    ? "block"
    : addressRex.test(searchText)
    ? "address"
    : txRex.test(searchText)
    ? "transaction"
    : searchText
    ? "unknown"
    : "";
  let isError = inferredSearchItem === "unknown";

  return (
    <Stack direction={"column"} alignItems={"center"} spacing={2}>
      <TextField
        id="outlined-search"
        label="🔍 Search anything"
        type="search"
        placeholder="Address, transaction hash, block number"
        helperText={
          isError
            ? "Unknown search term, you sure you have copied the the whole address or transaction hash?"
            : searchText
            ? `Looks like ${
                inferredSearchItem === "address" ? "an" : "a"
              } ${inferredSearchItem}, press enter to search it`
            : "I'll help you here"
        }
        fullWidth
        value={searchText}
        error={isError}
        onChange={(event) => {
          setSearchText(event.target.value);
        }}
        onKeyDown={(event) => {
          if (event.key !== "Enter") return;
          setSearch(searchText);
          setSearchItem(inferredSearchItem);
        }}
        sx={{ maxWidth: 636 }}
      />

      {search && searchItem === "block" ? (
        <>
          <BlockInfo
            n={parseInt(search)}
            onSelectBlock={() => null}
            isSelected
          />
          <Box sx={{ width: "100%" }}>
            <Transactions blockNumber={parseInt(search)} />
          </Box>
        </>
      ) : searchItem === "address" ? (
        <Account address={search}></Account>
      ) : searchItem === "transaction" ? (
        <Transaction
          hash={search}
          onClose={() => {
            setSearchText("");
            setSearchItem("");
          }}
        ></Transaction>
      ) : (
        <p style={{ textAlign: "center" }}>Nothing to show here...yet!</p>
      )}
    </Stack>
  );
}
