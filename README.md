# Medic Mobile take-home test

The goal is to build a very small self-contained "real world" application to show off our skills at production quality code! We used nodeJs to do the stuff.

## Requirements

* Node 8
* Git

## Common setup

Clone the repo and install the dependencies.

* git clone [https://github.com/tonux/debt-check.git](https://github.com/tonux/debt-check.git)

* cd debt-check

* install the dependencies
```shell script
npm install
```

* Run the command from anywhere
```shell script
npm install -g .
```

## Run the app from command line

```shell script
debt-check -p  path_to_file
```

You can execute the order in the directory where your file is located. 
Example : in the project directory there is a data.csv file
```shell script
debt-check -p  data.csv
```


## Run the executable

#### mac
```shell script
./debt-check-macos
```

#### linux
```shell script
./debt-check-linux
```

#### mac
Type "debt-check-win.exe" and press "Enter."
```shell script
debt-check-win.exe
```

