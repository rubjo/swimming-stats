import { swimmers, venues, competitions, results } from '@/data/mainStats.js'
import moment from 'moment'
import nb from '@/nb.js'

moment.locale('nb-no', nb)
moment.locale('nb-no')

// Flatten data
const graphData = results.map(result => {
  const competition = competitions.find(competition => competition.id === result.competition)
  const swimmer = swimmers.find(swimmer => swimmer.id === result.swimmer)
  const venue = venues.find(venue => venue.id === competition.venue)

  const mCompetitionDate = moment(competition.date, 'DD.MM.YYYY')
  const mSwimmerBorn = moment(swimmer.born, 'DD.MM.YYYY')
  const swimmerAge = mCompetitionDate.diff(mSwimmerBorn, 'days')
  const diffDuration = moment.duration(mCompetitionDate.diff(mSwimmerBorn))
  const humanizedSwimmerAge = diffDuration.years() + ' år' + (diffDuration.months() ? ' og ' + diffDuration.months() + ' mnd' : '')

  // Prefix zero minutes if seconds-only time
  if (result.time.indexOf(':') === -1) result.time = '0:' + result.time
  // Convert any duration to only seconds
  const time = moment.duration('0:' + result.time).asSeconds()
  // Include human-friendly output of time
  const humanizedTime = result.time

  return {
    competitionName: competition.name,
    competitionDate: moment(competition.date, 'DD.MM.YYYY'),
    swimmerId: swimmer.id,
    swimmerName: swimmer.name,
    swimmerAge,
    humanizedSwimmerAge,
    venueName: venue.name,
    venueLength: venue.length,
    discipline: result.discipline,
    time,
    humanizedTime
  }
})

const width = window.innerWidth - 200
const height = window.innerHeight - 200
const miniMapHeight = 50
const margin = 50
const detailHeight = height - miniMapHeight - margin - margin

export default {
  '$schema': 'https://vega.github.io/schema/vega/v5.json',
  'width': width,
  'height': height,
  'padding': 5,
  'config': {
    'range': {
      'category': [
        '#29f', // Michael
        '#ef8e3b', // Daniel
        '#0b0' // Victor
      ]
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
          'height': { 'value': detailHeight },
          'width': { 'value': width }
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
          'range': [detailHeight, 0],
          'domain': { 'data': 'stats', 'field': 'time' },
          'nice': true,
          'zero': false
        },
        {
          'name': 'color',
          'type': 'ordinal',
          'range': 'category',
          'domain': { 'data': 'stats', 'field': 'swimmerName' }
        }
      ],
      'axes': [
        { 'orient': 'bottom', 'title': 'Alder', 'scale': 'xDetail' },
        { 'orient': 'left', 'title': 'Tid (sekunder)', 'scale': 'yDetail' }
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
                      'strokeWidth': { 'value': 5 },
                      'stroke': { 'scale': 'color', 'field': 'swimmerName' }
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
                      'size': { 'value': 200 },
                      'fill': { 'scale': 'color', 'field': 'swimmerName' },
                      'stroke': { 'value': '#fff' },
                      'strokeWidth': { 'value': 2.5 },
                      'tooltip': { 'signal': 'datum' },
                      'zindex': 99
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
          'y': { 'value': detailHeight + margin },
          'height': { 'value': miniMapHeight },
          'width': { 'value': width },
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
          'range': [miniMapHeight, 0],
          'domain': { 'data': 'stats', 'field': 'time' },
          'nice': true,
          'zero': false
        },
        {
          'name': 'color',
          'type': 'ordinal',
          'range': 'category',
          'domain': { 'data': 'stats', 'field': 'swimmerName' }
        }
      ],
      'axes': [
        { 'orient': 'bottom', 'scale': 'xOverview' }
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
                      'stroke': { 'scale': 'color', 'field': 'swimmerName' }
                    }
                  }
                },
                {
                  'type': 'rect',
                  'name': 'brush',
                  'encode': {
                    'enter': {
                      'y': { 'value': 0 },
                      'height': { 'value': miniMapHeight },
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
                      'height': { 'value': miniMapHeight },
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
                      'height': { 'value': miniMapHeight },
                      'width': { 'value': 1 },
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
