const distance = require('google-distance');
distance.apiKey = 'AIzaSyCeloAlhmwFvWKXXVzTDcLP5AsZWVetln0';

const getDistance = (places, college, callback) => {
    let placeArray = [];
    let itemsProcessed = 0;
    places.forEach((place, key, places) => {
        let distances = [];
        distance.get(
            {
                origin: college.address,
                destination: place.address,
                mode: 'walking',
                units: 'metric'
            },
            function(err, data) {
                if (err) { return console.log(err); }
                let walkingDistance = {mode: "walking", duration: data.duration, durationValue: data.durationValue};
                distances.push(walkingDistance);

                distance.get(
                    {
                        origin: college.address,
                        destination: place.address,
                        mode: 'transit',
                        transit_mode: 'bus',
                        units: 'metric'
                    },
                    function(err, data) {
                        if (err) { return console.log(err); }
                        let walkingDistance = {mode: "bus", duration: data.duration, distanceValue: data.durationValue};
                        distances.push(walkingDistance);
    
                        distance.get(
                            {
                                origin: college.address,
                                destination: place.address,
                                mode: 'driving',
                                units: 'metric'
                            },
                            function(err, data) {
                                if (err) { return console.log(err); }
                                let walkingDistance = {mode: "driving", duration: data.duration, distanceValue: data.durationValue};
                                // console.log('driving: ', data);
                                distances.push(walkingDistance);
            
                                let placeObject = place.toObject();
                                placeObject.distances = distances;
                                // console.log("placeObject: ", placeObject);
                                placeArray.push(placeObject);
                                // console.log("placeArray: ", placeArray);
                                // if (Object.is(places.length - 1, key)) {
                                //     console.log("key: ", key);
                                //     callback(placeArray);
                                // }
                                itemsProcessed++;
                                if (itemsProcessed === places.length) {
                                    callback(placeArray);
                                }
                            }
                        );
                    }
                );
            }
        );
    });
};

Promise.all(getDistance).then(() => {
    console.log('aaa');
}).catch((e) => {
    console.error;
});

module.exports = { getDistance };