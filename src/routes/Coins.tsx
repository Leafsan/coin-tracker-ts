import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { Container, Header, Title, Loader } from "../components/common";

const CoinsList = styled.ul``;

const Coin = styled.li`
    background-color: white;
    color: ${(props) => props.theme.textColor};
    border-radius: 15px;
    margin-bottom: 10px;
    a {
        display: flex;
        align-items: center;
        padding: 20px;
        transition: color 0.1s ease-in;
    }
    &:hover {
        a {
            color: ${(props) => props.theme.accentColor};
        }
    }
`;

const Image = styled.img`
    width: 35;
    height: 35px;
    margin-right: 10px;
`;

interface CoinInterface {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
}

function Coins() {
    const [coins, setCoins] = useState<CoinInterface[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const response = await fetch(
                "https://api.coinpaprika.com/v1/coins"
            );
            const json = await response.json();
            setCoins(json.slice(0, 100));
            setLoading(false);
        })();
    }, []);

    return (
        <>
            <Container>
                <Header>
                    <Title>코인</Title>
                </Header>
                {loading ? (
                    <Loader>Loading...</Loader>
                ) : (
                    <CoinsList>
                        {coins.map((coin) => (
                            <Coin key={coin.id}>
                                <Link
                                    to={`/${coin.id}`}
                                    state={{ name: coin.name }}
                                >
                                    <Image
                                        src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                                    ></Image>
                                    {coin.name} &rarr;{" "}
                                </Link>
                            </Coin>
                        ))}
                    </CoinsList>
                )}
            </Container>
        </>
    );
}

export default Coins;
