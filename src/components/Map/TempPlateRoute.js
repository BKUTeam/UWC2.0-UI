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
export default routeData;
