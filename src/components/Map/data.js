var geojson = {
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
export default geojson;
