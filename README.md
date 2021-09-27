# INVOICE

To start project enter to "server" folder and run using command "npm run dev"

# Configuring for localhost

./server/config/default.json file should contain lines as exemple:

```
{
    "port" : 5000,
    "secret" : "you any secret phrase",
    "baseUrl":"http://localhost:5000",
    "mongoUrl": "mongodb+srv://nickname:password@cluster0.xm8cm.mongodb.net/......."
}
```

# Configuring for hosting / server

./server/config/production.json file should contain lines as exemple:

```
{
    "port" : 80,
    "secret" : "you any secret phrase",
    "baseUrl":"http://yourdomain.com",
    "mongoUrl": "mongodb+srv://nickname:password@cluster0.xm8cm.mongodb.net/......."
}
```

# NPM Install on client side

For npm installation you should run script:

```
npm run client:install
```

# Build client static

For build project you should run script:

```
npm run client:build
```

# Starting both server and client

For starting project on hosting / server you should run script:

```
npm run start
```
