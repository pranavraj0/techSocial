# Tech Social
Host an event where you can sell any assortment of items and make their prices change based on supply and demand

# Pre-reqs
To build and run this app locally you will need a few things:
- Install [Node.js](https://nodejs.org/en/)
- Install [MongoDB](https://docs.mongodb.com/manual/installation/)
- Install [VS Code](https://code.visualstudio.com/)

# Getting started
- Clone the repository
```
git clone https://github.com/SarthakSingh1/techSocialNode.git <project name>
```
- Install dependencies
```
cd <project_name>
npm install
```
- Configure your mongoDB server
```bash
# create the db directory
sudo mkdir -p /data/db
# give the db correct read/write permissions
sudo chmod 777 /data/db

# starting from macOS 10.15 even the admin cannot create directory at root
# so lets create the db directory under the home directory.
mkdir -p ~/data/db
# user account has automatically read and write permissions for ~/data/db.
```
- Start your mongoDB server (you'll probably want another command prompt)
```bash
mongod

# on macOS 10.15 or above the db directory is under home directory
mongod --dbpath ~/data/db
```
- Build and run the project
```
npm run build
npm start
```
Or, if you're using VS Code, you can use `cmd + shift + b` to run the default build task (which is mapped to `npm run build`), and then you can use the command palette (`cmd + shift + p`) and select `Tasks: Run Task` > `npm: start` to run `npm start` for you.

Finally, navigate to `http://localhost:3000` and you should see the the program being served and rendered locally! 

## How to use TechSocial

<img width="1234" alt="Screen Shot 2022-01-18 at 10 27 25 PM" src="https://user-images.githubusercontent.com/64275741/150064506-142325d8-6f00-4342-be36-3536eb085fd8.png">

