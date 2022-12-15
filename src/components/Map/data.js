var markerData = {
    type: 'FeatureCollection',
    features: [
        {
            type: 'Feature',
            properties: {
                title: 'Lincoln Park',
                description: 'A northside park that is home to the Lincoln Park Zoo',
            },
            geometry: {
                coordinates: [106.65967153503293, 10.773106611692124],
                type: 'Point',
            },
        },
        {
            type: 'Feature',
            properties: {
                type: 'depot',
                title: 'Burnham Park',
                description: "A lakefront park on Chicago's south side",
            },
            geometry: {
                coordinates: [106.65797153503293, 10.774106611692124],
                type: 'Point',
            },
        },
        {
            type: 'Feature',
            properties: {
                title: 'Millennium Park',
                description: 'A downtown park known for its art installations and unique architecture',
            },
            geometry: {
                coordinates: [106.65797153503293, 10.775106611692124],
                type: 'Point',
            },
        },
        {
            type: 'Feature',
            properties: {
                type: 'depot',
                title: 'Grant Park',
                description: "A downtown park that is the site of many of Chicago's favorite festivals and events",
            },
            geometry: {
                coordinates: [106.65797153503293, 10.776106611692124],
                type: 'Point',
            },
        },
    ],
    type: 'FeatureCollection',
};
const routeData = {
    layer: {
        id: 'route',
        type: 'line',
        paint: {
            'line-color': '#3887be',
            'line-width': 5,
            'line-opacity': 0.75,
        },
    },
    source: {
        type: 'geojson',
        data: {
            type: 'Feature',
            properties: {},
            geometry: {
                type: 'LineString',
                coordinates: [
                    [106.657969, 10.772135],
                    [106.657737, 10.772016],
                    [106.656152, 10.777712],
                    [106.660127, 10.782025],
                    [106.66017, 10.782177],
                    [106.6609, 10.782873],
                    [106.660416, 10.783108],
                    [106.659913, 10.782601],
                    [106.659745, 10.782539],
                    [106.659161, 10.782442],
                    [106.658798, 10.782727],
                    [106.658629, 10.782545],
                    [106.658832, 10.782308],
                ],
            },
        },
    },
};
const mapStyles = 'mapbox://styles/tanlethanh/clb4m2eog000b14p0arlva7q9';
let center = { lng: 106.65797153503293, lat: 10.772106611692124 };
const defaultViewport = {
    viewport: {
        width: '100%',
        height: '100%',
        latitude: center.lat,
        longitude: center.lng,
        zoom: 15,
    },
};
export { routeData, center, markerData, mapStyles, defaultViewport };
