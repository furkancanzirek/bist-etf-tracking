CREATE TABLE IF NOT EXISTS prices (
    name VARCHAR(255) PRIMARY KEY,
    change DECIMAL(10, 2)
);

CREATE TABLE IF NOT EXISTS volumes (
    fundName VARCHAR(255) PRIMARY KEY,
    volumes TEXT
);



