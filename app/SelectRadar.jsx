//import { ResponsiveRadar } from '@nivo/radar'
import dynamic from "next/dynamic";

const ResponsiveRadar = dynamic(() => import("@nivo/radar").then(m => m.ResponsiveRadar), { ssr: false });
const SelectRadar = ({ data, name, marginx }) => (
    <ResponsiveRadar
        data={data}
        keys={[ name ]}
        indexBy="stats"
        maxValue={255}
        margin={{ top: 60, right: 60, bottom: 30, left: 60 }}
        borderWidth={5}
        borderColor={{ from: 'color', modifiers: [] }}
        gridLevels={3}
        enableDots={false}
        dotColor={{ theme: 'background' }}
        dotBorderWidth={2}
        colors={{ scheme: 'yellow_orange_red' }}
        fillOpacity={0.7}
        blendMode="multiply"
        motionConfig="wobbly"
    />

)

export default SelectRadar