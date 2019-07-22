import templateUrl from './languages-list.html'
import './languages-list.scss'

const languagesList = {
  bindings: {
    languages: '<',
    selectedLanguage: '<',
    onSelect: '&',
  },
  templateUrl,
}

export default languagesList
