import { ContactPhoneSharp } from "@material-ui/icons";


const initMap = {};

initMap.init = (map) => {
    initMap.map = map || "";
    map.on('load', function () {
        // Insert the layer beneath any symbol layer.
        const layers = map.getStyle().layers;

        let labelLayerId;
        for (let i = 0; i < layers.length; i++) {
            if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
                labelLayerId = layers[i].id;
                break;
            }
        }

        map.addLayer({
                'id': '3d-buildings',
                'source': 'composite',
                'source-layer': 'building',
                'filter': ['==', 'extrude', 'true'],
                'type': 'fill-extrusion',
                'minzoom': 10,
                'paint': {
                    'fill-extrusion-color': '#f5f5dc',
                    // use an 'interpolate' expression to add a smooth transition effect to the
                    // buildings as the user zooms in
                    'fill-extrusion-height': [
                        'interpolate',
                        ['linear'],
                        ['zoom'],
                        15, 0,
                        15.05, ['get', 'height']
                    ],
                    'fill-extrusion-opacity': 0.8
                }
            },
            labelLayerId
        );
    });
}
initMap.leftNavEvent = (active) => {
    if (!initMap.map) return;
    const padding = {};
    if (active) {
        padding['left'] = 300;
        initMap.map.easeTo({
            padding: padding,
            duration: 500 // In ms, CSS transition duration property for the sidebar matches this value
        });
    } else {
        padding['left'] = 0;
        // Add the 'collapsed' class to the class list of the element
        initMap.map.easeTo({
            padding: padding,
            duration: 300
        });
    }
}

export default initMap;