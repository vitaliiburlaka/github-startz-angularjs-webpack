var template = require('./languages-list.html');
require('./languages-list.scss');

var languagesList = {
  bindings: {
    languages: '<',
    selectedLanguage: '<',
    onSelect: '&',
  },
  templateUrl: template,
};

module.exports = languagesList;
