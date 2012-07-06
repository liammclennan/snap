Snap Demo
=========

To run this snap demo:

    $ node [path to snap.js] [path to demo directory] [optional quoted regular expression of files to watch]

Examples
--------

### Monitor changes to text files

From the root of the snap repository:

    $ node snap.js demo/ '.*\.txt'

will cause index.html to refresh whenever a .txt file in demo/ is changed. 

### Monitor changes to all files

From the root of the snap repository:

    $ node snap.js demo/ 

will cause index.html to refresh whenever any file in demo/ is changed. 


