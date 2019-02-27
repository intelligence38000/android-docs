import React from 'react';
import mapboxgl from 'mapbox-gl';
import constants from '../constants';

mapboxgl.accessToken = constants.ACCESS_TOKEN;

class BearingToleranceMap extends React.Component {
  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/light-v10',
      center: [-87.6834, 41.9104],
      zoom: 16,
      maxBounds: [[-87.6848, 41.9094], [-87.682, 41.9112]],
      maxZoom: 17
    });

    this.map.on('load', () => {
      const markerCoord = [-87.6828, 41.9103];
      const referencePointCoord = [-87.6836, 41.9103];
      const markerPosition = this.map.project(markerCoord);
      const referencePointPosition = this.map.project(referencePointCoord);
      const length = referencePointPosition.x - markerPosition.x;

      this.map.addSource('polygon', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'Polygon',
                coordinates: [
                  [
                    markerCoord,
                    [
                      this.map.unproject({
                        x: referencePointPosition.x,
                        y: referencePointPosition.y + length
                      }).lng,
                      this.map.unproject({
                        x: referencePointPosition.x,
                        y: referencePointPosition.y + length
                      }).lat
                    ],
                    [
                      this.map.unproject({
                        x: referencePointPosition.x,
                        y: referencePointPosition.y - length
                      }).lng,
                      this.map.unproject({
                        x: referencePointPosition.x,
                        y: referencePointPosition.y - length
                      }).lat
                    ],
                    markerCoord
                  ]
                ]
              }
            }
          ]
        }
      });
      this.map.addLayer({
        id: 'polygon',
        source: 'polygon',
        type: 'fill',
        paint: {
          'fill-color': '#4264fb',
          'fill-opacity': 0.2
        }
      });

      this.map.addLayer({
        id: 'bearing',
        source: {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                properties: {},
                geometry: {
                  type: 'Polygon',
                  coordinates: [
                    [
                      [-87.68288, 41.91033],
                      [-87.68288, 41.91027],
                      [-87.68291, 41.9103]
                    ]
                  ]
                }
              }
            ]
          }
        },
        type: 'fill',
        paint: {
          'fill-color': '#ee4e8b'
        }
      });

      this.map.addLayer({
        id: 'point',
        source: {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                properties: {},
                geometry: {
                  type: 'Point',
                  coordinates: markerCoord
                }
              }
            ]
          }
        },
        type: 'circle',
        paint: {
          'circle-color': '#4264fb',
          'circle-stroke-color': '#fff',
          'circle-radius': 8,
          'circle-stroke-width': 3
        }
      });
    });
  }

  render() {
    return (
      <div
        ref={el => (this.mapContainer = el)}
        className="w-full mb24"
        style={{
          height: '400px'
        }}
      />
    );
  }
}

export { BearingToleranceMap };
