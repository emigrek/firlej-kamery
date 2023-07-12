interface Position {
    lat: number;
    lng: number;
}

interface Camera {
    id: number;
    name: string;
    position: Position
}

const cameras: Camera[] = [
    {
        id: 4,
        name: "GOSiR",
        position: {
            lat: 51.55634027829508,
            lng: 22.524142214172443
        }
    },
    {
        id: 10,
        name: "Gęsia",
        position: {
            lat: 51.553710004271245,
            lng: 22.508268430196598
        }
    },
    {
        id: 11,
        name: `eFeS`,
        position: {
            lat: 51.549347915472296,
            lng: 22.513844985167022
        }
    },
    {
        id: 12,
        name: `Marta`,
        position: {
            lat: 51.54890758620527,
            lng: 22.518421540137446
        }
    }
]

export default cameras;