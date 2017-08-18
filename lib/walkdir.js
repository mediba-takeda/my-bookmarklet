var fs = require('fs')
var path = require('path')
var uglifyjs = require('uglify-es')

var srcDir = path.resolve('./src/')
var distDir = path.resolve('./dist/') + '/'

function recurseToMinify (dir) {
  fs.readdir(dir, function(err, list) {
    errExit(err)
    list.forEach(function(file) {
      var source = path.resolve(dir, file)
      fs.stat(source, function(err, stats) {
        errExit(err)
        if (stats.isDirectory()) {
          recur(source)
        } else {
          fs.readFile(source, function (err, buffer) {
            errExit(err)
            var code = uglify(buffer.toString())
            var bookmarklet = toBookmarklet(code)
            fs.writeFile(distDir + file, code, function (err) {
              errExit(err)
              console.log('Saved minified :' + file);
            })
            fs.writeFile(distDir + 'bookmarklet/' + file, bookmarklet, function (err) {
              errExit(err)
              console.log('Saved bookmarklet :' + file);
            })
          })
        }
      })
    })
  })
}

function uglify (code) {
  var option = {
    'mangle': true,
  }
  return uglifyjs.minify(code, option).code
}

function toBookmarklet (code) {
  return 'javascript:' + code
}

function errExit (err) {
  err && console.log(err) && process.exit(1)
}

recurseToMinify(srcDir)
