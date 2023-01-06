

export const LineaModelJson = () => ({
    id: null,
    name: null,
    phone: null,
    direction: { lat: -17.783957, lng: -63.181132 },
    color: { top: 'ffffff', bottom: '3c3c3c' },
});

export const RutaModelJson = () => ({
    id: null,
    name: "",
    description: "",
    state: false,
    lineaId: 2,
    ida: {
        "origin": { "location": { "lat": -17.792102, "lng": -63.178993 } },
        "destination": {
            "location": { "lat": -17.774608, "lng": -63.182515 },
            "time": 5
        },
        "waypoints": [],
        "polyline": "p_rkBtsr`KgAoMkAeMSgC?QDQLMJAJEPKHQBUCWQYYOUAe@k@cBmBeAaAg@Yw@[i@Mq@KwAIyAFuJr@aDVUACAEAQ?OHCFmBR_Hh@o@BIEIEM?MDGBMJSH_@FwBPmBHqF`@gCPuC`@_BVCCIEQASJED?Bq@LqBb@_Br@kAx@}@x@y@bA[`@G?IDIHEHCN@LIb@Ur@c@zAk@vBe@tCQ~AI~AIxBH~FFbEcE}@d@~HB`@DAx@GdBI"
    },
    vuelta: {
        "origin": { "location": { "lat": -17.792102, "lng": -63.178993 } },
        "destination": {
            "location": { "lat": -17.774608, "lng": -63.182515 },
            "time": 5
        },
        "waypoints": [],
        "polyline": "p_rkBtsr`KgAoMkAeMSgC?QDQLMJAJEPKHQBUCWQYYOUAe@k@cBmBeAaAg@Yw@[i@Mq@KwAIyAFuJr@aDVUACAEAQ?OHCFmBR_Hh@o@BIEIEM?MDGBMJSH_@FwBPmBHqF`@gCPuC`@_BVCCIEQASJED?Bq@LqBb@_Br@kAx@}@x@y@bA[`@G?IDIHEHCN@LIb@Ur@c@zAk@vBe@tCQ~AI~AIxBH~FFbEcE}@d@~HB`@DAx@GdBI"
    }
});

export const UserModelJson = () => ({
    id: "",
    name: "",
    lastname: "",
    phone: "",
    email: "",
    password: "",
    admin: "",
});

export const InternoModelJson = () => ({
    id: "",
    name: "",
    userId: "",
    lineaId: ""
});


export const ViajeModelJson = () => ({
    id: null,
    internoId: null,
    userId: null,
    datetimeIda: new Date(),
    timeParada: null,
    ruta: {
        id: 0,
        name: "",
        description: "",
        lineaId: 0,
        ida: {
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
            }],
            polyline: "xuokBnkr`Kd@dGTbHD`AnEWrKi@nEUT`FJtE",
            route: [{ lat: -17.78029, lng: -63.17768 }]
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
            }],
            polyline: "xuokBnkr`Kd@dGTbHD`AnEWrKi@nEUT`FJtE",
            route: [{ lat: -17.78029, lng: -63.17768 }]
        }


    },

    /*ida: {
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
    }*/

});

export const ReseñaModelJson = () => ({
    id: null,
    title: null,
    description: null,
    date: new Date(),
    type: null,
    ruta: {
        id: 0,
        name: "",
        description: "",
        lineaId: 0,
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

    }
});