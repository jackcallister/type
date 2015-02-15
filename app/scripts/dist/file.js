var fs = require('fs');

require('ipc').on('save', function(path) {
  var value = window.editor.getValue();

  fs.writeFile(path, value, function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log("The file was saved!");
    }
  });
});

require('ipc').on('open', function(path) {

  fs.readFile(path, 'utf8', function (err, data) {
    if (err) {
      console.log(err);
    } else {
      window.editor.getDoc().setValue(data);
    }
  });
});
