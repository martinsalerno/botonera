import React from 'react';

const AuthContext = React.createContext({ userEmail: null, token: null });

export { AuthContext };