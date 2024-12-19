export type User = {
    _id?: string;
    username: string;
    fullName: string;
    description: string;
    email: string;
    instrument: Instrument[]; 
  } | null;
  
  export type Instrument = {
    _id?: string;
    name: string;
    genre: string[]; 
  };
  
  export type Ensemble = {
    _id?: string;
    name: string;
    description: string;
    genre?: string[]; // Optional genres
    users?: string[]; // Optional array of user IDs
  };
  
