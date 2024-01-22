

# Bidirectional Text Editor

This is a simple bidirectional text editor application that allows multiple users to collaboratively edit a document in real-time. The application is built using Express.js for the server, MongoDB for data storage, Socket.IO for real-time communication, and React.js for the front-end.

## Features

- **Real-time Collaboration**: Multiple users can edit the document simultaneously, and changes are instantly reflected for all participants.

- **Persistent Storage**: Document changes are stored in MongoDB, allowing users to access their collaborative work even after closing the application.

- **User Presence**: The application displays a list of users currently online, making it easy to see who is actively collaborating.

## Technologies Used

- **Express.js**: Provides the server-side framework for handling HTTP requests and managing WebSocket connections.

- **MongoDB**: Used as the database to store document content and user information.

- **Socket.IO**: Enables real-time bidirectional communication between the server and clients, facilitating instant updates.

- **React.js**: Renders the user interface for the text editor and manages the dynamic content.

## Getting Started

1. Clone the repository:

   ```
   git clone https://github.com/your-username/bidirectional-text-editor.git
   ```

2. Install dependencies:

   ```
   cd client
   npm install
   npm start
   ```
   ```
   cd server
   npm install
   npm run start
   ```
   

3. Set up MongoDB:

   - Create a MongoDB database and update the connection string in the server configuration (`server.js`).

4. Start the application:

   ```
   npm start
   ```

   This will start both the server and the React.js front-end.

5. Open your browser and go to `http://localhost:3000` to access the bidirectional text editor.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to improve the functionality or fix bugs.

## License

This project is licensed under the [MIT License](LICENSE).

---

Feel free to customize the README according to your specific project structure and additional features.
