const swimmers = [
  { id: 1, name: 'Michael', born: '19.03.2009', colour: '#34aeff' },
  { id: 2, name: 'Daniel', born: '20.05.2011', colour: '#ffbf2b' },
  { id: 3, name: 'Victor', born: '11.03.2013', colour: '#00cb10' }
]

const venues = [
  { id: 1, name: 'Farrishallen', poolLength: 25 },
  { id: 2, name: 'Horten svømmehall', poolLength: 25 },
  { id: 3, name: 'Sandefjord svømmehall', poolLength: 25 },
  { id: 4, name: 'Tønsberg svømmehall', poolLength: 25 },
  { id: 5, name: 'Sarpsborg svømmehall', poolLength: 25 },
  { id: 6, name: 'Gulsethallen (Skien)', poolLength: 25 },
  { id: 7, name: 'Kjølneshallen', poolLength: 25 }
]

const competitions = [
  { id: 1, venue: 1, date: '07.04.2018', name: 'Rekruttstevne' },
  { id: 2, venue: 2, date: '22.09.2018', name: 'Horten Open' },
  { id: 3, venue: 1, date: '21.10.2018', name: 'Rekruttstevne' },
  { id: 4, venue: 1, date: '02.02.2019', name: 'Rekruttstevne' },
  { id: 5, venue: 3, date: '02.03.2019', name: 'Rekruttstevne' },
  { id: 6, venue: 1, date: '06.04.2019', name: 'Rekruttstevne' },
  { id: 7, venue: 4, date: '19.05.2019', name: 'Rekruttstevne' },
  { id: 8, venue: 2, date: '21.09.2019', name: 'Rekruttstevne' },
  { id: 9, venue: 2, date: '21.09.2019', name: 'Horten Open' },
  { id: 10, venue: 5, date: '13.10.2019', name: 'Olavslekene' },
  { id: 11, venue: 1, date: '20.10.2019', name: 'Farrisrekrutten' },
  { id: 12, venue: 3, date: '02.11.2019', name: 'Rekruttstevne' },
  { id: 13, venue: 3, date: '23.11.2019', name: 'Fjordsvøm 2019' },
  { id: 14, venue: 6, date: '24.11.2019', name: 'Rekruttstevne' },
  { id: 15, venue: 4, date: '07.12.2019', name: 'Rekruttstevne' },
  { id: 16, venue: 3, date: '11.01.2020', name: 'Rekruttstevne' },
  { id: 17, venue: 7, date: '18.01.2020', name: 'Poseidon Jaked Cup' },
  { id: 18, venue: 7, date: '19.01.2020', name: 'Poseidon Jaked Cup' }
]

const results = [
  //   8b    d8 88  dP""b8 88  88    db    888888 88
  //   88b  d88 88 dP   `" 88  88   dPYb   88__   88
  //   88YbdP88 88 Yb      888888  dP__Yb  88""   88  .o
  //   88 YY 88 88  YboodP 88  88 dP""""Yb 888888 88ood8
  { swimmer: 1, competition: 1, discipline: '25m fri', time: '19.55' },
  { swimmer: 1, competition: 1, discipline: '25m bryst', time: '28.16' },
  { swimmer: 1, competition: 1, discipline: '50m fri', time: '45.16' },
  { swimmer: 1, competition: 1, discipline: '50m bryst', time: '1:00.45' },
  { swimmer: 1, competition: 2, discipline: '25m fri', time: '19.05' },
  { swimmer: 1, competition: 2, discipline: '25m bryst', time: '25.40' },
  { swimmer: 1, competition: 2, discipline: '25m butterfly', time: '25.71' },
  { swimmer: 1, competition: 2, discipline: '25m rygg', time: '26.49' },
  { swimmer: 1, competition: 2, discipline: '50m fri', time: '46.40' },
  { swimmer: 1, competition: 2, discipline: '50m bryst', time: '55.20' },
  { swimmer: 1, competition: 3, discipline: '25m fri', time: '19.91' },
  { swimmer: 1, competition: 3, discipline: '25m bryst', time: '25.23' },
  { swimmer: 1, competition: 3, discipline: '25m butterfly', time: '24.59' },
  { swimmer: 1, competition: 3, discipline: '25m rygg', time: '24.59' },
  { swimmer: 1, competition: 3, discipline: '50m fri', time: '41.94' },
  { swimmer: 1, competition: 3, discipline: '50m bryst', time: '58.45' },
  { swimmer: 1, competition: 3, discipline: '100m fri', time: '1:46.33' },
  { swimmer: 1, competition: 5, discipline: '25m fri', time: '19.29' },
  { swimmer: 1, competition: 5, discipline: '25m bryst', time: '23.76' },
  { swimmer: 1, competition: 5, discipline: '25m butterfly', time: '22.20' },
  { swimmer: 1, competition: 5, discipline: '25m rygg', time: '23.01' },
  { swimmer: 1, competition: 5, discipline: '50m fri', time: '43.60' },
  { swimmer: 1, competition: 5, discipline: '50m bryst', time: '52.00' },
  { swimmer: 1, competition: 6, discipline: '25m fri', time: '17.72' },
  { swimmer: 1, competition: 6, discipline: '25m bryst', time: '23.45' },
  { swimmer: 1, competition: 6, discipline: '25m butterfly', time: '24.16' },
  { swimmer: 1, competition: 6, discipline: '25m rygg', time: '22.92' },
  { swimmer: 1, competition: 6, discipline: '50m fri', time: '39.22' },
  { swimmer: 1, competition: 6, discipline: '50m bryst', time: '50.25' },
  { swimmer: 1, competition: 6, discipline: '100m fri', time: '1:33.75' },
  { swimmer: 1, competition: 7, discipline: '25m fri', time: '17.81' },
  { swimmer: 1, competition: 7, discipline: '25m bryst', time: '22.60' },
  { swimmer: 1, competition: 7, discipline: '25m butterfly', time: '21.26' },
  { swimmer: 1, competition: 7, discipline: '25m rygg', time: '22.89' },
  { swimmer: 1, competition: 7, discipline: '50m fri', time: '42.81' },
  { swimmer: 1, competition: 7, discipline: '50m bryst', time: '50.18' },
  { swimmer: 1, competition: 7, discipline: '50m rygg', time: '45.79' },
  { swimmer: 1, competition: 7, discipline: '100m fri', time: '1:34.03' },
  { swimmer: 1, competition: 9, discipline: '50m fri', time: '37.96' },
  { swimmer: 1, competition: 9, discipline: '50m bryst', time: '46.37' },
  { swimmer: 1, competition: 9, discipline: '50m rygg', time: '45.66' },
  { swimmer: 1, competition: 9, discipline: '50m butterfly', time: '43.93' },
  { swimmer: 1, competition: 9, discipline: '100m medley', time: '1:31.13' },
  { swimmer: 1, competition: 9, discipline: '100m bryst', time: '1:45.34' },
  { swimmer: 1, competition: 10, discipline: '50m fri', time: '36.36' },
  { swimmer: 1, competition: 10, discipline: '50m bryst', time: '45.05' },
  { swimmer: 1, competition: 10, discipline: '50m rygg', time: '44.57' },
  { swimmer: 1, competition: 10, discipline: '50m butterfly', time: '43.50' },
  { swimmer: 1, competition: 10, discipline: '100m medley', time: '1:29.60' },
  { swimmer: 1, competition: 10, discipline: '100m bryst', time: '1:41.96' },
  { swimmer: 1, competition: 10, discipline: '100m rygg', time: '1:37.87' },
  { swimmer: 1, competition: 10, discipline: '200m medley', time: '3:14.61' },
  { swimmer: 1, competition: 10, discipline: '400m fri', time: '6:15.20' },
  { swimmer: 1, competition: 13, discipline: '50m bryst', time: '45.45' },
  { swimmer: 1, competition: 13, discipline: '50m butterfly', time: '43.30' },
  { swimmer: 1, competition: 13, discipline: '100m bryst', time: '1:41.05' },
  { swimmer: 1, competition: 13, discipline: '100m rygg', time: '1:30.71' },
  { swimmer: 1, competition: 13, discipline: '200m medley', time: '3:14.69' },
  { swimmer: 1, competition: 17, discipline: '50m bryst', time: '44.04' },
  { swimmer: 1, competition: 17, discipline: '50m butterfly', time: '40.31' },
  { swimmer: 1, competition: 17, discipline: '50m fri', time: '32.88' },
  { swimmer: 1, competition: 17, discipline: '100m rygg', time: '1:27.93' },
  { swimmer: 1, competition: 17, discipline: '400m fri', time: '5:59.98' },
  { swimmer: 1, competition: 18, discipline: '200m medley', time: '3:02.34' },
  { swimmer: 1, competition: 18, discipline: '100m fri', time: '1:15.88' },
  //   8888b.     db    88b 88 88 888888 88
  //    8I  Yb   dPYb   88Yb88 88 88__   88
  //    8I  dY  dP__Yb  88 Y88 88 88""   88  .o
  //   8888Y"  dP""""Yb 88  Y8 88 888888 88ood8
  { swimmer: 2, competition: 3, discipline: '25m fri', time: '29.18' },
  { swimmer: 2, competition: 3, discipline: '25m bryst', time: '54.09' },
  { swimmer: 2, competition: 3, discipline: '25m rygg', time: '34.67' },
  { swimmer: 2, competition: 4, discipline: '25m fri', time: '24.28' },
  { swimmer: 2, competition: 4, discipline: '25m bryst', time: '37.95' },
  { swimmer: 2, competition: 4, discipline: '25m butterfly', time: '28.50' },
  { swimmer: 2, competition: 4, discipline: '50m fri', time: '58.46' },
  { swimmer: 2, competition: 5, discipline: '25m fri', time: '29.76' },
  { swimmer: 2, competition: 5, discipline: '25m bryst', time: '35.33' },
  { swimmer: 2, competition: 5, discipline: '25m butterfly', time: '30.37' },
  { swimmer: 2, competition: 5, discipline: '25m rygg', time: '32.27' },
  { swimmer: 2, competition: 5, discipline: '50m fri', time: '1:03.89' },
  { swimmer: 2, competition: 6, discipline: '25m fri', time: '22.68' },
  { swimmer: 2, competition: 6, discipline: '25m bryst', time: '34.91' },
  { swimmer: 2, competition: 6, discipline: '25m rygg', time: '29.96' },
  { swimmer: 2, competition: 6, discipline: '50m fri', time: '50.94' },
  { swimmer: 2, competition: 7, discipline: '25m fri', time: '23.19' },
  { swimmer: 2, competition: 7, discipline: '25m bryst', time: '37.71' },
  { swimmer: 2, competition: 7, discipline: '25m butterfly', time: '31.85' },
  { swimmer: 2, competition: 7, discipline: '50m fri', time: '1:02.54' },
  { swimmer: 2, competition: 7, discipline: '50m bryst', time: '1:43.36' },
  { swimmer: 2, competition: 8, discipline: '25m fri', time: '20.05' },
  { swimmer: 2, competition: 8, discipline: '25m bryst', time: '32.68' },
  { swimmer: 2, competition: 8, discipline: '25m butterfly', time: '24.14' },
  { swimmer: 2, competition: 8, discipline: '25m rygg', time: '28.03' },
  { swimmer: 2, competition: 8, discipline: '50m fri', time: '55.38' },
  { swimmer: 2, competition: 8, discipline: '50m bryst', time: '1:09.39' },
  { swimmer: 2, competition: 11, discipline: '25m fri', time: '21.00' },
  { swimmer: 2, competition: 11, discipline: '25m bryst', time: '30.50' },
  { swimmer: 2, competition: 11, discipline: '25m butterfly', time: '23.00' },
  { swimmer: 2, competition: 11, discipline: '25m rygg', time: '27.50' },
  { swimmer: 2, competition: 11, discipline: '50m fri', time: '46.62' },
  { swimmer: 2, competition: 11, discipline: '50m bryst', time: '1:13.00' },
  { swimmer: 2, competition: 11, discipline: '100m fri', time: '1:48.00' },
  { swimmer: 2, competition: 12, discipline: '25m fri', time: '20.48' },
  { swimmer: 2, competition: 12, discipline: '25m bryst', time: '32.62' },
  { swimmer: 2, competition: 12, discipline: '25m butterfly', time: '24.42' },
  { swimmer: 2, competition: 12, discipline: '25m rygg', time: '29.23' },
  { swimmer: 2, competition: 12, discipline: '50m fri', time: '54.13' },
  { swimmer: 2, competition: 12, discipline: '50m bryst', time: '1:13.63' },
  { swimmer: 2, competition: 12, discipline: '100m fri', time: '1:48.46' },
  { swimmer: 2, competition: 14, discipline: '25m fri', time: '19.10' },
  { swimmer: 2, competition: 14, discipline: '25m bryst', time: '28.94' },
  { swimmer: 2, competition: 14, discipline: '25m butterfly', time: '24.13' },
  { swimmer: 2, competition: 14, discipline: '25m rygg', time: '26.82' },
  { swimmer: 2, competition: 14, discipline: '50m fri', time: '44.52' },
  { swimmer: 2, competition: 14, discipline: '50m bryst', time: '1:08.02' },
  { swimmer: 2, competition: 14, discipline: '50m butterfly', time: '1:05.44' },
  { swimmer: 2, competition: 15, discipline: '25m fri', time: '18.72' },
  { swimmer: 2, competition: 15, discipline: '25m bryst', time: '28.99' },
  { swimmer: 2, competition: 15, discipline: '25m butterfly', time: '22.28' },
  { swimmer: 2, competition: 15, discipline: '25m rygg', time: '25.94' },
  { swimmer: 2, competition: 15, discipline: '50m fri', time: '45.63' },
  { swimmer: 2, competition: 15, discipline: '50m bryst', time: '1:00.34' },
  { swimmer: 2, competition: 16, discipline: '50m bryst', time: '1:04.89' },
  { swimmer: 2, competition: 16, discipline: '100m medley', time: '2:03.10' },
  { swimmer: 2, competition: 16, discipline: '25m fri', time: '19.58' },
  { swimmer: 2, competition: 16, discipline: '25m bryst', time: '29.34' },
  { swimmer: 2, competition: 16, discipline: '25m butterfly', time: '20.45' },
  { swimmer: 2, competition: 16, discipline: '25m rygg', time: '24.80' },
  { swimmer: 2, competition: 16, discipline: '50m fri', time: '48.74' },
  { swimmer: 2, competition: 16, discipline: '100m fri', time: '1:44.50' },
  //   Yb    dP 88  dP""b8 888888  dP"Yb  88""Yb
  //    Yb  dP  88 dP   `"   88   dP   Yb 88__dP
  //     YbdP   88 Yb        88   Yb   dP 88"Yb
  //      YP    88  YboodP   88    YbodP  88  Yb
  { swimmer: 3, competition: 11, discipline: '25m rygg', time: '42.00' }
]

export { swimmers, venues, competitions, results }
