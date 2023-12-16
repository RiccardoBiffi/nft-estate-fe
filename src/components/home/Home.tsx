import BlockList from "./BlockList";
import { useLatestBlock } from "../../services";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRefresh } from "@fortawesome/free-solid-svg-icons";
import styled from "@emotion/styled";

export default function Home() {
  const [latestBlock, handleRefresh] = useLatestBlock(false);
  const blockNumber = 10;

  //bug the blocks are fixed to 0 when changing tab and going back

  const Icon = styled(FontAwesomeIcon)`
  cursor: pointer;
    transform: rotate(-90deg);
    transition: transform 0.5s;
    
    &:hover {
      transform: rotate(90deg);
      `;

  return (
    <>
      <h1>
        Ethereum last {blockNumber} blocks&nbsp;
        <Icon
          title="Click to refresh"
          onClick={handleRefresh}
          icon={faRefresh}
        />
      </h1>
      <p>Click on a block to see its transactions</p>
      <BlockList latestBlock={latestBlock} blocksNumber={blockNumber} />
    </>
  );
}
