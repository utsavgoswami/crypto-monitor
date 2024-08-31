import { useGetCoinsByIdMarketChartQuery } from "../store/coinGeckoApi"

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
    });
    return (
        <div>
            <h1>Live Chart</h1>
            {isError && <div>Error: {JSON.stringify(error)}</div>}
            {isFetching && <div>Loading...</div>}
            {currentData && <div>{JSON.stringify(currentData)}</div>}
        </div>
    )
}
