-- Stores registered user accounts.
CREATE TABLE IF NOT EXISTS users (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Stores dog profiles belonging to user accounts.
CREATE TABLE IF NOT EXISTS dogs (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNSIGNED NOT NULL,
    name VARCHAR(100) NOT NULL,
    breed VARCHAR(100),
    age INT UNSIGNED,
    location VARCHAR(100),
    bio TEXT,
    photo_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE
);

-- Records when one dog likes another dog.
CREATE TABLE IF NOT EXISTS likes (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    liker_dog_id INT UNSIGNED NOT NULL,
    liked_dog_id INT UNSIGNED NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    UNIQUE (liker_dog_id, liked_dog_id),

    CHECK (liker_dog_id <> liked_dog_id),

    FOREIGN KEY (liker_dog_id) REFERENCES dogs(id)
        ON DELETE CASCADE,

    FOREIGN KEY (liked_dog_id) REFERENCES dogs(id)
        ON DELETE CASCADE
);

-- Stores mutual likes between two dogs.
CREATE TABLE IF NOT EXISTS matches (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    dog_a_id INT UNSIGNED NOT NULL,
    dog_b_id INT UNSIGNED NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    UNIQUE (dog_a_id, dog_b_id),

    CHECK (dog_a_id < dog_b_id),

    FOREIGN KEY (dog_a_id) REFERENCES dogs(id)
        ON DELETE CASCADE,

    FOREIGN KEY (dog_b_id) REFERENCES dogs(id)
        ON DELETE CASCADE
);

-- Stores messages exchanged between matched dogs.
CREATE TABLE IF NOT EXISTS messages (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    match_id INT UNSIGNED NOT NULL,
    sender_dog_id INT UNSIGNED NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (match_id) REFERENCES matches(id)
        ON DELETE CASCADE,

    FOREIGN KEY (sender_dog_id) REFERENCES dogs(id)
        ON DELETE CASCADE
);