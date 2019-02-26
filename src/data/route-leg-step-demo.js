export const routeLine = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        leg: 'one',
        step: 'one'
      },
      geometry: {
        type: 'LineString',
        coordinates: [[-87.670513, 41.942339], [-87.668729, 41.939797]]
      }
    },
    {
      type: 'Feature',
      properties: {
        leg: 'one',
        step: 'two'
      },
      geometry: {
        type: 'LineString',
        coordinates: [
          [-87.668729, 41.939797],
          [-87.668178, 41.924199],
          [-87.668693, 41.92156],
          [-87.667816, 41.917178],
          [-87.667758, 41.910633]
        ]
      }
    },
    {
      type: 'Feature',
      properties: {
        leg: 'one',
        step: 'three'
      },
      geometry: {
        type: 'LineString',
        coordinates: [[-87.667758, 41.910633], [-87.677492, 41.910467]]
      }
    },
    {
      type: 'Feature',
      properties: {
        leg: 'one',
        step: 'four'
      },
      geometry: {
        type: 'LineString',
        coordinates: [[-87.677492, 41.910467], [-87.67747, 41.909927]]
      }
    },
    {
      type: 'Feature',
      properties: {
        leg: 'two',
        step: 'one'
      },
      geometry: {
        type: 'LineString',
        coordinates: [[-87.67747, 41.909927], [-87.660967, 41.89983]]
      }
    },
    {
      type: 'Feature',
      properties: {
        leg: 'two',
        step: 'two'
      },
      geometry: {
        type: 'LineString',
        coordinates: [
          [-87.660967, 41.89983],
          [-87.658563, 41.896333],
          [-87.654193, 41.891953]
        ]
      }
    },
    {
      type: 'Feature',
      properties: {
        leg: 'two',
        step: 'three'
      },
      geometry: {
        type: 'LineString',
        coordinates: [[-87.654193, 41.891953], [-87.650775, 41.892548]]
      }
    },
    {
      type: 'Feature',
      properties: {
        leg: 'two',
        step: 'four'
      },
      geometry: {
        type: 'LineString',
        coordinates: [[-87.650775, 41.892548], [-87.624101, 41.892529]]
      }
    },
    {
      type: 'Feature',
      properties: {
        leg: 'two',
        step: 'five'
      },
      geometry: {
        type: 'LineString',
        coordinates: [[-87.624101, 41.892529], [-87.624144, 41.894141]]
      }
    },
    {
      type: 'Feature',
      properties: {
        leg: 'two',
        step: 'six'
      },
      geometry: {
        type: 'LineString',
        coordinates: [[-87.624144, 41.894141], [-87.621869, 41.894176]]
      }
    }
  ]
};

export const waypoints = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        waypoint: 'zero'
      },
      geometry: {
        type: 'Point',
        coordinates: [-87.67053, 41.942333]
      }
    },
    {
      type: 'Feature',
      properties: {
        waypoint: 'one'
      },
      geometry: {
        type: 'Point',
        coordinates: [-87.67746, 41.909927]
      }
    },
    {
      type: 'Feature',
      properties: {
        waypoint: 'two'
      },
      geometry: {
        type: 'Point',
        coordinates: [-87.62187, 41.89423]
      }
    }
  ]
};

export const milestones = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        leg: 'one',
        milestone: 'one'
      },
      geometry: {
        type: 'Point',
        coordinates: [-87.668729, 41.939797]
      }
    },
    {
      type: 'Feature',
      properties: {
        leg: 'one',
        milestone: 'two'
      },
      geometry: {
        type: 'Point',
        coordinates: [-87.667816, 41.910633]
      }
    },
    {
      type: 'Feature',
      properties: {
        leg: 'one',
        milestone: 'three'
      },
      geometry: {
        type: 'Point',
        coordinates: [-87.677492, 41.910467]
      }
    },
    {
      type: 'Feature',
      properties: {
        leg: 'two',
        milestone: 'one'
      },
      geometry: {
        type: 'Point',
        coordinates: [-87.660967, 41.89983]
      }
    },
    {
      type: 'Feature',
      properties: {
        leg: 'two',
        milestone: 'two'
      },
      geometry: {
        type: 'Point',
        coordinates: [-87.654193, 41.891953]
      }
    },
    {
      type: 'Feature',
      properties: {
        leg: 'two',
        milestone: 'three'
      },
      geometry: {
        type: 'Point',
        coordinates: [-87.650775, 41.892548]
      }
    },
    {
      type: 'Feature',
      properties: {
        leg: 'two',
        milestone: 'four'
      },
      geometry: {
        type: 'Point',
        coordinates: [-87.624101, 41.892529]
      }
    },
    {
      type: 'Feature',
      properties: {
        leg: 'two',
        milestone: 'five'
      },
      geometry: {
        type: 'Point',
        coordinates: [-87.624144, 41.894141]
      }
    }
  ]
};
