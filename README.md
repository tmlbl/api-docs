# Smartsheet API 2.0 Documentation

API Documentation source files for [Smartsheet API 2.0](http://smartsheet-platform.github.io/api-docs).

## Purpose

This repository contains the source files used to generate the documentation for Smartsheet API 2.0. 
The actual Smartsheet API 2.0 documentation can be viewed [here](http://smartsheet-platform.github.io/api-docs). 

## Submitting Feedback

To report documentation bugs or to request documentation enhancements, simply submit an issue [here](https://github.com/smartsheet-platform/api-docs/issues). 
And, of course, feel free to [submit pull requests](https://help.github.com/articles/using-pull-requests) with bug fixes or changes.

## Running the Docs Locally

Follow the steps below if you'd like to run the documentation locally on your machine.

### Prerequisites

 - **Linux or OS X** — Windows may work, but is unsupported.
 - **Ruby, version 1.9.3 or newer**
 - **Bundler** — If Ruby is already installed, but the `bundle` command doesn't work, just run `gem install bundler` in a terminal.

### Getting Set Up

 1. Fork this repository on Github.
 2. Clone *your forked repository* (not our original one) to your hard drive.
 3. Navigate to the directory of your local repository.
 4. Install all dependencies: `bundle install`
 5. Start the test server: `bundle exec middleman server`
 6. View the site in a browser:  <http://localhost:4567>

### Learning about Markdown Syntax
 
This API documentation is based upon [Slate](https://github.com/tripit/slate/) and uses Slate [markdown syntax](https://github.com/tripit/slate/wiki/Markdown-Syntax).

## Release Notes

**1.2.0 (Aug 14, 2015)**
* Updated documentation for Smartsheet API 2.0 ([more info](https://www.smartsheet.com/blog/august-2015-api-update))

**1.1.0 (Aug 13, 2015)**
* Added sample code in C#, Java, and Node.js.

**1.0.0 (July 11, 2015)**
* Initial Release of the Smartsheet API 2.0 Documentation ([more info](https://www.smartsheet.com/blog/july-2015-api-v2-launch))