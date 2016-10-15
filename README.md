# Ankommen: A Social Organizer

## Angular 2 Frontend
Uses the admin template provided by the Akveo team: https://github.com/akveo/ng2-admin

The backend code (in php-laravel) can be found here: https://github.com/kenxu95/ankommen-api2

## Structure
The most important folders/files:

/config => Contains important configuration information for potential deployment (webpack.common.js, webpack.prod.js, etc)

/src/platform/browser-providers.ts => For defining application-wide providers

/src/app/pages => Contains all the major view/component logic and route information. 

/src/app/shared => Contains all shared class definitions and services 

/src/app/theme => Contains all of the Akveo Team's code for building the template. Should be referenced frequently when creating the views.

## Authentication
Uses JSON Web Tokens for authentication, storing the web token in localStorage. 

Uses for authenticated requests: https://github.com/auth0/angular2-jwt

## TODO:
- Fix the bug that causes the google maps to disappear (because of breaking changes to angular2 final release)
- Fix the active route guard (because of breaking changes to angular2 final release)
- Upgrade to HTTPS when logging-in/registering
- Store JWT Token in cookie instead of localstorage
- Handle invalid login's more gracefully
- Performance issue when scrolling with asset images and google maps on the same page (/pages/newtask)
- Color issue when "New Task" menu item is clicked


## Finished URLs
- /login
- /register
- /pages/newtask
- /pages/profile
- /pages/editassets

## Unfinished URLs
- /pages/tasks/active (finish integrating with backend)
- /pages/tasks/potential (integrate with backend)
- /pages/tasks/previous (integrate with backend)

## URLs that have yet to be designed
- /pages/dashboard (still only akveo's dummy page)
- /pages/task/{id} (for accepting/rejecting tasks)

