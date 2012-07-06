Snap
====

To use, start the server:

    $ node [path to snap.js] [path to directory to watch for changes] [optional quoted regular expression of files to watch]

and add the following script reference to the end of your web page, immediately before `</body>`

    <script type="text/javascript" src="http://localhost:1337/script"></script>

Demo
----

Look at `README.md` in demo/ for examples of how to monitor all file changes or changes to files of a specific type. 

How does it work
----------------

The script loaded in the page polls the server process every five seconds. If a relevant file system change has occurred it reloads the page.