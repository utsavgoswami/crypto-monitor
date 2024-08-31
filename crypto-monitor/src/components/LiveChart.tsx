import { useGetCoinsByIdMarketChartQuery, useGetSimplePriceQuery } from "../store/coinGeckoApi"

interface LiveChartProps {
    id: string
    vsCurrency: string
    days: string
}

export const LiveChart = ({ id, vsCurrency, days }: LiveChartProps) => {
    const { currentData, isFetching, isError, error } = useGetCoinsByIdMarketChartQuery({
        id,
        vsCurrency,
        days,
        precision: "2"
    });
    // Get current price of the coin every 60 seconds
    const { currentData: simplePriceInfo, isFetching: isFetchingSimplePrice, isError: isErrorSimplePrice, error: errorSimplePrice } = useGetSimplePriceQuery({
        ids: id,
        vsCurrencies: vsCurrency,
        includeLastUpdatedAt: "true",
        precision: "2"
    }, {
        pollingInterval: 60000 
    });

    return (
        <div>
            <h1>Live Chart</h1>
            {isError || isErrorSimplePrice && <div>Error: {JSON.stringify(error)}</div>}
            {isFetching || isFetchingSimplePrice && <div>Loading...</div>}
            {/* {currentData && <div>{JSON.stringify(currentData)}</div>} */}
            {simplePriceInfo && <div>{JSON.stringify(simplePriceInfo)}</div>}
        </div>
    )
}
