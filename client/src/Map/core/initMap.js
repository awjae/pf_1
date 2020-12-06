import { ContactPhoneSharp } from "@material-ui/icons";
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';

const initMap = {};
initMap.accessToken = process.env.MAPBOXGL_ACCESS_TOKEN;
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

    //initMap.setDirectControls("traffic");
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
initMap.setCenter = (x, y) => {
    if (!initMap.map) return;
    initMap.map.setCenter(
        [ parseFloat(x), parseFloat(y)]
    );
}
initMap.directArr = {
    traffic : new MapboxDirections({
        accessToken: initMap.accessToken,
        unit: "metric",
        profile: 'mapbox/driving-traffic'
    }),
    driving : new MapboxDirections({
        accessToken: initMap.accessToken,
        unit: "metric",
        profile: 'mapbox/driving'
    }),
    walking : new MapboxDirections({
        accessToken: initMap.accessToken,
        unit: "metric",
        profile: 'mapbox/walking'
    }),
    cycling : new MapboxDirections({
        accessToken: initMap.accessToken,
        unit: "metric",
        profile: 'mapbox/cycling'
    })
};
initMap.setDirectControls = (method) => {
    //if (initMap.currDirect) initMap.map.removeControl(initMap.currDirect);

    //initMap.map.addControl(initMap.directArr[method]);
    //initMap.currDirect = initMap.directArr[method];

    //해당 오픈소스가 setProfile을 지원하지않는다 오롯이 제공하는 radio로만 조작 가능하게 해둠..
    //issue 가 이미 있지만 수용할 생각이 없다.
    //https://github.com/mapbox/mapbox-gl-directions/blob/master/src/controls/inputs.js
    const change = new Event('change');
    method==="traffic" ? document.querySelector(`#mapbox-directions-profile-driving-${method}`).dispatchEvent(change) : document.querySelector(`#mapbox-directions-profile-${method}`).dispatchEvent(change)

};

export default initMap;