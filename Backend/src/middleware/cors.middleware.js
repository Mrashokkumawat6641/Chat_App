// const cors = async (req, res, next) => {
//     res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header(
//       'Access-Control-Allow-Methods',
//       'GET,PUT,POST,HEAD,DELETE,PATCH,OPTIONS',
//     );
//     // res.header("Access-Control-Allow-Credentials", "true");
//     res.header(
//       'Access-Control-Allow-Headers',
//       'Access-Control-Allow-Headers,Origin,Accept,X-Requested-With,Content-Type,Cache-Control,Authorization,Access-Control-Request-Method,Access-Control-Request-Headers,*',
//     );
//     res.header('Access-Control-Expose-Headers', 'Authorization');
//     next();
//     // }else{
//     //     console.log("not allowed here")
//     //     res.status(400).send("not allowed")
//     // }
//   };
//   export { cors };

const cors = (req, res, next) => {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    res.header('Access-Control-Allow-Origin', '*'); // Allow all origins
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Expose-Headers', 'Authorization');
    
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    
    next();
};
export { cors };
