import { useGetCoinsByIdMarketChartQuery, useGetSimplePriceQuery } from "../store/coinGeckoApi"
import { BitcoinPriceChart, DataPoint } from "./bitcoin-price-chart"

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

    // Get current price of the coin every 60 seconds
    const { currentData: livePricingData, isFetching: isFetchingSimplePrice, isError: isErrorSimplePrice, error: errorSimplePrice } = useGetSimplePriceQuery({
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
            <h1>Live Chart</h1>
            {isError || isErrorSimplePrice && <div>Error: {JSON.stringify(error)}</div>}
            {isFetching || isFetchingSimplePrice && <div>Loading...</div>}
            {/* {currentData && <div>{JSON.stringify(currentData)}</div>} */}
            {dataPoints && <BitcoinPriceChart data={dataPoints} />}
        </div>
    )
}
