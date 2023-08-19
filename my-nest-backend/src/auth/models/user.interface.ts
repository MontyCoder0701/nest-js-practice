export interface User {
    id?: number;
    first_name?: string;
    last_name?: string;
    email?: string;
    password?: string;
}

// the interface is used to define the shape of the data that will be passed around in the application
// the ? indicates that the property is optional 
// it is ? because the id is not available when creating a new user
