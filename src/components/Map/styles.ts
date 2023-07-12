const styles = [
    {
        featureType: "poi",
        elementType: "labels",
        stylers: [{ visibility: "off" }]
    },
    {
        featureType: "administrative.locality",
        elementType: "labels.text",
        stylers: [{ visibility: "off" }]
    },
    {
        featureType: "road.arterial",
        elementType: "labels.text",
        stylers: [{ visibility: "off" }]
    },
    {
        featureType: "road.local",
        elementType: "labels.text",
        stylers: [{ visibility: "off" }]
    },
    {
        elementType: "geometry",
        stylers: [{ color: "#171717" }]
    },
    {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [{ color: "#343e0f" }]
    },
    {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: "#404040" }]
    },
    {
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [{ color: "#171717" }]
    },
    {
        featureType: "road.local",
        elementType: "geometry",
        stylers: [{ color: "#262626" }]
    },
    {
        featureType: "road.local",
        elementType: "geometry.stroke",
        stylers: [{ color: "#171717" }]
    },
    {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#18414e" }]
    },
    {
        featureType: "water",
        elementType: "labels.text",
        stylers: [{ visibility: "off" }]
    }
];

export default styles;