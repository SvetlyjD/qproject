const { promisify } = require('util');
const { resolve } = require('path');
const fs = require('fs');
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
const { move, copy, remove } = require('fs-extra')
require('node-env-file')('.env');

const CORENAME = 'qdigitalcore';
const { PROJECTNAME } = process.env;
if (PROJECTNAME === 'PROJECTNAME') throw new Error('Change your PROJECTNAME in .env file');

const BLACKLIST = [
  '.git',
  'node_modules',
  'scripts',
  '/src/core',
  '/android/.gradle'
]
function replaceAll(find, replace, str) {
  var find = find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  return str.replace(new RegExp(find, 'g'), replace);
}

async function getFiles(dir) {
  const subdirs = await readdir(dir);
  const files = await Promise.all(subdirs.map(async (subdir) => {
    const res = resolve(dir, subdir);
    if (BLACKLIST.find(item => res.indexOf(item) !== -1)) return ''
    return (await stat(res)).isDirectory() ? [res, ...await getFiles(res)] : res;
  }));
  return files.reduce((a, f) => a.concat(f), []).filter(item => item);
}

function counter(count = 0, length, process = () => { }, cb = () => { }) {
  if (count < length) {
    process(count, () => {
      count++;
      counter(count, length, process, cb)
    })
  }
  else {
    cb()
  }
}

async function generate(dir) {
  let files = (await getFiles(dir)).filter(file => file.indexOf(CORENAME) !== -1)
  if (files.length === 0) return console.log('Initialization was done earlier')
  counter(0, files.length, (count, next = () => { }) => {
    const path = files[count];
    const newPath = replaceAll(CORENAME, PROJECTNAME, path);
    copy(path, newPath, { overwrite: true }).then(() => {
      next(() => {
        count++;
        counter(count, array, cb)
      })
    })
  }, async () => {
    console.log(`Renamed "${CORENAME}" to "${PROJECTNAME}"`)
    files = (await getFiles(dir)).filter(file => file.indexOf(CORENAME) !== -1)
    counter(0, files.length, (count, next = () => { }) => {
      const path = files[count];
      remove(path).then(() => {
        next(() => {
          count++;
          counter(count, array, cb)
        })
      })
    }, async () => {
      console.log('Old files has been removed')
      files = (await getFiles(dir))
      let changingCount = 0;
      console.log('Searching for replacements inside files began. This may take a few minutes. Please wait for completion.')
      counter(0, files.length, async (count, next = () => { }) => {
        const path = files[count];
        if (!(await stat(path)).isDirectory()) {
          fs.readFile(path, 'utf8', function (err, data) {
            if (err) {
              return console.log('err', err);
            }
            var result = replaceAll(CORENAME, PROJECTNAME, data)
            if (result.length !== data.length) {
              changingCount++;
              fs.writeFile(path, result, 'utf8', function (err) {
                if (err) return console.log(err);
                next(() => {
                  count++;
                  counter(count, array, cb)
                })
              });
            }
            else {
              next(() => {
                count++;
                counter(count, array, cb)
              })
            }
          });
        }
        else {
          next(() => {
            count++;
            counter(count, array, cb)
          })
        }
      }, () => {
        console.log('All matches in the files have been replaced. Total: ' + changingCount)
      })
    })
  })
}

generate('./')