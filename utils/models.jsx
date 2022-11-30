

export const LineaModelJson = () => ({
    id: null,
    name: null,
    description: null,
    direction: { lat: -17.783957, lng: -63.181132 },
    color: { top: 'ffffff', bottom: '3c3c3c' },
    phone: null,
    ida: {
        route:[],
        origin: {
            location: { lat: -17.792102, lng: -63.178993 },
            time: 0
        },
        destination: {
            location: { lat: -17.774608, lng: -63.182515 },
            time: 0
        },
        waypoints: [{
            waypoint: {
                location: { lat: -17.783598, lng: -63.180524 },
                stopover: false
            },
            time: 5
        }]
    },
    vuelta: {
        route:[],
        origin: {
            location: { lat: -17.774608, lng: -63.182515 },
            time: 0
        },
        destination: {
            location: { lat: -17.792102, lng: -63.178993 },
            time: 0
        },
        waypoints: [{
            waypoint: {
                location: { lat: -17.783598, lng: -63.180524 },
                stopover: false
            },
            time: 5
        }]
    },
    internos: []

});

export const UserModelJson = () => ({
    id: "",
    name: "",
    lastname: "",
    phone: "",
    email: "",
    password: "",
    admin: "",
    lineaId: ""
});

export const InternoModelJson = () => ({
    id: "",
    name: "",
    userId: "",
    lineaId: ""
});


export const VueltaModelJson = () => ({
    id: null,
    internoId: null,
    userId: null,
    datetimeIda: new Date(),
    timeParada: null,

    ida: {
        origin: {
            location: { lat: -17.792102, lng: -63.178993 },
            time: 0
        },
        destination: {
            location: { lat: -17.774608, lng: -63.182515 },
            time: 0
        },
        waypoints: [{
            waypoint: {
                location: { lat: -17.783598, lng: -63.180524 },
                stopover: false
            },
            time: 5
        }]
    },
    vuelta: {
        origin: {
            location: { lat: -17.774608, lng: -63.182515 },
            time: 0
        },
        destination: {
            location: { lat: -17.792102, lng: -63.178993 },
            time: 0
        },
        waypoints: [{
            waypoint: {
                location: { lat: -17.783598, lng: -63.180524 },
                stopover: false
            },
            time: 5
        }]
    }

});