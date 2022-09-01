# FlickList &#127871;&#127909;	
An open source Movie recommendation web application.

# Roadmap
- [ ] Each customer can log in to a unique account.
- [ ] Customers can setup accounts.
- [ ] A customer can enter in recommended movies
- [ ] A customer can filter movies by genre
- [ ] A customer can hit a button to be suggesed a random movie to watch
- [ ] A customer can submit a move, edit a movie submission, and delete a movie

# Contributing
Always telling people you'll definitely check out a movie they suggest, but then forgetting about it? Sitting on Netflix or Hulu scrolling endlessly for a movie even though you get so many recommendations? We'd love to have you contribute to this project!
<br>
<br>
Please create an issue for any changes you would like to see under the "Issues" tab above.
Fork the repo, clone it to your machine, create a new branch for your changes, make your changes, push the changes to your fork, then submit a pull request at which point we will review and follow up.

# Setup
The following instructions assume you already have an IDE (We recommend Visual Studio Code!) installed on your computer and know your way around MongoDB Atlas.

To get FlickList running on your local machine, you will need to do the following:

1. Clone the repo to your computer.
2. Open a terminal in your IDE and cd to the directory in which you cloned the repo.
3. Run "npm install". This will download all the node modules needed to run the software.
4. Configure a .env file.
    1. The format should look something like the following:
        ```
        PORT = 2121
        DB_STRING = [MONGODB ATLAS STRING]
        ```
    2. The file should be saved in config/.env.
5. In your IDE terminal, run "npm start".
6. In a web browser, navigate to localhost:2121 (or whatever port you chose in your .env file).

