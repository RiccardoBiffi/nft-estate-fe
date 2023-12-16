import { useState } from "react";
import BlockInfo from "./BlockInfo";
import Transactions from "./Transactions";
import { Stack, Divider } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function BlockList({
  latestBlock,
  blocksNumber,
}: {
  latestBlock: number | null;
  blocksNumber: number;
}) {
  const [selectedBlock, setSelectedBlock] = useState<number | null>(null);

  function handleSelectBlock(n: number) {
    setSelectedBlock(n);
  }

  const blockListArray = new Array(blocksNumber).fill(0).map((_, i) => {
    const block = latestBlock ? latestBlock - i : 0;
    return (
      <BlockInfo
        key={i}
        n={block}
        onSelectBlock={handleSelectBlock}
        isSelected={selectedBlock === block}
      />
    );
  });

  return (
    <>
      <Stack
        direction="row-reverse"
        divider={
          <Divider sx={{ margin: "0 !important" }}>
            <FontAwesomeIcon icon={faArrowRight} />
          </Divider>
        }
        spacing={2}
        alignItems="center"
        my={4}
        pb={2}
        sx={{ overflowX: "auto" }}
      >
        {blockListArray}
      </Stack>
      {selectedBlock && (
        <Transactions key={selectedBlock} blockNumber={selectedBlock} />
      )}
    </>
  );
}
