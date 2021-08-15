// Not used

import { records, swimmers, venues, competitions, results } from '@/data/mainStats.js'
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

  // Include human-friendly output of time
  const humanizedTime = result.time.replace(':', 'm ') + 's'
  // Prefix zero minutes if seconds-only time
  if (result.time.indexOf(':') === -1) result.time = '0:' + result.time
  // Convert any duration to only seconds
  const time = moment.duration('0:' + result.time).asSeconds()

  // Calculate points
  function fina (swimTime, recordTime) {
    return Math.floor(1000 * Math.pow(recordTime / swimTime, 3))
  }

  const record = records.disciplines.find(d => d.name === result.discipline)
  let points
  if (record) {
    const recordAsSeconds = moment.duration('0:' + record.time).asSeconds()
    points = fina(time, recordAsSeconds)
  } else {
    points = 0
  }

  return {
    competitionName: competition.name,
    competitionDate: moment(competition.date, 'DD.MM.YYYY'),
    swimmerId: swimmer.id,
    swimmerName: swimmer.name,
    colour: swimmer.colour,
    swimmerAge,
    humanizedSwimmerAge,
    venueName: venue.name,
    venueLength: venue.length,
    discipline: result.discipline,
    time,
    points,
    humanizedTime
  }
})

const width = window.innerWidth - 200
const height = window.innerHeight - 260
const miniMapHeight = 50
const margin = 50
const detailHeight = height - miniMapHeight - margin - margin

export default {
  '$schema': 'https://vega.github.io/schema/vega/v5.json',
  'width': width,
  'height': height,
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
    },
    {
      'name': 'selectedSwimmers',
      'value': window.graph ? window.graph.selectedSwimmers() : [1, 2, 3]
    },
    {
      'name': 'selectedDisciplines',
      'value': window.graph ? window.graph.selectedDisciplines() : ['50m fri']
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
          'type': 'time',
          'range': 'width',
          'domain': { 'data': 'stats', 'field': 'competitionDate' },
          'domainRaw': { 'signal': 'detailDomain' }
        },
        {
          'name': 'yDetail',
          'type': 'linear',
          'range': [detailHeight, 0],
          'domain': { 'data': 'stats', 'field': 'time' },
          'nice': true,
          'zero': false
        }
      ],
      'axes': [
        { 'orient': 'bottom', 'title': 'Dato', 'scale': 'xDetail' },
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
                      'x': { 'scale': 'xDetail', 'field': 'competitionDate' },
                      'y': { 'scale': 'yDetail', 'field': 'time' },
                      'strokeWidth': { 'value': 5 },
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
                      'x': { 'scale': 'xDetail', 'field': 'competitionDate' },
                      'y': { 'scale': 'yDetail', 'field': 'time' },
                      'size': { 'value': 200 },
                      'fill': { 'field': 'colour' },
                      'stroke': { 'value': '#fff' },
                      'strokeWidth': { 'value': 2 },
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
          'type': 'time',
          'range': 'width',
          'domain': { 'data': 'stats', 'field': 'competitionDate' }
        },
        {
          'name': 'yOverview',
          'type': 'linear',
          'range': [miniMapHeight, 0],
          'domain': { 'data': 'stats', 'field': 'time' },
          'nice': true,
          'zero': false
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
                      'x': { 'scale': 'xOverview', 'field': 'competitionDate' },
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
