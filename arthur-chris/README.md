**Authors**: Chris Lesesne & Arthur Allen
**Version**: 1.0.0 (increment the patch/fix version number up if you make more commits past your first submission)

## Overview
<!-- Provide a high level overview of what this application is and why you are building it, beyond the fact that it's an assignment for a Code Fellows 301 class. (i.e. What's your problem domain?) -->
This application will display the statistics of the articles and their respective authors.

## Getting Started
<!-- What are the steps that a user must take in order to build this app on their own machine and get it running? -->

Install NPM packages/dependencies, call initialize methods properly with new object scope, complete stat calculation methods, and run app through node.js server.

## Architecture
<!-- Provide a detailed description of the application design. What technologies (languages, libraries, etc) you're using, and any other relevant design information. -->

This application was designed with:
- HTML/CSS
- JavaScript/jQuery
- node.js, handlebars.js
- PostgreSQL

## Change Log
<!-- Use this are to document the iterative changes made to your application as each feature is successfully implemented. Use time stamps. Here's an examples:-->

01/03/2018:
- wrap scripts in IIFEs
- export Article and articleView objects
- re-call init methods properly to initialize html pages
- create template for author stats
- complete methods for generating and rendering author stats

01/04/2018:
- built method to calculate and render number of articles written per author (*STRETCH GOAL*)

## Credits and Collaborations
<!-- Give credit (and a link) to other people or resources that helped you build this application. -->
- JB Tellez: Assistance with properly calling initialize methods after exporting 'Article' and 'articleView' objects