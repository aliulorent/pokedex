//import { ResponsiveRadar } from '@nivo/radar'
import dynamic from "next/dynamic";
const ResponsiveRadar = dynamic(() => import("@nivo/radar").then(m => m.ResponsiveRadar), { ssr: false });


const SelectRadar = ({ data, name }) => (
    <ResponsiveRadar
        data={data}
        keys={[ name ]}
        indexBy="stats"
        maxValue={255}
        margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
        borderWidth={5}
        borderColor={{ from: 'color', modifiers: [] }}
        gridLevels={4}
        enableDots={false}
        dotColor={{ theme: 'background' }}
        dotBorderWidth={2}
        colors={{ scheme: 'nivo' }}
        fillOpacity={0.7}
        blendMode="multiply"
        motionConfig="wobbly"
    />
)

export default SelectRadar