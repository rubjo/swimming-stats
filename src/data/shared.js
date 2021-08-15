import records from '@/data/records.js'
import { swimmers, venues, competitions, results } from '@/data/mainStats.js'
import moment from 'moment'
import nb from '@/nb.js'

moment.locale('nb-no', nb)
moment.locale('nb-no')

const width = window.innerWidth - 150
const height = window.innerHeight - 210
const miniMapHeight = 50
const margin = 50
const detailHeight = height - miniMapHeight - margin - margin
const graphSettings = { width, height, miniMapHeight, margin, detailHeight }

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

  const record = records.disciplines.find(d => {
    return d.name === result.discipline && d.poolLength === venue.poolLength
  })
  let points
  let humanizedRecordTime
  if (record) {
    // Prefix zero minutes if seconds-only time
    if (record.time.indexOf(':') === -1) record.time = '0:' + record.time
    const recordAsSeconds = moment.duration('0:' + record.time).asSeconds()
    points = fina(time, recordAsSeconds)
    // Include human-friendly output of time
    humanizedRecordTime = record.time
      .replace('0:', '')
      .replace(':', 'm ') + 's'
  } else {
    points = 0
    humanizedRecordTime = 'N/A'
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
    humanizedTime,
    humanizedRecordTime
  }
})

export { graphSettings, graphData }
