import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchCoinTickers } from "../api";
import { styled } from "styled-components";

const Panel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  div {
    color: ${(props) => props.theme.textColor};
    margin: 5px 0;
  }
`;

function Price() {
  const { coinId } = useParams();
  const { isLoading, data } = useQuery(["price", coinId], () =>
    fetchCoinTickers(coinId!)
  );
  return (
    <>
      <div>
        {isLoading ? (
          "Loading Price..."
        ) : (
          <Panel>
            <div>Price: {data!.quotes.USD.price.toString()}</div>
            <div>Last Update: {data!.last_updated.toString()}</div>
          </Panel>
        )}
      </div>
    </>
  );
}

export default Price;
