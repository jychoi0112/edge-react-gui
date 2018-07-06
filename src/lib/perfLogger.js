// @flow

import RNFS from 'react-native-fs'

import type { Store, Action, Next } from '../modules/ReduxTypes.js'

const perfLoggerCSV = RNFS.DocumentDirectoryPath + '/perfLogger.csv'
RNFS.writeFile(perfLoggerCSV, 'action type,start,end\n', 'utf8')
  .then(success => console.log(`PERF: PerfLogger initialized @ ${perfLoggerCSV}`))
  .catch(error => console.log(error.message))

export const perfLogger = (store: Store) => (next: Next) => (action: Action) => {
  const start = Date.now()
  const result = next(action)
  const end = Date.now()

  RNFS.appendFile(perfLoggerCSV, `${action.type},${start},${end}\n`)

  return result
}

export default perfLogger
