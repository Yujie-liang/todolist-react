# <div align='center'>Todo List X MVC with React</div>

<div align='center'>
<p>
    <img src="https://img.shields.io/badge/Sass/Scss-1.77.0-pink"/>
    <img src="https://img.shields.io/badge/React-18.3.1-blue"/>
</p>
<p>
A simple website for managing your todo list with login and registering functions. `JSON Web Tokens (JWT)` was used for secure user verification. If the token passes the verification, website should be redirect to the todo page, otherwise, it should stays on the login page. The token is stored in `localStorage` and managed by `context`, so that the authentication can be checked on every page easily. CRUD on database operation are accomplished in this todo list website.
</p>
<p>Feel free to give it a try: <strong>https://yujie-liang.github.io/todolist-react/login</strong><br>
You can login with the username: <strong>sylvia</strong> & password: <strong>123</strong>, or register one yourself.
</p>
</div>

## :camera:Screenshots

![todolist](https://i.imgur.com/Vhv34sG.png)

## :star2: Features

- Users can register and login to the website<br>
- Users can add todos to the list<br>
- Users can check todos when they are done<br>
- Users can delete todos from the list<br>
- Users can double click the todo to edit it<br>
- Users can see how many todos are there on the list, including both done and undone<br>

## :diamond_shape_with_a_dot_inside: Installation

### Clone this repository

```
$ git clone https://github.com/Yujie-liang/todolist-react.git

// Go into the repository
$ cd todolist-react

```

### Run the project

```
$ npm install
$ npm start
```

When you see the result below, it means that you have successfully run the project

```
Compiled successfully!

You can now view todolist-react in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.50.172:3000

```

Then, you can view the todo page in todolist-react with the url: http://localhost:3000/todo

## :ballot_box_with_check:Framework and packages used in project

```
"sass": "^1.56.2",
"React": ^18.2.0,
"react-scripts": "4.0.3"
```

For the full list, check out /package.json

## :books: Languages

<div>
<img alt="Sass/Scss" src="https://img.shields.io/badge/SASS%20-hotpink.svg?&style=for-the-badge&logo=SASS&logoColor=white"/>
<img alt="React" src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB"/>

## :floppy_disk:Project Directory Explanation

/public - for public files, e.g. icons  
/src - main folder for development  
/assets - for static files  
/components - for components used in pages  
/pages - for pages related to routers  
App.jsx - project entry point  
index.js - project's JavaScript entry  
package.json - webpack, scripts, and dependency settings of the project

## 💎 Reference

This project was cloned in an half-completed mode.  
Functions were added under the guidance of the Fullstack Javascript web development course.
