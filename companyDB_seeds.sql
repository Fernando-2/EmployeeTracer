INSERT INTO department (name, id)
VALUES  ("Management", 1), ("Accounting & Finance", 2), ("Sales", 3), ("Operations", 4), 
("Information Technology", 5);
INSERT INTO role (id, title, salary, department_id) 
VALUES  (1, "President/CEO", 100000.00, 1), (2, "Chief Accountant/CFO", 100000.00, 2), (3, "Director of Sales", 100000.00, 3), 
(4, "Director of Operations", 95000.00, 4), (5, "Director of IT", 85000.00, 5);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES  (1, "Donald", "Trump", 1, 1);