Ember File Icons
==============================================================================
[![CircleCI](https://circleci.com/gh/cwhittl/ember-file-icons.svg?style=svg)](https://circleci.com/gh/cwhittl/ember-file-icons)

A simple library to display icons depending on the file type. 

This is a port of the CSS version of https://github.com/Drawbotics/file-icons to be an ember component with some additions. (thanks!!)

* Added responsive CSS (not 100% tested, works for our usage but might need some tweaking).
* Added image-icon, which means if the image is viewable as an image it will use that instead

Installation
------------------------------------------------------------------------------

```
ember install ember-file-icons
```


Usage
------------------------------------------------------------------------------
Parameters
* url: The url of the file, if no extension it will attempt to pull the domain off the url
* size (small, medium, large, responsive): size
* iconOnly (true/false): just use the file-icon and ignore the image-icon 
* extension (ie 'png'): Forces iconOnly and uses the extension provided
* badExtension (defaults to 'NA'): Displayed when there is an issue parcing the url for the extension.
* maxExtensionSize (defaults to 4): This is the largest size of an extension before it defaults to what's in badExtension.

```
{{file-icon url=mediaFile size='responsive'}}
{{file-icon extension='png' size='medium'}}
{{file-icon url=mediaFile extension='png' size='responsive'}}
{{file-icon url=mediaFile iconOnly=true size='responsive'}}
```


Contributing
------------------------------------------------------------------------------

### Installation

* `git clone <repository-url>`
* `cd init`
* `yarn install`

### Linting

* `yarn run lint:js`
* `yarn run lint:js -- --fix`

### Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `ember try:each` – Runs the test suite against multiple Ember versions

### Running the dummy application

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
