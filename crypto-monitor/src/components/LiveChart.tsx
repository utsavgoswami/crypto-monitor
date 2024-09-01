import { useGetCoinsByIdMarketChartQuery, useGetCoinsByIdQuery, useGetSimplePriceQuery } from "../store/coinGeckoApi"
import { CoinChartRenderer, DataPoint } from "./CoinChartRenderer"

interface LiveChartProps {
    id: string
    vsCurrency: string
    days: string
}

export const LiveChart = ({ id, vsCurrency, days }: LiveChartProps) => {
    const { currentData: historicalPricingData, isFetching, isError, error } = useGetCoinsByIdMarketChartQuery({
        id,
        vsCurrency,
        days,
        precision: "2"
    });

    const { currentData: coinData, isFetching: isFetchingCoinData, isError: isErrorCoinData } = useGetCoinsByIdQuery({
        id
    });

    // Get current price of the coin every 60 seconds
    const { currentData: livePricingData, isFetching: isFetchingSimplePrice, isError: isErrorSimplePrice } = useGetSimplePriceQuery({
        ids: id,
        vsCurrencies: vsCurrency,
        includeLastUpdatedAt: "true",
        precision: "2"
    }, {
        pollingInterval: 60000 
    });

    const historicalDataPoints: DataPoint[] = historicalPricingData?.prices.map((price) => ({
        price: price[1],
        time: price[0]
    })) || [];

    const liveDataPoints: DataPoint[] = livePricingData?.map((priceInfo) => { 
        return {
            price: priceInfo.usd,
            time: priceInfo.last_updated_at
        }
    }) || [];

    const dataPoints = [...historicalDataPoints, ...liveDataPoints];

    return (
        <div>
            {isError || isErrorSimplePrice || isErrorCoinData && <div>Error: {JSON.stringify(error)}</div>}
            {isFetching || isFetchingSimplePrice || isFetchingCoinData && <div>Loading...</div>}
            {dataPoints && coinData && <CoinChartRenderer data={dataPoints} name={coinData.name} />}
        </div>
    )
}
