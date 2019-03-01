import template from './languages-list.html'
import './languages-list.scss'

const languagesList = {
  bindings: {
    languages: '<',
    selectedLanguage: '<',
    onSelect: '&',
  },
  templateUrl: template,
}

export default languagesList
