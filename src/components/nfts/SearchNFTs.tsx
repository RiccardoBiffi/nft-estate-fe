import { SetStateAction, useState } from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from "@mui/material";
import NFTGallery from "./NFTGallery";

export default function SearchNFTs() {
  const [searchAddress, setSearchAddress] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");
  const [radioValue, setRadioValue] = useState<string>("collection");
  const addressRex = new RegExp("^0x[a-fA-F0-9]{40}$");
  const isError = selectedAddress ? !addressRex.test(selectedAddress) : false;

  const handleChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setRadioValue(event.target.value);
  };

  return (
    <Stack direction={"column"} alignItems={"center"} spacing={2}>
      <FormControl>
        <FormLabel id="demo-controlled-radio-buttons-group">
          Search NFTs by
        </FormLabel>
        <RadioGroup
          row
          defaultValue="collection"
          value={radioValue}
          onChange={handleChange}
        >
          <FormControlLabel
            value="collection"
            control={<Radio />}
            label="Collection address"
          />
          <FormControlLabel
            value="owner"
            control={<Radio />}
            label="Owner address"
          />
        </RadioGroup>
      </FormControl>
      <TextField
        id="outlined-search"
        label={"🖼️ Search NFTs by " + radioValue}
        type="search"
        placeholder={
          radioValue === "collection" ? "Collection address" : "Owner address"
        }
        helperText={
          isError
            ? "Unknown search term, are you sure you have copied the the whole address?"
            : radioValue === "collection"
            ? "Enter the address of the NFT collection you want to explore"
            : "Enter the address for which you want to see the owned NFTs"
        }
        fullWidth
        value={searchAddress}
        error={isError}
        onChange={(event) => {
          setSearchAddress(event.target.value);
        }}
        onKeyDown={(event) => {
          if (event.key !== "Enter") return;
          setSelectedAddress(searchAddress);
        }}
        sx={{ maxWidth: 636 }}
      />
      {!isError && selectedAddress && (
        <NFTGallery
          address={selectedAddress}
          type={radioValue}
          key={selectedAddress + radioValue}
        />
      )}
    </Stack>
  );
}
