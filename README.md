Mae Capozzi
-----------

Hello, Pico Team!

If you want to run this app locally, you can spin up a Python server like this: `python -m SimpleHTTPServer 8000`. Then head to `http://localhost:8000/`. 

I've also deployed this here, if you'd rather not deal with that: https://pico-code-challenge-risdptevyg.now.sh/


I generally avoid writing comments in my code, since I strive to write code that is self-explanatory and expressive. Instead, I'll put my assumptions here: 

#### Assumptions

- For a code challenge, I like to use `create-react-app` to quickly get a preferred React environment up and running. Since the goal of this challenge (I think), is to make sure that I'm not overly dependent on any tools and have a fundamental understanding of the web, I chose jQuery. This isn't something I'm super familiar with, but I spent a couple of minutes picking out an organizational pattern. I ended up choosing the Revealing Module pattern. 

- Since I couldn't use Babel, I used ES5. Normally, I write ES6, but wanted to make sure this would work in the Edge browser without doing any transpiling.

- I considered using something like flexbox-grid, but decided to keep it as simple as possible. 