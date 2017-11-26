# Readable: A Commenting App Project

This is a project for the Udacity React Nanodegree program.

The project consists of two directories: `api-server`, a preconfigured server for this assignment and `frontend`, the React app developed for this project.

To use the project, please start the Readable API server and the React app.
 
 To start the Readable API server, change into the api server directory, install the needed dependencies and start the server.
 * `cd api-server`
 * `npm install`
 * `node server`
     
 To start the React app, change to the `frontend` directory, install the needed dependencies and start the React app:
* `cd frontend`
* `npm install`
* `npm start`

## Parts of the application

All screens feature:
* the navigation bar which allows quick access to the home screen and adding a new post
* the category selection sidebar to quickly change between categories

All actions are sent to the server so the data should stay up to date, even after a page refresh.

### Home screen

The home screen is available under the root URL and features:
* a list of all Posts ordered by vote score
* the possibility to change the sorting between vote score and timestamp
* upvoting, downvoting, editing and deleting of any post directly from the home screen
* editing a post leads to the post editing screen
* deleting a post removes the post
* access to the details of a post with the list of comments by clicking on the post title

### Category

The category screen is very similar to the home screen and is accessed by clicking the links in the sidebar, located under `/category/{category name}` and features a filtered list of all posts by category.

### Post details

The post details page is accessed by clicking on the name of a post and is located under `/post/{post id}`. It features:
* all of the details of a post (title, body, timestamp, author, category, score, comment count)
* allows upvoting, downvoting, editing and deleting of the post
* deleting a post removes the post and leads back to the home page
* adding a new comment
* list of all comments with comment body, timestamp, author and score
* allows upvoting, downvoting, editing and deleting of comments
* adding and editing comments happens in inline forms at the exact location of either the 'Add new comment' button or the currently editing comment
* deleting a comment removes the comment and changes the comment count on the post 

### Post adding

The post adding screen is available under `/add-post` and allows the adding of a new post with all needed details (title, content, author and category).

### Post editing

The post editing screen is available under `/edit-post/{post id}` and allows the editing of the title and body of a post.