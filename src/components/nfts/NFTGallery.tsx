import { Grid, Skeleton } from "@mui/material";
import { useNFTs } from "../../services";
import NFTCard from "./NFTCard";

interface NFTGalleryProps {
  address: string;
  type: string;
}

export default function NFTGallery({ address, type }: NFTGalleryProps) {
  const nfts = useNFTs(address, type);

  return (
    <>
      {!nfts ? (
        <Grid
          container
          spacing={5}
          justifyContent={"center"}
          alignItems={"center"}
          alignContent={"center"}
          alignSelf={"center"}
        >
          {new Array(9).fill(0).map((ph, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Skeleton variant="rounded" height={369} sx={{ width: "100%" }} />
            </Grid>
          ))}
        </Grid>
      ) : nfts.length > 0 ? (
        <Grid
          container
          spacing={5}
          justifyContent={"center"}
          alignItems={"center"}
          alignContent={"center"}
          alignSelf={"center"}
        >
          {nfts.map((nft, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <NFTCard nft={nft} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <h3>No NFTs found</h3>
      )}
    </>
  );
}
