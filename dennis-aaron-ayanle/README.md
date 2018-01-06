# Functional Programming

**Author**: Team Ayanle, Aaron and Dennis
**Version**: 1.0.0 - In this version we made sure we utilized the IIFE to wrap the contents of our Article and articleView objects. We also made sure both the index page and admin pages were able to call Article.fetchAll() correctly
2.0.0 - In this version we set up the Handlebars .compile method.

## Overview
The purpose of this application is to demonstrate our understanding of the use of IIFE’s, the .map, .filter and .reduce functionality. Based on the requirements in the user stories, we are building an admin page ( a new page) that will be able to view certain stats in the blog app (total articles and total words + Author stats, which will show the author and the # of words they have written - which is being pulled from all of the articles they have written).

In order to complete this app there are several subtasks that must be accomplished:
1. Ensure the admin page is initialized first so that it calls the template the user wants after all of the data has been loaded.
2. Create functionality to use the Article.fetchAll, so that it pulls only what you want into/from the specific Article and articleView scripts
3. Use the IIFE commands to make sure we have the admin page collect the unique author names and associate the unique # of words attributed to each author.

## Getting Started
1. User must ensure all of the server.js is connected for local host to render the necessary html page (admin)
2. User must ensure they link the correct template file by making sure the names are the same between the script id’s.
3. User must define the correct use of IIFE to ensure the data for the admin page not only grabs the unique authors and provides their # of words contributed [The big key was making these arrays and then returning the array as an object to get at the specific data]


## Architecture

We had to ensure we added the following dependencies to our server.js:
 "body-parser": "^1.18.2",
    "express": "^4.16.2",
    "fs": "0.0.1-security",
    "pg": "^6.4.2"

## Change Log

Commits on Jan 6, 2018 @ah-yan-leh
Merge pull request #3 from SilveredSliver/ayanle-aaron-dennis  …

ah-yan-leh committed worked on admin page

ah-yan-leh committed 12 minutes ago @SilveredSliver
Merge pull request #2 from SilveredSliver/dennis-aaron-ayanle  …

SilveredSliver committed 2 hours ago
@SilveredSliver made some more changes

SilveredSliver committed 2 hours ago

 
Commits on Jan 3, 2018 @SilveredSliver
Merge pull request #1 from SilveredSliver/dennis-aaron-ayanle  …

SilveredSliver 
first commit for lab-10, still need to finish last two bullet points


## Credits and Collaborations
<!-- Give credit (and a link) to other people or resources that helped you build this application. -->
-->
