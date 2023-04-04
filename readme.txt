1) Firstly download the project in your local machine

2) Next open the code in VS code 

3) Now run 'npm install' in the terminal to install all the necessary package which are required to run this project 

4) After the process finished then run 'npm start' to run the application into local machine 

5) I have used firebase real time database to store data and firebase authantication to perform login and signup operation

6) I have created 4 user - 

                        i) id - admin@gmail.com, password - Admin@123
                        ii)id - author@gmail.com, password - Author@123
                        iii)id- author2@gmail.com, password - Author@123
                        iV) id- reader@gmail.com, password - Reader@123

7) The user can give their role making the account (i.e Admin, Author and reader);

8) There would be only one Admin in the application. so, after making the account of the admin I have disabled the admin option from the drop down.

9) Admins can edit or delete any blog post. Authors can edit or delete only their own blog posts. Readers can only view blog posts.

10) There is a home page which display a paginated list of blog posts with their titles and a short excerpt of their content. Each blog post should be clickable and navigate to its individual post page.

11) There is a Post detail which is use to display individual blog in PostDetails

12) There is a create post page which is only accsible by admin and authors to add new blog post.

13) There is a Edit post which page is only only accessible by author and admin Admins can edit or delete any blog post. Authors can edit or delete only their own blog posts. Readers can only view blog posts.

14) Added search functionality to allow users to search for blog posts by title or content.

15) If any reader or any user is not logged in and tried to acced which is not accesible by him then he will be redirected to the login page


