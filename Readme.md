# Snipster: Shorten Your Links

Snipster is a Node.js application that helps you generate short, memorable URLs from long and cumbersome ones. It's built using Express.js for server-side routing and MongoDB for persistent data storage.

## Features

- **URL Shortening:** Transform lengthy URLs into concise snippets.
- **Customizable:** Optionally define your preferred short URL prefix (e.g., `yourdomain.com/s/`).
- **Database Persistence:** Shortened URLs and their original counterparts are stored in MongoDB for reliability and future access.

## Technologies

- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Frontend:** HTML, CSS, JavaScript

## Installation

**Prerequisites:**

- Node.js (version 14 or later) and npm (Node Package Manager) installed on your system. You can download them from https://nodejs.org/
- MongoDB database running locally or on a remote server.

**Steps:**

1. Clone this repository:

   ```bash
   git clone [invalid URL removed]
   ```

2. Navigate to the project directory:

   ```bash
   cd snipster
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

## Configuration

### Database Connection:

- Create a .env file in the project root.
- Add the following environment variable, replacing <your_mongodb_uri> with your actual MongoDB connection URI:

    ```bash
    MONGODB_URI=<your_mongodb_uri>
    ```

### Optional: Custom Short URL Prefix

- If you want to customize the short URL prefix (e.g., yourdomain.com/s/ instead of the default /s/), modify the baseUrl property in server.js:

    ```bash
    const baseUrl = process.env.BASE_URL || '/s/'; // Default: '/s/'
    ```

## Usage

### Start the Server:

- Run the following command to start the server:

```bash
npm start
```

- The server will start on port 5000 by default. You can change the port by setting.

### Shorten a URL:

- Open a web browser and navigate to http://localhost:5000/ (or your custom domain if deployed). You'll see a form where you can paste your long URL and submit it. The shortened URL will be displayed.

### Example:

- If you submit the long URL https://www.example.com/a-very-long-and-complex-url-path, you might receive the shortened URL http://localhost:3000/s/12345 (assuming the default prefix).

### Contributing

- We welcome contributions to improve Snipster. Please feel free to fork the repository, make changes, and submit pull requests.

### License

- Snipster is released under the MIT License. See LICENSE.txt for details.

## Demo

- Link: https://manish9737.github.io/snipster/