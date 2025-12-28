Create Module
nest g mo #MODULE_NAME

```Saparate Folder for Service and Controller```
# Create Services inside Module
nest g s users/services/users --flat --no-spec

# Create Controller inside Module
nest g co users/controllers/users --flat --no-spec

```Module Folder Services and Controller```
# -- Services -- 
nest g s users/users --flat --no-spec
# -- Controller -- 
nest g co users/users --flat --no-spec

#  Company AllModules
nest g module company
nest g service company
nest g controller company

# Middleware Create
nest g middleware middleware/_name

GENERATE resource using resource name
nest g resource admin