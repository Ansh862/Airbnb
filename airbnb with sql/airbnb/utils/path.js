// Core Module

const path = require('path');
module.exports = path.dirname(require.main.filename);

// gives you the FULL path of the file that started your app
// (require.main.filename)
// Output: '/Users/john/myproject/app.js'
//                                 ↑
//                          the main file you ran
//                          (node app.js)


// removes the filename, gives you just the FOLDER
// path.dirname('/Users/john/myproject/app.js')
// Output: '/Users/john/myproject'
//                                ↑
//                          just the folder!
//                          no filename!


// utils/path.js
// module.exports = path.dirname(require.main.filename);
// models/home.js
// const rootDir = require('../utils/path');
// console.log(rootDir);
// Output: '/Users/john/myproject'  ✅
// now you can find any file from root:
// const homeDataPath = path.join(rootDir, 'data', 'homes.json');
// Output: '/Users/john/myproject/data/homes.json' ✅