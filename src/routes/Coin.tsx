import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Container, Header, Title, Loader } from "../components/common";

interface IInfoData {}

interface IPriceData {}

function Coin() {
    const { coinId } = useParams();
    const [loading, setLoading] = useState(true);
    const { state } = useLocation();
    const [info, setInfo] = useState({});
    const [priceInfo, setPriceInfo] = useState({});

    useEffect(() => {
        (async () => {
            const infoData = await (
                await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
            ).json();
            const priceData = await (
                await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
            ).json();

            setInfo(infoData);
            setPriceInfo(priceData);
        })();
    }, []);

    return (
        <Container>
            <Header>
                <Title>{state?.name || "Loading..."}</Title>
            </Header>
            {loading ? <Loader>Loading...</Loader> : null}
        </Container>
    );
}

export default Coin;
