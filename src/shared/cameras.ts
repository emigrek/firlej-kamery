export interface Position {
    lat: number;
    lng: number;
}

export interface Camera {
    id: number;
    name: string;
    url: string;
    position: Position;
}

export const validCameraIds = [4, 10, 11, 12];

const cameras: Camera[] = [
    {
        id: 10,
        name: "Gęsia",
        url: `http://jezioro.firlej.pl/images/Kamery/Kamera10.jpg`,
        position: {
            lat: 51.553710004271245,
            lng: 22.508268430196598
        }
    },
    {
        id: 4,
        name: "GOSiR",
        url: `http://jezioro.firlej.pl/images/Kamery/Kamera4.jpg`,
        position: {
            lat: 51.55634027829508,
            lng: 22.524142214172443
        }
    },
    {
        id: 11,
        name: `eFeS`,
        url: `http://jezioro.firlej.pl/images/Kamery/Kamera11.jpg`,
        position: {
            lat: 51.549347915472296,
            lng: 22.513844985167022
        }
    },
    {
        id: 12,
        name: `Marta`,
        url: `http://jezioro.firlej.pl/images/Kamery/Kamera12.jpg`,
        position: {
            lat: 51.54890758620527,
            lng: 22.518421540137446
        }
    }
]

export default cameras;