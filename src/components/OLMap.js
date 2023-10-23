import { useState, useRef, useEffect } from 'react';
import Map from 'ol/map.js';
import View from 'ol/view.js';
import WKT from 'ol/format/wkt';
import {default as VectorSource} from 'ol/source/vector';
import {default as VectorLayer} from 'ol/layer/vector';
import TileLayer from 'ol/layer/tile.js';
import XYZ from 'ol/source/xyz';
import Style from 'ol/style/style';
import Fill from 'ol/style/fill';
import Stroke from 'ol/style/stroke';
const OLMap = ({setShowMapState, wktValue}) => {
    const mapTargetElement = useRef(null)
    const [map, setMap] = useState()
    const closeMap = () => {
      setShowMapState(false)
    }
    const raster = new TileLayer({
      source: new XYZ(
        {
          url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
          maxZoom: 19
        }
      ),
    });
    const wkt = wktValue;
    const format = new WKT();
    const feature = format.readFeature(wkt, {
      dataProjection: 'EPSG:4326',
      featureProjection: 'EPSG:3857',
    });
    const vector = new VectorLayer({
      source: new VectorSource({
        features: [feature]
      }),
      style: new Style({
        fill: new Fill({  color: 'rgba(0, 0, 0, 0.2)'  }),
        stroke: new Stroke({ color: '#FF0000',  width: 2  })
      })
    });
    let center = format.readGeometry(wkt, {
      dataProjection: 'EPSG:4326',
      featureProjection: 'EPSG:3857',
    })
    useEffect(() => {
      const map = new Map({
        layers: [raster, vector],
        target: 'map',
        view: new View({
          center: center.flatCoordinates,
          zoom: 18,
        }),
      })
      map.setTarget(mapTargetElement.current || "")
      setMap(map)
      return () => map.setTarget("")
    }, [wktValue])
    return(
        <div style={{width: "50%"}}>
          <div
            ref={mapTargetElement}
            className="map"
            style={{
              width:"100%",
              height: "100%",
              position: "relative",
            }}>
          </div>
          <button className='load' onClick={closeMap}>Bağla</button>
        </div>
    )
}
export default OLMap;