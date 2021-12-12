INSERT INTO departments (name)
VALUES ("Camera"),
("Post Production"),
("Grip"),
("Art");

INSERT INTO positions (title, departments_id, salary)
VALUES ("2nd Ac", 1, 200),
("Editor", 2, 400),
("Grip", 3, 300),
("Art Pa", 4, 150);


INSERT INTO employees (first_name, last_name, positions_id)
VALUES ("Jean-Luc", "Godard", 1),
("Spike", "Jonze", 4),
("David", "Lynch", 2),
("Yasujiro", "Ozu", 3),
("John", "Cassavetes", 1);


