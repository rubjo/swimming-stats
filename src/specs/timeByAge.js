import { graphSettings, graphData } from '@/data/shared.js'

export default {
  '$schema': 'https://vega.github.io/schema/vega/v5.json',
  'width': graphSettings.width,
  'height': graphSettings.height,
  'padding': 5,
  'config': {
    'axis': {
      'labelFontSize': 14,
      'titleFontSize': 16
    }
  },
  'data': [
    {
      'name': 'stats',
      'values': graphData
    }
  ],
  'signals': [
    {
      'name': 'detailDomain'
    }
  ],
  'marks': [
    {
      'type': 'group',
      'name': 'detail',
      'encode': {
        'enter': {
          'height': { 'value': graphSettings.detailHeight },
          'width': { 'value': graphSettings.width }
        }
      },
      'scales': [
        {
          'name': 'xDetail',
          'type': 'linear',
          'zero': false,
          'range': 'width',
          'domain': { 'data': 'stats', 'field': 'swimmerAge' },
          'domainRaw': { 'signal': 'detailDomain' }
        },
        {
          'name': 'yDetail',
          'type': 'linear',
          'range': [graphSettings.detailHeight, 0],
          'domain': { 'data': 'stats', 'field': 'time' },
          'nice': true,
          'zero': false
        }
      ],
      'axes': [
        {
          'orient': 'bottom',
          'title': 'Alder',
          'scale': 'xDetail',
          'encode': {
            'labels': {
              'update': {
                'text': {
                  'signal': 'floor(datum.value / 365) + " år"'
                }
              }
            }
          }
        },
        {
          'orient': 'left',
          'title': 'Tid (sekunder)',
          'scale': 'yDetail'
        }
      ],
      'marks': [
        {
          'type': 'group',
          'from': {
            'facet': {
              'name': 'swimmer',
              'data': 'stats',
              'groupby': 'swimmerName'
            }
          },
          'marks': [
            {
              'type': 'group',
              'from': {
                'facet': {
                  'name': 'discipline',
                  'data': 'swimmer',
                  'groupby': 'discipline'
                }
              },
              'marks': [
                {
                  'type': 'line',
                  'from': { 'data': 'discipline' },
                  'encode': {
                    'update': {
                      'interpolate': { 'value': 'monotone' },
                      'x': { 'scale': 'xDetail', 'field': 'swimmerAge' },
                      'y': { 'scale': 'yDetail', 'field': 'time' },
                      'strokeWidth': { 'value': 3 },
                      'stroke': { 'field': 'colour' }
                    }
                  }
                },
                {
                  'type': 'symbol',
                  'from': { 'data': 'discipline' },
                  'encode': {
                    'update': {
                      'shape': { 'value': 'circle' },
                      'x': { 'scale': 'xDetail', 'field': 'swimmerAge' },
                      'y': { 'scale': 'yDetail', 'field': 'time' },
                      'size': { 'value': 25 },
                      'fill': { 'field': 'colour' },
                      'stroke': { 'field': 'colour' },
                      'strokeWidth': { 'value': 3 },
                      'tooltip': { 'signal': 'datum' },
                      'zindex': 99
                    },
                    'hover': {
                      'size': { 'value': 100 },
                      'fill': { 'value': '#fff' }
                    }
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    {
      'type': 'group',
      'name': 'overview',
      'encode': {
        'enter': {
          'x': { 'value': 0 },
          'y': { 'value': graphSettings.detailHeight + graphSettings.margin },
          'height': { 'value': graphSettings.miniMapHeight },
          'width': { 'value': graphSettings.width },
          'fill': { 'value': 'transparent' }
        }
      },
      'signals': [
        {
          'name': 'brush',
          'value': 0,
          'on': [
            {
              'events': '@overview:mousedown',
              'update': '[x(), x()]'
            },
            {
              'events': '[@overview:mousedown, window:mouseup] > window:mousemove!',
              'update': '[brush[0], clamp(x(), 0, width)]'
            },
            {
              'events': { 'signal': 'delta' },
              'update': 'clampRange([anchor[0] + delta, anchor[1] + delta], 0, width)'
            }
          ]
        },
        {
          'name': 'anchor',
          'value': null,
          'on': [{ 'events': '@brush:mousedown', 'update': 'slice(brush)' }]
        },
        {
          'name': 'xdown',
          'value': 0,
          'on': [{ 'events': '@brush:mousedown', 'update': 'x()' }]
        },
        {
          'name': 'delta',
          'value': 0,
          'on': [
            {
              'events': '[@brush:mousedown, window:mouseup] > window:mousemove!',
              'update': 'x() - xdown'
            }
          ]
        },
        {
          'name': 'detailDomain',
          'push': 'outer',
          'on': [
            {
              'events': { 'signal': 'brush' },
              'update': "span(brush) ? invert('xOverview', brush) : null"
            }
          ]
        }
      ],
      'scales': [
        {
          'name': 'xOverview',
          'type': 'linear',
          'zero': false,
          'range': 'width',
          'domain': { 'data': 'stats', 'field': 'swimmerAge' }
        },
        {
          'name': 'yOverview',
          'type': 'linear',
          'range': [graphSettings.miniMapHeight, 0],
          'domain': { 'data': 'stats', 'field': 'time' },
          'nice': true,
          'zero': false
        }
      ],
      'axes': [
        {
          'orient': 'bottom',
          'scale': 'xOverview',
          'encode': {
            'labels': {
              'update': {
                'text': {
                  'signal': 'floor(datum.value / 365) + " år"'
                }
              }
            }
          }
        }
      ],
      'marks': [
        {
          'type': 'group',
          'from': {
            'facet': {
              'name': 'swimmer',
              'data': 'stats',
              'groupby': 'swimmerName'
            }
          },
          'marks': [
            {
              'type': 'group',
              'from': {
                'facet': {
                  'name': 'discipline',
                  'data': 'swimmer',
                  'groupby': 'discipline'
                }
              },
              'marks': [
                {
                  'type': 'line',
                  'interactive': false,
                  'from': { 'data': 'discipline' },
                  'encode': {
                    'update': {
                      'interpolate': { 'value': 'monotone' },
                      'x': { 'scale': 'xOverview', 'field': 'swimmerAge' },
                      'y': { 'scale': 'yOverview', 'field': 'time' },
                      'stroke': { 'field': 'colour' }
                    }
                  }
                },
                {
                  'type': 'rect',
                  'name': 'brush',
                  'encode': {
                    'enter': {
                      'y': { 'value': 0 },
                      'height': { 'value': graphSettings.miniMapHeight },
                      'fill': { 'value': '#333' },
                      'fillOpacity': { 'value': 0.2 }
                    },
                    'update': {
                      'x': { 'signal': 'brush[0]' },
                      'x2': { 'signal': 'brush[1]' }
                    }
                  }
                },
                {
                  'type': 'rect',
                  'interactive': false,
                  'encode': {
                    'enter': {
                      'y': { 'value': 0 },
                      'height': { 'value': graphSettings.miniMapHeight },
                      'width': { 'value': 1 },
                      'fill': { 'value': 'firebrick' }
                    },
                    'update': {
                      'x': { 'signal': 'brush[0]' }
                    }
                  }
                },
                {
                  'type': 'rect',
                  'interactive': false,
                  'encode': {
                    'enter': {
                      'y': { 'value': 0 },
                      'height': { 'value': graphSettings.miniMapHeight },
                      '': { 'value': 1 },
                      'fill': { 'value': 'firebrick' }
                    },
                    'update': {
                      'x': { 'signal': 'brush[1]' }
                    }
                  }
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
