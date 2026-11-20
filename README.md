# A Dog's Tale

A Dog's Tale is a dog matching website where users can create an account, browse dog profiles, like or pass on dogs, and view matches. Users can also open conversations with their matches and send messages.

## What it does

- Create an account and log in
- Browse available dog profiles
- Filter dog profiles
- Like or pass on profiles
- View matches
- Send and view messages
- Update account email

## Built With

- HTML, CSS, JavaScript
- Node.js and Express
- MySQL
- JWT for authentication
- bcrypt for password hashing

## Running the Project

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd a-dogs-tale
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Set up the MySQL database and make sure the database connection settings are configured.

4. Create a `.env` file with the required database settings and JWT secret.

5. Start the server:
   ```bash
   node server/server.js
   ```

6. Open `http://localhost:3000/` in your browser.

## API Routes

### Authentication (`/api/auth`)
- `POST /register` - Create an account
- `POST /login` - Log in
- `PUT /account` - Update account email

### Dogs (`/api/dogs`)
- `GET /` - Get dog profiles
- `POST /` - Create a dog profile

### Interactions (`/api/interactions`)
- `POST /:dogId/like` - Like a dog
- `POST /:dogId/pass` - Pass on a dog

### Matches (`/api/matches`)
- `GET /` - Get matches
- `GET /:matchId/messages` - Get conversation messages
- `POST /:matchId/messages` - Send a message

## Notes

User accounts and dog profiles are stored in MySQL. Likes, passes, matches, and messages currently use temporary in-memory data on the backend, so they reset when the server restarts.