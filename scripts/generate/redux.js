require('node-env-file')('.env');
var fs = require('fs');
var dirConf = './src/core/generated'
var initialState = require('../../src/configs/reduxInitialState.js'); // thats path fix for bash script exec

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

var textTypes = '';
var listTypes = [];
var textActions = `import actionTypes from './actionTypes';\n`;
var listActions = [];
var textReducers = `import actionTypes from './actionTypes';\n
export default (state = {}, action = {}) => {
  switch (action.type) {`;

Object.keys(initialState).forEach((name, key, array) => {
  let space = '\n';
  let nameUpperCase = name.toLocaleUpperCase()
  let nameFirstUpperCase = capitalizeFirstLetter(name)
  if (key === array.length - 1) {
    space = '';
  }

  textTypes += `export const SET_${nameUpperCase} = "SET_${nameUpperCase}";${space}`
  listTypes.push(`SET_${nameUpperCase}`)

  textActions += `
export const set${nameFirstUpperCase} = (${name}) => ({
  type: actionTypes.SET_${nameUpperCase},
  ${name},
});${space}`
  listActions.push(`set${nameFirstUpperCase}`)

  textReducers += `
    case actionTypes.SET_${nameUpperCase}: {
      return {
        ...state,
        ${name}: action.${name},
      };
    }`

  if (key === array.length - 1) {
    textReducers += `
    default:
      return state;
  }
};`
  }
})

textTypes += `\nexport default { ${listTypes.join(', ')} }`
textActions += `\nexport default { ${listActions.join(', ')} }`

fs.writeFileSync(dirConf + '/actionTypes.js', textTypes);
fs.writeFileSync(dirConf + '/actions.js', textActions);
fs.writeFileSync(dirConf + '/reducers.js', textReducers);