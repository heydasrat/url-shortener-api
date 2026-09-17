# URL Shortener API

A RESTful URL Shortener API built with **Node.js, Express.js, and MongoDB**.

This project was built as part of the [roadmap.sh URL Shortening Service](https://roadmap.sh/projects/url-shortening-service) project.

## Features

- Create short URLs
- Retrieve original URLs
- Update existing short URLs
- Delete short URLs
- Track URL access count
- View URL statistics
- Validate HTTP and HTTPS URLs
- Generate random short codes
- Handle invalid and missing URLs with appropriate HTTP status codes

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JavaScript

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- MongoDB

### Installation

Clone the repository:

```bash
git clone https://github.com/heydasrat/url-shortener-api.git
```

Navigate into the project:

```bash
cd url-shortener-api
```

Install dependencies:

```bash
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
```

Replace `your_mongodb_connection_string` with your MongoDB connection string.

### Run the Server

Start the development server:

```bash
npm run dev
```

The API will be available at:

```text
http://localhost:3000
```

## API Endpoints

### Create Short URL

**POST** `/shorten`

Request:

```json
{
  "url": "https://www.example.com/some/long/url"
}
```

Response:

```json
{
  "statusCode": 201,
  "data": {
    "_id": "...",
    "url": "https://www.example.com/some/long/url",
    "shortCode": "abc123",
    "accessCount": 0,
    "createdAt": "...",
    "updatedAt": "..."
  },
  "message": "Short URL Created Successfully!"
}
```

### Retrieve Original URL

**GET** `/shorten/:shortCode`

Example:

```text
GET /shorten/abc123
```

This retrieves the original URL and increments its access count.

### Update Short URL

**PUT** `/shorten/:shortCode`

Request:

```json
{
  "url": "https://www.example.com/updated-url"
}
```

Returns the updated URL document.

### Delete Short URL

**DELETE** `/shorten/:shortCode`

Returns:

```text
204 No Content
```

when the URL is successfully deleted.

### Get URL Statistics

**GET** `/shorten/:shortCode/stats`

Example:

```text
GET /shorten/abc123/stats
```

Returns the URL information along with its access count.

## Validation

The API validates incoming URLs and only accepts:

- `http://`
- `https://`

Invalid URLs return:

```text
400 Bad Request
```

If a short code does not exist, the API returns:

```text
404 Not Found
```

## Project Structure

```text
src/
├── Controllers/
├── Models/
├── Routes/
├── Utils/
└── app.js
```

## API Summary

| Method | Endpoint | Description |
|---|---|---|
| POST | `/shorten` | Create a short URL |
| GET | `/shorten/:shortCode` | Retrieve original URL |
| PUT | `/shorten/:shortCode` | Update a short URL |
| DELETE | `/shorten/:shortCode` | Delete a short URL |
| GET | `/shorten/:shortCode/stats` | Get URL statistics |

## Roadmap.sh

This project was built for the **URL Shortening Service** project on roadmap.sh.

Project: https://roadmap.sh/projects/url-shortening-service

## License

This project is for learning and educational purposes.