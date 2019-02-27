import React from 'react';
import mapboxgl from 'mapbox-gl';
import { routeLine, waypoints, maneuvers } from '../data/route-leg-step-demo';
import constants from '../constants';

mapboxgl.accessToken = constants.ACCESS_TOKEN;

class RouteLegStepMap extends React.Component {
  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/light-v10',
      center: [-87.643468, 41.915712],
      zoom: 11.5,
      maxBounds: [[-87.7, 41.88], [-87.6, 41.95]],
      minZoom: 11.5,
      maxZoom: 14
    });

    let popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
      offset: {
        bottom: [0, -10]
      }
    });

    let hoverPoint = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [0, 0]
          }
        }
      ]
    };

    this.map.on('load', () => {
      this.map.addLayer({
        id: 'route',
        source: {
          type: 'geojson',
          data: routeLine
        },
        type: 'line',
        paint: {
          'line-width': 2,
          'line-color': '#4264fb'
        }
      });

      this.map.addLayer({
        id: 'maneuvers',
        source: {
          type: 'geojson',
          data: maneuvers
        },
        type: 'circle',
        paint: {
          'circle-radius': 4,
          'circle-color': '#fff',
          'circle-stroke-color': '#33c377',
          'circle-stroke-width': 2
        }
      });

      this.map.addLayer({
        id: 'waypoints',
        source: {
          type: 'geojson',
          data: waypoints
        },
        type: 'circle',
        paint: {
          'circle-radius': 6,
          'circle-color': '#fff',
          'circle-stroke-color': '#ee4e8b',
          'circle-stroke-width': 2
        }
      });

      this.map.addSource('single-point', {
        type: 'geojson',
        data: hoverPoint
      });
      this.map.addLayer({
        id: 'point',
        source: 'single-point',
        type: 'circle',
        paint: {
          'circle-radius': 4,
          'circle-color': '#4264fb'
        }
      });
    });

    this.map.on('mousemove', e => {
      const features = this.map.queryRenderedFeatures(e.point, {
        layers: ['route']
      });
      if (features.length > 0) {
        this.map.getCanvas().style.cursor = 'pointer';
        hoverPoint.features[0].geometry.coordinates = [
          e.lngLat.lng,
          e.lngLat.lat
        ];
        this.map.getSource('single-point').setData(hoverPoint);
        const popupContent = `
          <div class="txt-bold">
            <div class="color-pink">leg: ${features[0].properties.leg}</div>
            <div class="color-green">step: ${features[0].properties.step}</div>
          </div>
        `;
        popup
          .setLngLat(e.lngLat)
          .setHTML(popupContent)
          .addTo(this.map);
      } else {
        popup.remove();
        hoverPoint.features[0].geometry.coordinates = [0, 0];
        this.map.getSource('single-point').setData(hoverPoint);
      }
    });
  }

  render() {
    return (
      <div
        ref={el => (this.mapContainer = el)}
        className="w-full"
        style={{
          height: '400px'
        }}
      />
    );
  }
}

export { RouteLegStepMap };
